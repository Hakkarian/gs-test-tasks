import { FC } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainPage from '../../pages/MainPage';
import LookupPage from '../../pages/LookupPage';
import ImagePage from '../../pages/ImagePage';
import AppBar from '../AppBar';

const App: FC = () => {
  return (
      <Router>
          <AppBar />
          <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/lookup' element={<LookupPage />} />
              <Route path='/image' element={<ImagePage />} />
          </Routes>
    </Router>
  )
}

export default App