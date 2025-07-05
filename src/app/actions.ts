'use server';
 
import {cookies} from 'next/headers';
 
export async function setLocale(locale: string) {
  cookies().set('NEXT_LOCALE', locale);
}