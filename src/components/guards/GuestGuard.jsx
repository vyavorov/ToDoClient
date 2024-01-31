import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext.jsx';

export default function GuestGuard(props) {
    const { authenticated } = useAuth();

    if (authenticated) {
        return <Navigate to='/' />
    }
    return (
        <Outlet />
    )
}