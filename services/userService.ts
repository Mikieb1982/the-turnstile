import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { db } from '../firebase';
import type { Profile, AttendedMatch } from '../types';

export const getUserProfile = async (uid: string): Promise<Profile | null> => {
    const docRef = db.collection('users').doc(uid);
    const docSnap = await docRef.get();
    if (docSnap.exists) {
        return docSnap.data() as Profile;
    }
    return null;
};

export const createUserProfile = async (uid: string, profile: Profile): Promise<void> => {
    const docRef = db.collection('users').doc(uid);
    await docRef.set(profile);
};

export const updateUserProfile = async (uid: string, data: Partial<Profile>): Promise<void> => {
    const docRef = db.collection('users').doc(uid);
    await docRef.update(data);
};

export const addAttendedMatchToProfile = async (uid: string, attendedMatch: AttendedMatch): Promise<void> => {
    const docRef = db.collection('users').doc(uid);
    await docRef.update({
        attendedMatches: firebase.firestore.FieldValue.arrayUnion(attendedMatch)
    });
};

export const removeAttendedMatchFromProfile = async (uid: string, matchId: string): Promise<void> => {
    const userProfile = await getUserProfile(uid);
    if (userProfile && userProfile.attendedMatches) {
        const updatedMatches = userProfile.attendedMatches.filter(am => am.match.id !== matchId);
        await updateUserProfile(uid, { attendedMatches: updatedMatches });
    }
};

export const addBadgeToProfile = async (uid: string, badgeIds: string[]): Promise<void> => {
    const docRef = db.collection('users').doc(uid);
    await docRef.update({
        earnedBadgeIds: firebase.firestore.FieldValue.arrayUnion(...badgeIds)
    });
};

export const updateAttendedMatchPhotoInProfile = async (uid: string, matchId: string, photoUrl: string): Promise<void> => {
    const userProfile = await getUserProfile(uid);
    if (userProfile && userProfile.attendedMatches) {
        const updatedMatches = userProfile.attendedMatches.map(am => {
            if (am.match.id === matchId) {
                return { ...am, photoUrl };
            }
            return am;
        });
        await updateUserProfile(uid, { attendedMatches: updatedMatches });
    }
};

export const fetchAllUsers = async (currentUid: string): Promise<(Profile & { uid: string })[]> => {
    const usersCollection = db.collection('users');
    const snapshot = await usersCollection.get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs
        .filter(doc => doc.id !== currentUid)
        .map(doc => ({
            uid: doc.id,
            ...(doc.data() as Profile)
        }));
};

export const addFriendToProfile = async (uid: string, friendId: string): Promise<void> => {
    const batch = db.batch();
    const userDocRef = db.collection('users').doc(uid);
    batch.update(userDocRef, {
        friendIds: firebase.firestore.FieldValue.arrayUnion(friendId)
    });
    const friendDocRef = db.collection('users').doc(friendId);
    batch.update(friendDocRef, {
        friendIds: firebase.firestore.FieldValue.arrayUnion(uid)
    });
    await batch.commit();
};

export const removeFriendFromProfile = async (uid: string, friendId: string): Promise<void> => {
    const batch = db.batch();
    const userDocRef = db.collection('users').doc(uid);
    batch.update(userDocRef, {
        friendIds: firebase.firestore.FieldValue.arrayRemove(friendId)
    });
    const friendDocRef = db.collection('users').doc(friendId);
    batch.update(friendDocRef, {
        friendIds: firebase.firestore.FieldValue.arrayRemove(uid)
    });
    await batch.commit();
};