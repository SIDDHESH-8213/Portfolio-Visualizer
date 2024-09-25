import pandas as pd
import yfinance as yf
import numpy as np

def fetch_historical_data(asset_classes):
    historical_data = {}
    for asset, ticker in asset_classes.items():
        data = yf.download(ticker, period='10y', interval='1d')
        data.index = pd.to_datetime(data.index)
        historical_data[asset] = data['Adj Close'].resample('Y').ffill().pct_change().dropna()
    return pd.DataFrame(historical_data)

def calculate_cagr(start_value, end_value, num_years):
    return (end_value / start_value) ** (1 / num_years) - 1

def calculate_sharpe_ratio(returns, risk_free_rate=0.02):
    mean_return = np.mean(returns)
    std_dev = np.std(returns)
    return (mean_return - risk_free_rate) / std_dev

def perform_backtest(initial_investment, allocations, asset_classes):
    df = fetch_historical_data(asset_classes)
    
    investment = initial_investment
    allocation_values = {asset: investment * (alloc / 100) for asset, alloc in allocations.items()}
    
    year_results = {}
    annual_returns = {}
    cumulative_returns = []

    for index, row in df.iterrows():
        for asset in allocations:
            allocation_values[asset] *= (1 + row[asset])

        total_value = sum(allocation_values.values())
        year_results[index.year] = total_value  
        if cumulative_returns:
            previous_value = cumulative_returns[-1]
            annual_return = total_value / previous_value - 1
        else:
            annual_return = total_value / investment - 1

        annual_returns[index.year] = annual_return
        cumulative_returns.append(total_value)

        for asset, alloc in allocations.items():
            allocation_values[asset] = total_value * (alloc / 100)

    start_value = investment
    end_value = total_value
    num_years = len(year_results)
    cagr = calculate_cagr(start_value, end_value, num_years)

    returns = np.array(list(annual_returns.values()))
    std_dev = np.std(returns)
    sharpe_ratio = calculate_sharpe_ratio(returns)

    return {
        'year_results': year_results,
        'annual_returns': annual_returns,
        'cagr': cagr,
        'std_dev': std_dev,
        'sharpe_ratio': sharpe_ratio
    }
