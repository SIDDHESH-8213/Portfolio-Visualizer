import numpy as np
import pandas as pd
import yfinance as yf

def efficient_frontier(tickers, start_date, end_date, risk_free_rate=0.02):
    data = yf.download(tickers, start=start_date, end=end_date)
    data = data['Adj Close']

    # Calculate returns and covariance
    returns = data.pct_change().dropna()
    mean_ret = returns.mean() * 252
    cov_ret = returns.cov() * 252

    
    cov_ret = cov_ret.loc[tickers, tickers]
    mean_ret = mean_ret[tickers]


    num_simulations = 150

    all_weights = np.zeros((num_simulations, len(tickers)))
    ret_arr = np.zeros(num_simulations)
    std_arr = np.zeros(num_simulations)
    sharpe_ratio = np.zeros(num_simulations)

    for i in range(num_simulations):
        weights = np.random.random(len(tickers))
        weights /= np.sum(weights)
        
        all_weights[i, :] = weights

        ret_arr[i] = np.sum(mean_ret * weights)
        std_arr[i] = np.sqrt(np.dot(weights.T, np.dot(cov_ret, weights)))
        sharpe_ratio[i] = (ret_arr[i] - risk_free_rate) / std_arr[i]
        

    return {
        'returns': ret_arr.tolist(),
        'risk': std_arr.tolist(),
        'sharpe_ratio': sharpe_ratio.tolist(),
        'weights': all_weights.tolist()
    }


