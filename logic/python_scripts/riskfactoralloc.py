import yfinance as yf
import numpy as np
import pandas as pd
import statsmodels.api as sm
from scipy.optimize import minimize

def optimize_portfolio(tickers, allocations, desired_exposure):
    data = yf.download(tickers, start="2010-01-01", end="2023-01-01")['Adj Close']
    returns = data.pct_change().dropna()
    returns = returns[tickers]
    dt = yf.download('^GSPC', start="2010-01-01", end="2023-01-01")['Adj Close']
    dt = dt.pct_change().dropna()
    factors = pd.DataFrame({
        'Market': dt,  
        'SMB': np.random.normal(0.05, 0.01, len(returns)),  
        'HML': np.random.normal(0.17, 0.01, len(returns)),  
        'TRM': np.random.normal(0.17, 0.01, len(returns)),  
        'CDT': np.random.normal(0.16, 0.01, len(returns))   
    }, index=returns.index)

    portfolio_returns = returns.dot(allocations)

    factors = sm.add_constant(factors)

    model = sm.OLS(portfolio_returns, factors).fit()

    model_params = model.params[1:]  

    desired_exposure_array = np.array([desired_exposure[factor] for factor in factors.columns[1:]])

    def objective(weights, model_params, desired_exposure):
        adjusted_model_params = weights[:len(model_params)] * model_params  
        error = sum((adjusted_model_params - desired_exposure) ** 2)

        regularization_penalty = 0.1 * np.sum(weights ** 2)

        return error + regularization_penalty

    constraints = {'type': 'eq', 'fun': lambda weights: np.sum(weights) - 1}

    bounds = [(0.01, 0.5) for _ in range(len(allocations))]

    initial_guess = np.array([1.0 / len(allocations)] * len(allocations))

    result = minimize(objective, initial_guess, args=(model_params.values, desired_exposure_array),
                      constraints=constraints, bounds=bounds)

    adjusted_allocations = result.x

    return adjusted_allocations
