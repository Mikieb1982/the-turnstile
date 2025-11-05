'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { createTeam, updateTeam } from './actions';
import { TeamInfo } from '@/types';

interface TeamFormProps {
  team?: (TeamInfo & { id: string });
  onDone?: () => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-primary hover:bg-green-600 text-background-dark font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:bg-gray-600"
    >
      {pending ? 'Saving...' : 'Save Team'}
    </button>
  );
}

export default function TeamForm({ team, onDone }: TeamFormProps) {
  const action = team ? updateTeam.bind(null, team.id) : createTeam;
  const [state, formAction] = useActionState(action, { message: '', success: false, errors: {} });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      if (onDone) onDone();
    }
  }, [state.success, onDone]);

  return (
    <form ref={formRef} action={formAction} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
      {state?.message && !state.success && <p className="text-red-500 mb-4">{state.message}</p>}
      
      <div>
        <label htmlFor="name" className="block text-gray-300 mb-2">Team Name</label>
        <input
          type="text" id="name" name="name"
          defaultValue={team?.name}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {state.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name.join(', ')}</p>}
      </div>

      <div>
        <label htmlFor="established" className="block text-gray-300 mb-2">Established (Year)</label>
        <input
          type="number" id="established" name="established"
          defaultValue={team?.established}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {state.errors?.established && <p className="text-red-500 text-sm mt-1">{state.errors.established.join(', ')}</p>}
      </div>

      <div>
        <label htmlFor="titles" className="block text-gray-300 mb-2">Titles</label>
        <input
          type="text" id="titles" name="titles"
          defaultValue={team?.titles}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {state.errors?.titles && <p className="text-red-500 text-sm mt-1">{state.errors.titles.join(', ')}</p>}
      </div>
      
      <div>
        <label htmlFor="location" className="block text-gray-300 mb-2">Location</label>
        <input
          type="text" id="location" name="location"
          defaultValue={team?.location}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {state.errors?.location && <p className="text-red-500 text-sm mt-1">{state.errors.location.join(', ')}</p>}
      </div>

      <div className="border-t border-gray-700 pt-4">
        <h3 className="text-lg font-semibold text-primary mb-2">Stadium Details</h3>
        <div>
          <label htmlFor="stadiumName" className="block text-gray-300 mb-2">Stadium Name</label>
          <input
            type="text" id="stadiumName" name="stadiumName"
            defaultValue={team?.stadium.name}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {state.errors?.stadiumName && <p className="text-red-500 text-sm mt-1">{state.errors.stadiumName.join(', ')}</p>}
        </div>
        <div>
          <label htmlFor="stadiumCapacity" className="block text-gray-300 mb-2 mt-2">Capacity</label>
          <input
            type="text" id="stadiumCapacity" name="stadiumCapacity"
            defaultValue={team?.stadium.capacity}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {state.errors?.stadiumCapacity && <p className="text-red-500 text-sm mt-1">{state.errors.stadiumCapacity.join(', ')}</p>}
        </div>
        <div>
          <label htmlFor="stadiumNotes" className="block text-gray-300 mb-2 mt-2">Notes</label>
          <textarea
            id="stadiumNotes" name="stadiumNotes"
            defaultValue={team?.stadium.notes}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
          />
        </div>
      </div>
      
      <SubmitButton />
    </form>
  );
}
