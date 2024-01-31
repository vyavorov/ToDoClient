import styles from './Nav.module.css';
import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/authContext';

export default function Nav() {
    const { authenticated } = useAuth();

    return (
        <ul>
            {authenticated && (
                <>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="#">Logout</Link></li>
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