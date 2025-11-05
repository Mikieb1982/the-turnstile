import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { TeamInfo } from '@/types'; // Assuming types.ts is updated
import TeamForm from './TeamForm'; // We will create this component
import TeamList from './TeamList'; // We will create this component

async function getTeams() {
  try {
    const teamsCollection = collection(db, 'teams');
    const q = query(teamsCollection, orderBy('name', 'asc'));
    const querySnapshot = await getDocs(q);
    const teams = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as (TeamInfo & { id: string })[];
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
