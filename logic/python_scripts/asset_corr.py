import yfinance as yf
import pandas as pd
import numpy as np

def get_asset_correlation(tickers):
    data = yf.download(tickers, start="2007-05-01", end="2024-07-31", interval="1mo")['Adj Close']
    
    monthly_returns = data.pct_change().dropna()

    corr_matrix = monthly_returns.corr()

    ann_return = (1 + monthly_returns.mean())**12 - 1

    monthly_std = monthly_returns.std()
    ann_std = monthly_std * np.sqrt(12)

    ann_return = ann_return * 100
    monthly_std = monthly_std * 100
    ann_std = ann_std * 100

    df_stats = pd.DataFrame({
        'Ticker': tickers,
        'Annualized Return': ann_return,
        'Monthly Standard Deviation': monthly_std,
        'Annualized Standard Deviation': ann_std
    })

    df_stats.set_index('Ticker', inplace=True)
    
    full_table = pd.concat([corr_matrix, df_stats], axis=1)

    full_table = full_table.loc[tickers, tickers + ['Annualized Return', 'Monthly Standard Deviation', 'Annualized Standard Deviation']]

    return full_table.to_dict()
