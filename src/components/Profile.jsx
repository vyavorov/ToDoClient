import { useState } from "react";
import Nav from "./Nav";
import styles from './Profile.module.css';
import { decodeJwt } from "../helpers/jwtHelper";

export default function Profile() {
    const token = localStorage.getItem('token');
    const decoded = decodeJwt(token);
    const userEmail = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (e) => {
        e.preventDefault();
        // Implement your password change logic here
        console.log('Password change requested with:', currentPassword, newPassword, confirmPassword);
        // Reset fields after change or on successful password update
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <>
            <Nav />
            <div className={styles.profileContainer}>
                <h2>User Profile</h2>
                <div className={styles.emailContainer}>
                    <label className={styles.inlineLabel}>Email:</label>
                    <span className={styles.inlineEmail}>{userEmail}</span>
                </div>
                <form onSubmit={handlePasswordChange} className={styles.passwordChangeForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="currentPassword">Current Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={styles.changePasswordBtn}>Change Password</button>
                </form>
            </div>
        </>
    )
}