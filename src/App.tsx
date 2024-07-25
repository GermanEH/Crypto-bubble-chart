import { Routes, Route, Navigate } from 'react-router-dom';
import BubbleChart from './pages/BubbleChart/BubbleChart'
import CoinDetail from './pages/CoinDetail/CoinDetail'
import NotFound from './modules/core/components/NotFound.js';
import NavBar from './modules/core/components/NavBar.js'

const App:React.FC = () => {
  return (
    <div className="p-0 m-0 w-screen h-screen flex bg-[#0D2035]">
      <NavBar />
      <Routes>
        <Route path="/coin/detail/:id" element={<CoinDetail/>}/>
        <Route path="/top-tokens-by-market-cap" element={<BubbleChart/>}/>
        <Route path='/' element={<Navigate to='/top-tokens-by-market-cap'/>}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  )
}

export default App;
