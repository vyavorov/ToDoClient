import './App.css'
import Login from './components/Login';
import Register from './components/Register'
import TodoListTable from "./components/TodoListTable"
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<TodoListTable />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
