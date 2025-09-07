import type { Profile } from '../types';
import { API_PREFIX } from './apiService';

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    // Handle 204 No Content for delete
    if (response.status === 204) {
        return null;
    }
    return response.json();
};

export const getProfiles = async (): Promise<Record<string, Profile>> => {
    const response = await fetch(`${API_PREFIX}/api/profiles`);
    return handleResponse(response);
};

export const addProfile = async (name: string): Promise<{ id: string, profile: Profile }> => {
    const response = await fetch(`${API_PREFIX}/api/profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    });
    return handleResponse(response);
};

export const updateProfile = async (id: string, profile: Profile): Promise<Profile> => {
    const response = await fetch(`${API_PREFIX}/api/profiles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
    });
    return handleResponse(response);
};

export const deleteProfile = async (id: string): Promise<void> => {
    const response = await fetch(`${API_PREFIX}/api/profiles/${id}`, {
        method: 'DELETE',
    });
    await handleResponse(response);
};