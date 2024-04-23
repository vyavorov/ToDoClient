import { useState } from "react";
import Nav from "./Nav";
import styles from './Profile.module.css';
import { decodeJwt } from "../helpers/jwtHelper";
import * as authService from '../services/authService';
import arrowDown from '../assets/arrowDown.svg';
import arrowUp from '../assets/arrowUp.svg';
import * as familyService from '../services/familyService';


export default function Profile() {
    const token = localStorage.getItem('token');
    const decoded = decodeJwt(token);
    const userEmail = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [familyMember, setFamilyMember] = useState('');
    const [shouldInviteFamilyBeShown, setShouldInviteFamilyBeShown] = useState(false);
    const [inviteMessage, setInviteMessage] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        // Implement your password change logic here
        console.log('Password change requested with:', currentPassword, newPassword, confirmPassword);
        // Reset fields after change or on successful password update

        //check if passwords match
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            setSuccess('');
            return;
        }

        try {
            const user = { email: userEmail, password: currentPassword, newPassword: newPassword }
            const response = await authService.changePassword(user);
            if (response.ok) {
                setSuccess('Password changed successfully');
                setError('');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
            else {
                const data = await response.json();
                setError(data.message);
                setSuccess('');
            }
        } catch (err) {
            setError(err.message);
            setSuccess('');
        }
    };

    const showInviteMember = () => {
        setShouldInviteFamilyBeShown(!shouldInviteFamilyBeShown);
    }

    const inviteMember = () => {
        try {
            const familyName = userEmail.split('@')[0];
            familyService.Create(userEmail, familyName, familyMember);
            setFamilyMember('');
            setInviteMessage(true);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <nav>
                <Nav />
            </nav>
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

                    {error && <p className={styles.error}>{error}</p>}
                    {success && <p className={styles.success}>{success}</p>}

                    <p>Invite family member
                        <img src={shouldInviteFamilyBeShown ? arrowUp : arrowDown} className={styles.arrows} onClick={showInviteMember} />
                    </p>
                    {shouldInviteFamilyBeShown &&
                        <div>
                            <input
                                type="text"
                                id="familyMember"
                                value={familyMember}
                                onChange={(e) => setFamilyMember(e.target.value)}
                                placeholder="Email address"
                            />
                            <button type="button" className={styles.changePasswordBtn} onClick={inviteMember}>Send invite</button>
                            {inviteMessage && <p className={styles.success}>Invite has been sent successfully!</p>}
                        </div>
                    }


                    <button type="submit" className={styles.changePasswordBtn}>Change Password</button>
                </form>
            </div>
        </>
    )
}