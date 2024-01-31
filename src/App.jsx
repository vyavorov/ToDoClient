import './App.css'
import Login from './components/Login';
import Register from './components/Register'
import TodoListTable from "./components/TodoListTable"
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/authContext';
import GuestGuard from './components/guards/GuestGuard';
import AuthGuard from './components/guards/AuthGuard';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<GuestGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<AuthGuard />}>
            {/* <Route path="/logout" element={<Logout />} /> */}
            <Route path="/" element={<TodoListTable />} />
          </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
