'use client';

import { useState, useEffect } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { addVisit, updateVisit, deleteVisit } from './actions';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Visit } from '@/types';

export default function VisitsClient({ visits, userId }: { visits: Visit[], userId: string | undefined }) {
  const router = useRouter();
  const [editingVisit, setEditingVisit] = useState<Visit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, formAction] = useActionState(addVisit, { message: '', success: false });

  useEffect(() => {
    if (formState.success) {
      router.refresh();
    }
  }, [formState, router]);

  const handleEditClick = (visit: Visit) => {
    setEditingVisit(visit);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (visitId: string) => {
    if (window.confirm('Are you sure you want to delete this visit?')) {
      await deleteVisit(visitId);
    }
  };

  const handleModalClose = () => {
    setEditingVisit(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-bold text-cyan-400 mb-8">Add a New Visit</h1>
            <form action={formAction} className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-lg mx-auto">
              {formState?.message && <p className="text-red-500 mb-4">{formState.message}</p>}
              <input type="hidden" name="userId" value={userId} />
              <div className="mb-4">
                <label htmlFor="stadium" className="block text-gray-300 mb-2">Stadium</label>
                <input
                  type="text"
                  id="stadium"
                  name="stadium"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="notes" className="block text-gray-300 mb-2">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                Add Visit
              </button>
            </form>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-cyan-400 mb-8">Your Visits</h1>
            <div className="space-y-4">
              {visits.length > 0 ? (
                visits.map((visit: Visit) => (
                  <div key={visit.id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xl font-bold">{visit.stadium}</p>
                        <p className="text-gray-400">{new Date(visit.date).toLocaleDateString('en-GB', { timeZone: 'UTC' })}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button onClick={() => handleEditClick(visit)} className="text-gray-400 hover:text-white">
                          <FiEdit size={20} />
                        </button>
                        <button onClick={() => handleDeleteClick(visit.id)} className="text-gray-400 hover:text-white">
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center text-gray-400">
                  <p>No visits logged yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && editingVisit && (
        <EditVisitModal
          visit={editingVisit}
          onClose={handleModalClose}
          router={router}
        />
      )}
    </div>
  );
}

function EditVisitModal({ visit, onClose, router }: { visit: Visit, onClose: () => void, router: any }) {
  const updateAction = updateVisit.bind(null, visit.id);
  const [formState, formAction] = useActionState(updateAction, { message: '', success: false });

  useEffect(() => {
    if (formState.success) {
      onClose();
      router.refresh();
    }
  }, [formState.success, onClose, router]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-lg w-full">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Edit Visit</h2>
        <form action={formAction}>
          {formState?.message && <p className="text-red-500 mb-4">{formState.message}</p>}
          <div className="mb-4">
            <label htmlFor="stadium" className="block text-gray-300 mb-2">Stadium</label>
            <input
              type="text"
              id="stadium"
              name="stadium"
              required
              defaultValue={visit.stadium}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-300 mb-2">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              required
              defaultValue={visit.date}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="notes" className="block text-gray-300 mb-2">Notes</label>
            <textarea
              id="notes"
              name="notes"
              defaultValue={visit.notes}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg">
              Update Visit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
