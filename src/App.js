import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import UsersList from './pages/UsersList';
import EditUser from './pages/EditUser';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<UsersList />} />
      <Route path="/users/edit/:id" element={<EditUser />} />
    </Routes>
  );
}

export default App;
