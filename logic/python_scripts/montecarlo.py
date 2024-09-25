import numpy as np
import yfinance as yf

def get_asset_data(ticker, start_date, end_date):
    data = yf.download(ticker, start=start_date, end=end_date)['Adj Close']
    return data

def calculate_annual_returns(prices):
    log_returns = np.log(prices / prices.shift(1))
    annual_returns = log_returns.mean() * 252
    return annual_returns

def calculate_annual_volatility(prices):
    log_returns = np.log(prices / prices.shift(1))
    annual_volatility = log_returns.std() * np.sqrt(252)
    return annual_volatility

def monte_carlo(initial_investment, num_simulations, weights):
    tickers = ['^GSPC', 'VEU', 'BND', 'VNQ']  
    start_date = '2010-01-01'
    end_date = '2024-01-01'

    prices = get_asset_data(tickers, start_date, end_date)
    aligned_prices = prices.dropna()

    annual_returns = calculate_annual_returns(aligned_prices)
    annual_volatilities = calculate_annual_volatility(aligned_prices)

    portfolio_values = np.zeros((num_simulations, 15))  # Assume 15 periods (years)

    for i in range(num_simulations):
        portfolio_values[i, 0] = initial_investment
        for j in range(1, 15):
            portfolio_return = sum(
                weights[k] * np.random.normal(annual_returns.iloc[k], annual_volatilities.iloc[k])
                for k in range(len(tickers))
            )
            portfolio_values[i, j] = portfolio_values[i, j-1] * (1 + portfolio_return)

    percentiles = [10, 25, 50, 75, 90]
    percentile_values = np.percentile(portfolio_values, percentiles, axis=0)

    return {
        'percentiles': {
            '10th': percentile_values[0].tolist(),
            '25th': percentile_values[1].tolist(),
            '50th': percentile_values[2].tolist(),
            '75th': percentile_values[3].tolist(),
            '90th': percentile_values[4].tolist(),
        },
        'mean_final_value': np.mean(portfolio_values[:, -1]),
        'median_final_value': np.median(portfolio_values[:, -1])
    }

# Example usage:

