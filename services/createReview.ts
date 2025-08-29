import { db } from "@/FirebaseConfig";
import { Review } from "@/types/review";
import { addDoc, collection } from "firebase/firestore/lite";

export const createReview = async(review: Omit<Review, "id">) => {
    try {
        console.log(review);
        
        await addDoc(collection(db, "reviews"), review)
    } catch (error) {
        console.error(error, "Error creating review")
    }
}