
"use server";

import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export async function signUp(data: any) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        return { success: true, userId: userCredential.user.uid };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function signIn(data: any) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        return { success: true, userId: userCredential.user.uid };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
