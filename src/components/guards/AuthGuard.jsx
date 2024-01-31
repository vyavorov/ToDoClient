import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

export default function AuthGuard(props) {
    const { authenticated } = useAuth();

    if (!authenticated) {
        return <Navigate to='/login' />
    }

    return (
        <Outlet />
    )
}