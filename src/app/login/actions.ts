'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const USERNAME = 'Metanoia.click';
const PASSWORD = 'Metanoia1234';
const COOKIE_NAME = 'metanoia-session';

export async function login(prevState: any, formData: FormData) {
  const username = formData.get('username')?.toString().trim();
  const password = formData.get('password')?.toString().trim();

  if (username !== USERNAME || password !== PASSWORD) {
    return { success: false, message: 'Credenciales inválidas. Por favor, inténtalo de nuevo.' };
  }

  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  cookies().set(COOKIE_NAME, 'authenticated', { expires, httpOnly: true });

  redirect('/dashboard');
}

export async function logout() {
  cookies().set(COOKIE_NAME, '', { expires: new Date(0) });
  redirect('/login');
}
