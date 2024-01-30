import { Link } from "react-router-dom";
import styles from './Register.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Nav from "./Nav";
import * as authService from "../services/authService";

// import { useContext } from "react";
// import AuthContext from "../../contexts/authContext";

export default function Register() {
    const navigate = useNavigate();

    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const onChange = (e) => {
        const { name, value } = e.target;

        setRegisterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = { email: registerData.email, password: registerData.password };
            const response = await authService.register(user);
            if (response.ok) {
                navigate("/login");
                setError('');
            } else {
                const data = await response.json();
                setError(data.message);
            }
        }
        catch (error) {
            setError('An error occurred during registration.');
        }
    }
    return (
        <>
            <Nav />
            <section className={styles.auth}>
                <form onSubmit={onSubmit}>
                    <div className={styles.container}>
                        <div className={styles.brandLogo}></div>
                        <h1>Register</h1>
                        <label htmlFor="email">Email:</label>
                        <input type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="email address"
                            onChange={onChange}
                            value={registerData.email}
                        />

                        <label htmlFor="password">Password:</label>
                        <input type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="password"
                            onChange={onChange}
                            value={registerData.password}
                        />

                        {error && <p className={styles.error}>{error}</p>}


                        <input type="submit"
                            value="Register"
                            className={`${styles.btn} ${styles.submit}`}
                        />
                    </div>
                </form>
            </section>
        </>
    )
}