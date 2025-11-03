'use server'

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);

interface AuthState {
  errors?: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  message: string;
  success: boolean;
}

export async function signUp(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const emailValidation = emailSchema.safeParse(email);
  const passwordValidation = passwordSchema.safeParse(password);

  if (!emailValidation.success) {
    return {
      errors: { email: emailValidation.error.flatten().formErrors },
      message: 'Invalid email address',
      success: false,
    };
  }

  if (!passwordValidation.success) {
    return {
      errors: { password: passwordValidation.error.flatten().formErrors },
      message: 'Password must be at least 6 characters',
      success: false,
    };
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    redirect('/dashboard');
  } catch (e: unknown) {
    if (e instanceof Error && 'code' in e && e.code === 'auth/email-already-in-use') {
      return {
        errors: { email: ['Email already in use'] },
        message: 'Email already in use',
        success: false,
      };
    } else {
      console.error(e);
      return {
        errors: { _form: ['Something went wrong'] },
        message: 'Something went wrong',
        success: false,
      };
    }
  }
}

export async function signIn(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const emailValidation = emailSchema.safeParse(email);
  const passwordValidation = passwordSchema.safeParse(password);

  if (!emailValidation.success) {
    return {
      errors: { email: emailValidation.error.flatten().formErrors },
      message: 'Invalid email address',
      success: false,
    };
  }

  if (!passwordValidation.success) {
    return {
      errors: { password: passwordValidation.error.flatten().formErrors },
      message: 'Password must be at least 6 characters',
      success: false,
    };
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    redirect('/dashboard');
  } catch (e: unknown) {
    if (e instanceof Error && 'code' in e && (e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found' || e.code === 'auth/invalid-credential')) {
      return {
        errors: { _form: ['Invalid credentials'] },
        message: 'Invalid credentials',
        success: false,
      };
    } else {
      console.error(e);
      return {
        errors: { _form: ['Something went wrong'] },
        message: 'Something went wrong',
        success: false,
      };
    }
  }
}
