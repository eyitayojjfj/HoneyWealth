import React, { useEffect, useState } from 'react';
import { auth, db } from '../../FireBase'; 
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import './ProfilePage.css';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                const fetchUserData = async () => {
                    try {
                        const userDocRef = doc(db, 'Users', currentUser.uid);
                        const userDoc = await getDoc(userDocRef);
                        
                        if (userDoc.exists()) {
                            setUserData(userDoc.data());
                        } else {
                            toast.error('User data not found.');
                        }
                    } catch (error) {
                        console.error("Error fetching user data:", error);
                        toast.error('Error fetching user data.');
                    } finally {
                        setLoading(false);
                    }
                };

                fetchUserData();
            } else {
                navigate('/signin');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out successfully', { position: "bottom-center" });
            navigate('/signin');
        } catch (err) {
            console.error(err);
            toast.error('Error logging out. Please try again.', {
                position: "bottom-center",
            });
        }
    };

    if (loading) {
        return <div className="loading-spinner"><img src="/public/spin.gif" alt="" /></div>;
    }

    return (
        <> 
        <ToastContainer/>
        <div className='profile' style={{ display: 'flex', justifyContent: 'center' }}>
            {userData ? (
                <div className='profile-info'>
                    <h1>Profile</h1>
                    <div>
                        <img src={userData.photo || '/default-profile.png'} alt="Profile" width={'40%'} style={{ borderRadius: '50%' }} />
                    </div>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Display Name:</strong> {userData.firstName} {userData.lastName || 'Not provided'}</p>
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
            ) : (
                <div>No user data available.</div>
            )}
        </div>
        </>
    );
};

export default Profile;
