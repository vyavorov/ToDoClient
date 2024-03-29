import styles from './Nav.module.css';
import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/authContext';

export default function Nav() {
    const { authenticated, setAuthenticated } = useAuth();

    const logoutHandler = () => {
        setAuthenticated(false);
        localStorage.removeItem('token');
    }
    return (
        <ul>
            {authenticated && (
                <>
                    <li><Link to="/">Home</Link></li>
                    <li><button onClick={logoutHandler}>Logout</button></li>
                    <li><Link to="/profile">Profile</Link></li>
                </>
            )}
            {!authenticated && (
                <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </>
            )}
        </ul>
    );
}