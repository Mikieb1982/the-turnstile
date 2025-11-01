'use server'

import { z } from 'zod';
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
  message?: string;
}

export async function signUp(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const emailValidation = emailSchema.safeParse(email);
  const passwordValidation = passwordSchema.safeParse(password);

  if (!emailValidation.success) {
    return {
    errors: { email: emailValidation.error.flatten().fieldErrors.email },
    };
  }

  if (!passwordValidation.success) {
    return {
      errors: { password: passwordValidation.error.flatten().formErrors },
    };
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { message: 'Success!' };
  } catch (e: unknown) {
    if (e instanceof Error && 'code' in e && e.code === 'auth/email-already-in-use') {
      return {
        errors: { email: ['Email already in use'] },
      };
    } else {
      console.error(e);
      return {
        errors: { _form: ['Something went wrong'] },
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
    };
  }

  if (!passwordValidation.success) {
    return {
      errors: { password: passwordValidation.error.flatten().formErrors },
    };
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { message: 'Success!' };
  } catch (e: unknown) {
    if (e instanceof Error && 'code' in e && (e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found')) {
      return {
        errors: { _form: ['Invalid credentials'] },
      };
    } else {
      console.error(e);
      return {
        errors: { _form: ['Something went wrong'] },
      };
    }
  }
}
