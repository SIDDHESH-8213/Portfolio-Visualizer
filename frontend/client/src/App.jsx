import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AssetCorrelation from "./pages/assetCorr"
import Backtest from "./pages/backtest"
import FactorRegression from "./pages/factorReg"
import FactorStatistics from "./pages/factorStats"
import ModernPortfolio from "./pages/modernportfolio"
import Montecarlo from "./pages/montecarlo"
import RiskFactorAlloc from "./pages/riskFactorAlloc"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Analysis from './pages/Analysis';
import Markets  from './pages/Markets';

function App() {

  return (
    <Router>
      <div className="app flex flex-col min-h-screen">
        <Navbar />
        <main className='flex-1'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/backtest' element={<Backtest/>}/>
            <Route path='/montecarlo' element={<Montecarlo/>}/>
            <Route path='/modernportfolio' element={<ModernPortfolio/>}/>
            <Route path='/factorregression' element={<FactorRegression/>}/>
            <Route path='/factorstatistics' element={<FactorStatistics/>}/>
            <Route path='/riskfactor' element={<RiskFactorAlloc/>}/>
            <Route path='/assetcorrelation' element={<AssetCorrelation/>}/>
            <Route path='/analysis' element={<Analysis/>}/>
            <Route path='/markets' element={<Markets/>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
