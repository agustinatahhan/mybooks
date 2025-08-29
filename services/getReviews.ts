import { db } from "@/FirebaseConfig";
import { Review } from "@/types/review";
import { collection, getDocs } from "firebase/firestore/lite";

export const getReviews = async() => {
    try {
        const reviewsCollection = collection(db, "reviews");
        const reviewsSnapshot = await getDocs(reviewsCollection);
        const reviewsList: Review[] = reviewsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })) as Review[];

        return reviewsList

    } catch (error) {
        console.error(error, "Error fetching reviews")
    }
}