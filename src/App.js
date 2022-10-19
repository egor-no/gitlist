import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutMe from './pages/AboutMe';
import RepoPage from './pages/RepoPage';
import Contacts from './pages/Contacts';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>GitList: my repositories</h1>
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/:repoId" element={<RepoPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  
  );
}

export default App;
