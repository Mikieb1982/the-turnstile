// app/actions.ts
'use server'

import { z } from 'zod';
import { redirect } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);

export interface AuthState {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
  success: boolean;
}

// 1. Create a reusable validation function
async function validateCredentials(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const emailValidation = emailSchema.safeParse(email);
  if (!emailValidation.success) {
    return {
      success: false,
      data: null,
      state: {
        errors: { email: emailValidation.error.flatten().formErrors },
        message: 'Invalid email address',
        success: false,
      },
    };
  }

  const passwordValidation = passwordSchema.safeParse(password);
  if (!passwordValidation.success) {
    return {
      success: false,
      data: null,
      state: {
        errors: { password: passwordValidation.error.flatten().formErrors },
        message: 'Password must be at least 6 characters',
        success: false,
      },
    };
  }
  
  return { success: true, data: { email, password }, state: null };
}

export async function signUp(prevState: AuthState, formData: FormData): Promise<AuthState> {
  // 2. Call the helper function
  const validation = await validateCredentials(formData);
  if (!validation.success) {
    return validation.state!;
  }
  
  const { email, password } = validation.data!;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    redirect('/dashboard');
  } catch (e: unknown) {
    if (e instanceof Error) {
        if (e.message.includes('auth/email-already-in-use')) {
            return {
                errors: { email: ['Email already in use'] },
                message: 'Email already in use',
                success: false,
            };
        }
    }
    return {
      message: 'An unknown error occurred',
      success: false,
    };
  }
}

export async function signIn(prevState: AuthState, formData: FormData): Promise<AuthState> {
  // 3. Call the helper function
  const validation = await validateCredentials(formData);
  if (!validation.success) {
    return validation.state!;
  }

  const { email, password } = validation.data!;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    redirect('/dashboard');
  } catch (e: unknown) {
    if (e instanceof Error) {
        if (e.message.includes('auth/invalid-credential')) {
            return {
                message: 'Invalid credentials',
                success: false,
            };
        }
    }
    return {
      message: 'An unknown error occurred',
      success: false,
    };
  }
}
