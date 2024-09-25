import yfinance as yf
import pandas as pd



def calculate_factor_statistics():

    factor_symbols = ['^GSPC','IWM','MTUM','QUAL','VLUE','SIZE','EFV']    
    data = yf.download(factor_symbols, start="1964-01-01", end="2024-06-30")['Adj Close']

    returns = data.pct_change().dropna()
    returns = returns[factor_symbols]
    correlations = returns.corr()
    correlations = correlations[factor_symbols]
    
    statistics = {
    'Annualized Return': (returns.mean() * 252).to_dict(),
    'Annualized Standard Deviation': (returns.std() * (252**0.5)).to_dict(),
    'Correlations': correlations.to_dict()
}
    
    return statistics

def compounded_growth():

    factor_symbols = ['^GSPC','IWM','MTUM','QUAL','VLUE','SIZE','EFV']    
    data = yf.download(factor_symbols, start='1964-01-01', end='2024-06-30')['Adj Close']
    
    compounded = (1 + data.pct_change()).cumprod()
    
    return compounded

