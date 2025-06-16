import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import Register from './Pages/Register';
import Login from './Pages/login';
import Profile from './Pages/Profile';
import GigsPage from './Pages/GigsPage';
import GigDetail from './Pages/GigDetail';
import ApplicationsPage from './Pages/ApplicationsPage'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}


function App() {

    return (
      <Router>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/gigs' element={<GigsPage />} />
          <Route path='/gigs/:id' element={<GigDetail/>} />
          <Route path='/applications' element={<ApplicationsPage />}/>
        </Routes>
      </Router>
    )
}

export default App
