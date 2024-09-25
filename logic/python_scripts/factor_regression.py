import pandas as pd
import yfinance as yf
import statsmodels.api as sm
from datetime import datetime
import pandas_datareader.data as web

def get_alternative_factor_data(start_date, end_date):
    
    factor_tickers = {
        'Market (Rm-Rf)': '^GSPC',  
        'Size (SMB)': 'IWM',  
        'Value (HML)': 'VLUE',  
        'Momentum (MOM)': 'MTUM'  
    }
    
    factor_data = {}
    
    for factor, ticker in factor_tickers.items():
        data = yf.download(ticker, start=start_date, end=end_date)['Adj Close']
        data = data.resample('M').last().pct_change().dropna()
        factor_data[factor] = data

    
    rf_data = web.DataReader('DGS3MO', 'fred', start_date, end_date)
    rf_data = rf_data.resample('M').last() / 100 / 12  
    
    
    factor_df = pd.DataFrame(factor_data)
    factor_df['RF'] = rf_data.reindex(factor_df.index).values
    
    
    factor_df = factor_df.dropna()
    
    return factor_df

def get_portfolio_returns(tickers, allocations, start_date, end_date):
    prices = yf.download(tickers, start=start_date, end=end_date)['Adj Close']
    returns = prices.resample('M').last().pct_change().dropna()
    weighted_returns = returns.mul(allocations, axis=1).sum(axis=1)
    return weighted_returns

def factor_regression_analysis(portfolio_returns, factor_data):
    y = portfolio_returns - factor_data['RF']
    X = factor_data.drop(columns=['RF'])
    X = sm.add_constant(X)
    
    
    y, X = y.align(X, join='inner')
    
    model = sm.OLS(y, X).fit()
    
    return model

def run_analysis(tickers, allocations, start_date, end_date):
    
    factor_data = get_alternative_factor_data(start_date, end_date)
    
    
    portfolio_returns = get_portfolio_returns(tickers, allocations, start_date, end_date)
    
   
    model = factor_regression_analysis(portfolio_returns, factor_data)
    
    
    results = pd.DataFrame({
        'Factor': model.params.index,
        'Loading': model.params.values,
        'Standard Error': model.bse.values,
        't-stat': model.tvalues.values,
        'p-value': model.pvalues.values,
        '95% Confidence Interval': [f"{conf_int[0]}...{conf_int[1]}" for conf_int in model.conf_int().values]
    })
    results = results[results['Factor'] != 'const']
    
    return model.summary(), results
