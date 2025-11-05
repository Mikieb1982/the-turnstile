import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { TeamInfo } from '@/types';
import TeamForm from './_components/TeamForm';
import TeamList from './_components/TeamList';

// Define the shape of the team data as it comes from Firestore
export type TeamDocument = TeamInfo & {
  id: string;
  // You can add Firestore-specific fields like createdAt if needed
};

// Fetch data on the server
async function getTeams() {
  try {
    const teamsCollection = collection(db, 'teams');
    const q = query(teamsCollection, orderBy('name', 'asc'));
    const querySnapshot = await getDocs(q);
    const teams = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as TeamDocument[];
    return teams;
  } catch (error) {
    console.error("Error fetching teams: ", error);
    return [];
  }
}

export default async function AdminTeamsPage() {
  const teams = await getTeams();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <h2 className="text-2xl font-bold text-primary mb-4">Add New Team</h2>
        <TeamForm />
      </div>
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold text-primary mb-4">Manage Teams</h2>
        <TeamList teams={teams} />
      </div>
    </div>
  );
}
