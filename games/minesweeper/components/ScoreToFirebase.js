import { auth, firestore, collection} from '../../../firebase/Config';
import { addDoc } from 'firebase/firestore';


export const saveScoreToFirebase = async (score, difficulty ) => {
    try {
        // Get the currently logged-in user
        const currentUser = auth.currentUser;
        if (currentUser) {
            try {
                // Query the scores collection to get the highest score
                const scoresCollection = collection(firestore, 'leaderboard_minesweeper'); // Change 'leaderboards' to the correct collection name

            // Add a new document with the user's score
            await addDoc(scoresCollection, {
                userId: currentUser.uid,
                username: currentUser.displayName,
                score: score,
                difficulty: difficulty,
            });
        }
        catch (error) {
            console.error('Error saving score to Firestore:', error);
        }
    }
    } catch (error) {
        console.error('Error saving score to Firestore:', error);
    }
};