'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const USERNAME = 'Metanoia.click';
const PASSWORD = 'Metanoia1234';
const COOKIE_NAME = 'metanoia-session';

// The function signature now correctly accepts prevState, which is needed by useActionState.
export async function login(prevState: any, formData: FormData) {
  const username = formData.get('username')?.toString().trim();
  const password = formData.get('password')?.toString().trim();

  // Robust validation: case-insensitive username comparison.
  if (username?.toLowerCase() !== USERNAME.toLowerCase() || password !== PASSWORD) {
    return { success: false, message: 'Credenciales inválidas. Por favor, inténtalo de nuevo.' };
  }

  // Set the session cookie. Path is crucial for availability across the app.
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  cookies().set(COOKIE_NAME, 'authenticated', { expires, httpOnly: true, path: '/' });

  // Redirect from the server action is the most reliable method.
  redirect('/dashboard');
}

export async function logout() {
  // Clear the session cookie.
  cookies().set(COOKIE_NAME, '', { expires: new Date(0), path: '/' });
  redirect('/login');
}
