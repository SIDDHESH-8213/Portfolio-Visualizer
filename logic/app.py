from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS
from python_scripts.backtest import perform_backtest
from python_scripts.montecarlo import monte_carlo
from python_scripts.mpt import efficient_frontier
from python_scripts.factor_regression import run_analysis
from python_scripts.factorstats import calculate_factor_statistics, compounded_growth
from python_scripts.riskfactoralloc import optimize_portfolio
from python_scripts.asset_corr import get_asset_correlation
from python_scripts.fundamentals import fundamentals
import yfinance as yf

app = Flask(__name__)
CORS(app)

@app.route('/api/backtest', methods=['POST'])
def backtest_route():
    data = request.get_json()
    
    initial_investment = data['initial_investment']
    allocations = data['allocations']
    
    asset_classes = {
        'US Stock Market': 'SPY',
        'Global ex-US Stock Market': 'VEU',
        'Total US Bond Market': 'BND',
        'REIT': 'VNQ'
    }
    

    results = perform_backtest(initial_investment, allocations, asset_classes)
    
    return jsonify(results)
    

@app.route('/api/montecarlo', methods=['POST'])
def Monte_route():
    data = request.get_json()
    initial_investment = data['initial_investment']
    num_simulations = data['num_simulations']
    weights = data['weights']


    results = monte_carlo(initial_investment, num_simulations, weights)
    return jsonify(results)


@app.route('/api/efficientfrontierdata', methods=['POST'])
def efficient_frontier_data():
    data = request.get_json()
    tickers = data['tickers']
    results = efficient_frontier(tickers, start_date = '2015-01-01', end_date ='2024-01-01')
    return jsonify(results)


@app.route('/api/factorregression', methods=['POST'])
def factor_regression():
    data = request.get_json()
    tickers = data['tickers']
    allocations = data['allocations']
    start_date = data['start_date']
    end_date = data['end_date']
    
    
    summary, results = run_analysis(tickers, allocations, start_date, end_date)
        
    
    results_json = results.to_json(orient='split')
        
    return jsonify({
        'summary': summary.as_text(),
        'results': results_json
    })
    

@app.route('/api/factorstatistics', methods=['POST'])
def factor_statistics():
    results = calculate_factor_statistics()
    graph_data = compounded_growth()
    return jsonify(results)


@app.route('/api/riskfactorallocation', methods=['POST'])
def risk_allocations():
    data = request.json
    
    tickers = data['tickers']
    allocations = np.array(data['allocations'])
    desired_exposure = data['desired_exposure']

    adjusted_allocations = optimize_portfolio(tickers, allocations, desired_exposure)

    return jsonify({
        'adjusted_allocations': adjusted_allocations.tolist()
    })


@app.route('/api/assetcorrelation', methods=['POST'])
def asset_correlation():
    data = request.json

    tickers = data['tickers']

    results = get_asset_correlation(tickers)

    return jsonify(results)

@app.route('/api/fundamental', methods = ['POST'])
def get_fundamentals():
    data = request.json

    tickers = data['tickers']

    results = fundamentals(tickers)

    return jsonify(results)




if __name__ == '__main__':
    app.run(debug=True)