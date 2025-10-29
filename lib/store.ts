
import { create } from 'zustand';

const useStore = create((set) => ({
  searchTerm: '',
  setSearchTerm: (searchTerm) => set({ searchTerm }),
}));

export default useStore;
