import firebase, { db } from '../firebase';
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
    if (userProfile) {
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
