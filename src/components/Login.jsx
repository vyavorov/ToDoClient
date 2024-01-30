import { Link } from "react-router-dom";
import styles from './Login.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Nav from "./Nav";

// import { useContext } from "react";
// import AuthContext from "../../contexts/authContext";

export default function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const onChange = (e) => {
        const { name, value } = e.target;

        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    return (
        <>
            <Nav />
            <section className={styles.auth}>
                {/* onSubmit={onSubmit} */}
                <form >
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

                        {/* {error && <p className={styles.error}>{error}</p>} */}


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