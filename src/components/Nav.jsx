import styles from './Nav.module.css';
import { Link } from 'react-router-dom'

export default function Nav(){
    return (
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="#">Logout</Link></li>
        </ul>
    );
}