import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AboutMe from './pages/AboutMe';
import RepoPage from './pages/RepoPage';
import Contacts from './pages/Contacts';
import Repa from './pages/Repa';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/repos" element={<HomePage />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/repa" element={<Repa />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/repos/:repoId" element={<RepoPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  
  );
}

export default App;
