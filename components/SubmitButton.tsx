// components/SubmitButton.tsx
'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
    >
      {pending ? 'Saving...' : 'Save Changes'}
    </button>
  );
}
