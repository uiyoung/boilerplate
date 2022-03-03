import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from './components/views/MainPage/MainPage';
import LoginPage from './components/views/LoginPage/LoginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
      {/* <MainPage /> */}
      {/* <LoginPage /> */}
    </div>
  );
}

export default App;
