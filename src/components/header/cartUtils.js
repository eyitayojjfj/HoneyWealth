// cartUtils.js
import { db } from '../../FireBase'; 
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../account/AuthContext';

export const getCartItemCount = async () => {
    const { currentUser } = useAuth(); 
    if (!currentUser) return 0;

    try {
        const userCartRef = doc(db, 'Users', currentUser.uid);
        const userCartSnapshot = await getDoc(userCartRef);
        
        if (userCartSnapshot.exists()) {
            const cart = userCartSnapshot.data().cart || [];
            return cart.length; 
        } else {
            console.log("No cart found for user.");
            return 0; 
        }
    } catch (error) {
        console.error('Error fetching cart item count:', error);
        return 0; 
    }
};
