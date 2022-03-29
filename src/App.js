import './App.css';
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import KycPage from './pages/KycPage';
import "./style/landingPage.css"
import DetailPage from './pages/DetailPage';
import SelectUserPage from './pages/SelectUserPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/detail" element={<DetailPage />} />
          <Route exact path="/userselect" element={<SelectUserPage />} />
          <Route exact path="/kyc" element={<PrivateRoute><KycPage /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function PrivateRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/" />;
}

export default App;
