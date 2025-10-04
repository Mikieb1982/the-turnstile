import type { Profile } from '@/types';

/**
 * @deprecated Profile management is now handled via localStorage and this service is no longer in use.
 */

export const getProfiles = async (): Promise<Record<string, Profile>> => {
    console.warn('getProfiles is deprecated.');
    return Promise.resolve({});
};

export const updateProfile = async (id: string, profile: Profile): Promise<Profile> => {
    console.warn('updateProfile is deprecated.');
    return Promise.resolve(profile);
};

export const deleteProfile = async (id: string): Promise<void> => {
    console.warn('deleteProfile is deprecated.');
    return Promise.resolve();
};