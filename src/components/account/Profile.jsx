import React, { useEffect, useState } from 'react';
import { auth, db } from '../../FireBase'; // Adjust the import path as necessary
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css'

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;

            if (!user) {
                navigate('/signin'); // Redirect if not authenticated
                return;
            }

            try {
                const userDoc = doc(db, 'Users', user.uid);
                const docSnap = await getDoc(userDoc);

                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    setError("No user data found.");
                }
            } catch (err) {
                console.error(err);
                toast.error("Error fetching user data.", {
                    position: "bottom-center",
                });
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out successfully!', {
                position: "top-center",
            });
            navigate('/signin'); // Redirect to sign-in page after logout
        } catch (err) {
            console.error(err);
            toast.error('Error logging out. Please try again.', {
                position: "bottom-center",
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className='error-msg'>{error}</div>;
    }

    return (
        <div className='profile'>
            {userData ? (
                <div className='profile-info'>
                    <h2>Profile</h2>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>First Name:</strong> {userData.firstName}</p>
                    <p><strong>Last Name:</strong> {userData.lastName}</p>
                    <button variant="danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <div>No user data available.</div>
            )}
        </div>
    );
};

export default Profile;
