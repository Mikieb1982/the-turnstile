import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

if (!admin.apps.length) {
  admin.initializeApp();
}

export const logNewUserEmail = functions.auth.user().onCreate((user) => {
  const { email } = user;

  if (email) {
    console.log(`A new user was created with email: ${email}`);
  } else {
    console.log('A new user was created without a provided email.');
  }
});
