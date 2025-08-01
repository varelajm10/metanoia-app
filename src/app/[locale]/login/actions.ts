
"use server";

import { z } from 'zod';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { FirebaseError } from 'firebase/app';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof formSchema>;

const errorMessages: { [key: string]: string } = {
    'auth/invalid-credential': 'Las credenciales proporcionadas son incorrectas. Por favor, verifique su email y contraseña.',
    'auth/user-not-found': 'No se encontró ningún usuario con este correo electrónico.',
    'auth/wrong-password': 'La contraseña es incorrecta.',
    'auth/invalid-email': 'El formato del correo electrónico no es válido.',
    'auth/user-disabled': 'Esta cuenta de usuario ha sido deshabilitada.',
    'auth/email-already-in-use': 'Este correo electrónico ya está en uso. Por favor, inicie sesión.',
};

export async function signInUser(data: FormValues): Promise<{ success: boolean, error?: any }> {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, error: "Datos de formulario inválidos." };
  }

  try {
    await signInWithEmailAndPassword(auth, parsedData.data.email, parsedData.data.password);
    return { success: true };
  } catch (error) {
    console.error("Firebase SignIn Error:", error);
    let errorMessage = "Ocurrió un error inesperado durante el inicio de sesión.";
    if (error instanceof FirebaseError) {
        errorMessage = errorMessages[error.code] || `Error de Firebase: ${error.message} (código: ${error.code})`;
    }
    return { success: false, error: errorMessage };
  }
}


export async function signUpUser(data: FormValues): Promise<{ success: boolean, error?: any }> {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, error: "Datos de formulario inválidos." };
  }

  try {
    await createUserWithEmailAndPassword(auth, parsedData.data.email, parsedData.data.password);
    return { success: true };
  } catch (error) {
    console.error("Firebase SignUp Error:", error);
    let errorMessage = "Ocurrió un error inesperado durante el registro.";
    if (error instanceof FirebaseError) {
        errorMessage = errorMessages[error.code] || `Error de Firebase: ${error.message} (código: ${error.code})`;
    }
    return { success: false, error: errorMessage };
  }
}
