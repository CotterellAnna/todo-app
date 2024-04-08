import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import TodoApp from './TodoApp';


function App() {
  

  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path='/Signup' element = {<Signup />} />
          <Route path='/login' element = {<Login />} />
          <Route path='/todoApp' element = {<TodoApp />} />
        </Routes>
      </UserProvider>
    </Router>

  );
}

export default App;
