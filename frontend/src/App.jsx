import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import Register from './Pages/Register';
import Login from './Pages/login';
import Profile from './Pages/Profile';

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
        </Routes>
      </Router>
    )
}

export default App
