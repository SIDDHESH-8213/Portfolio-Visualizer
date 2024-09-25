import yfinance as yf
import numpy as np

def fundamentals(tickers):
    data = yf.download(tickers, "2014-01-01", "2024-01-01")
    data = data['Adj Close']
    returns = data.pct_change().dropna()

    mean_ret = returns.mean() * 252
    mean_ret = mean_ret[tickers]

    std_dev = np.std(returns) * np.sqrt(252)
    std_dev = std_dev[tickers]

    risk_free_rate = 0.03
    sharpe_ratio = (mean_ret - risk_free_rate) / std_dev

    Min_weight = [0 for _ in tickers]
    Max_weight = [100 for _ in tickers]

    return {
        "expectedReturn" : mean_ret.to_dict(),
        "standardDeviation": std_dev.to_dict(),
        "sharpeRatio": sharpe_ratio.to_dict(),
        "minWeight" :   Min_weight,
        "maxWeight" : Max_weight,
        "ticker": tickers
    }



