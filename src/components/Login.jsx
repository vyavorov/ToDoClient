import { Link } from "react-router-dom";
import styles from './Login.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Nav from "./Nav";
import * as authService from "../services/authService";
import { useAuth } from "../contexts/authContext";

// import { useContext } from "react";
// import AuthContext from "../../contexts/authContext";

export default function Login() {
    const navigate = useNavigate();
    const { setAuthenticated } = useAuth();

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState("");

    const onChange = (e) => {
        const { name, value } = e.target;

        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = { email: loginData.email, password: loginData.password };
            const response = await authService.login(user);
            if (response.ok) {
                setError('');
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setAuthenticated(true);
                navigate('/');
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
        }

    }
    return (
        <>
            <nav>
                <Nav />
            </nav>
            <section className={styles.auth}>

                <form onSubmit={onSubmit}>
                    <div className={styles.container}>
                        <div className={styles.brandLogo}></div>
                        <h1>login</h1>
                        <label htmlFor="email">Email:</label>
                        <input type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="email address"
                            onChange={onChange}
                            value={loginData.email}
                        />

                        <label htmlFor="password">Password:</label>
                        <input type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="password"
                            onChange={onChange}
                            value={loginData.password}
                        />

                        {error && <p className={styles.error}>{error}</p>}


                        <input type="submit"
                            value="Login"
                            className={`${styles.btn} ${styles.submit}`}
                        />

                        <p className={styles.field}>
                            <span>If you don't have profile, click <Link to="/register">here</Link></span>
                        </p>
                    </div>
                </form>
            </section>
        </>
    )
}