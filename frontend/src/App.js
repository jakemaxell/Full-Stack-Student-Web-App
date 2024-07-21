import './App.css';
import Home from './components/Home';
import CreateAccountPage from './components/CreateAccountPage';
import SearchStudentPage from './components/SearchStudentPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create-student' element={<CreateAccountPage/>}/>
        <Route path='/search-student' element={<SearchStudentPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
