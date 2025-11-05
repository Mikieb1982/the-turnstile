'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { createTeam, updateTeam } from '../actions';
import { TeamInfo } from '@/types'; // Assuming this is in types.ts

// Define the shape of the team data as it comes from Firestore
export type TeamDocument = TeamInfo & {
  id: string;
};

interface TeamFormProps {
  team?: TeamDocument;
  onDone?: () => void; // Function to call when form is successfully submitted
}

function SubmitButton({ isUpdating }: { isUpdating: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-primary hover:bg-green-600 text-background-dark font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:bg-gray-600 disabled:opacity-50"
    >
      {pending ? 'Saving...' : (isUpdating ? 'Update Team' : 'Create Team')}
    </button>
  );
}

export default function TeamForm({ team, onDone }: TeamFormProps) {
  // Bind the teamId if we are in update mode
  const action = team ? updateTeam.bind(null, team.id) : createTeam;
  const [state, formAction] = useActionState(action, { message: '', success: false, errors: {} });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // If the action was successful, reset the form (if creating)
    // or call onDone (if updating)
    if (state.success) {
      if (!team) {
        formRef.current?.reset();
      }
      if (onDone) {
        onDone();
      }
    }
  }, [state.success, onDone, team]);

  const fieldWrapperClass = "space-y-1";
  const labelClass = "block text-sm font-medium text-gray-300";
  const inputClass = "w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary";
  const errorClass = "text-red-400 text-sm";

  return (
    <form ref={formRef} action={formAction} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
      {state?.message && !state.success && <p className="text-red-400 mb-4">{state.message}</p>}
      {state?.success && state.message && <p className="text-green-400 mb-4">{state.message}</p>}
      
      <div className={fieldWrapperClass}>
        <label htmlFor="name" className={labelClass}>Team Name</label>
        <input type="text" id="name" name="name" defaultValue={team?.name} className={inputClass} required />
        {state.errors?.name && <p className={errorClass}>{state.errors.name.join(', ')}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={fieldWrapperClass}>
          <label htmlFor="established" className={labelClass}>Established (Year)</label>
          <input type="number" id="established" name="established" defaultValue={team?.established} className={inputClass} required />
          {state.errors?.established && <p className={errorClass}>{state.errors.established.join(', ')}</p>}
        </div>
        <div className={fieldWrapperClass}>
          <label htmlFor="titles" className={labelClass}>Titles</label>
          <input type="text" id="titles" name="titles" defaultValue={team?.titles} className={inputClass} required />
          {state.errors?.titles && <p className={errorClass}>{state.errors.titles.join(', ')}</p>}
        </div>
      </div>
      
      <div className={fieldWrapperClass}>
        <label htmlFor="location" className={labelClass}>Location</label>
        <input type="text" id="location" name="location" defaultValue={team?.location} className={inputClass} required />
        {state.errors?.location && <p className={errorClass}>{state.errors.location.join(', ')}</p>}
      </div>

      <div className="border-t border-gray-700 pt-4 space-y-4">
        <h3 className="text-lg font-semibold text-primary">Stadium Details</h3>
        <div className={fieldWrapperClass}>
          <label htmlFor="stadiumName" className={labelClass}>Stadium Name</label>
          <input type="text" id="stadiumName" name="stadiumName" defaultValue={team?.stadium.name} className={inputClass} required />
          {state.errors?.stadiumName && <p className={errorClass}>{state.errors.stadiumName.join(', ')}</p>}
        </div>
        <div className={fieldWrapperClass}>
          <label htmlFor="stadiumCapacity" className={labelClass}>Capacity</label>
          <input type="text" id="stadiumCapacity" name="stadiumCapacity" defaultValue={team?.stadium.capacity} className={inputClass} required />
          {state.errors?.stadiumCapacity && <p className={errorClass}>{state.errors.stadiumCapacity.join(', ')}</p>}
        </div>
        <div className={fieldWrapperClass}>
          <label htmlFor="stadiumNotes" className={labelClass}>Notes</label>
          <textarea id="stadiumNotes" name="stadiumNotes" defaultValue={team?.stadium.notes} className={inputClass} rows={2} />
        </div>
      </div>
      
      <SubmitButton isUpdating={!!team} />
    </form>
  );
}
