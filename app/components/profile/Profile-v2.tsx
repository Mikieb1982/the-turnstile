'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import Link from 'next/link';

export default function ProfileV2() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="bg-background-dark font-body text-gray-200 antialiased">
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between bg-background-dark/80 px-4 backdrop-blur-sm">
          <button className="flex h-10 w-10 items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-white">menu</span>
          </button>
          <div className="flex-1"></div>
          <div className="size-10 shrink-0"></div>
        </header>
        <main className="flex-grow px-4 pb-28">
          <div className="mx-auto max-w-lg">
            {user ? (
              <>
                <h1 className="font-display mb-5 text-4xl font-normal uppercase tracking-wide text-white">Profile</h1>
                <div className="shadow-card mb-6 rounded-xl border border-white/10 bg-card-dark p-6 text-center">
                  <div className="relative mx-auto h-28 w-28">
                    <div
                      className="h-28 w-28 rounded-full bg-cover bg-center bg-no-repeat ring-4 ring-primary/40"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDl7UVtMFWI3gq5nPqyHPg7xspf8mPwJax7DcqDmVCaCNiNDicAPykXpVm26qnZO1IK6WxAUtXmERF-rvaIUBI-WvTYVqq9yjBZiFLhZqgnZUcYkwpgbso6w987ctHkA7GnRiBSLvpirDgO0mPkrdNR05OvjtHn9qP0ecIValp_KQ7UA4PxDBL32ihPJ6nHRK0BtpKyhCC7mfHB4aNegzsvSaU0gmZw3PsmjeWE4pDjgpKZ5r5R0sZUK8mj8JSnoespX31as0YMX0NV")',
                      }}
                    ></div>
                    <button className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-secondary text-white transition-transform duration-200 hover:scale-110">
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'wght' 500" }}>
                        edit
                      </span>
                    </button>
                  </div>
                  <p className="font-display mt-4 text-3xl font-normal leading-tight tracking-wide text-white">{user.displayName || user.email}</p>
                </div>
                <div className="shadow-card mb-6 rounded-xl border border-white/10 bg-card-dark">
                  <div className="p-6">
                    <h2 className="font-display mb-5 text-xl font-normal uppercase tracking-wide text-secondary">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 gap-5">
                      <label className="flex flex-col flex-1">
                        <p className="pb-2 text-sm font-medium leading-snug text-gray-300">First Name</p>
                        <input
                          className="form-input h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-2 border-[#3b5444] bg-[#111813] px-4 text-base leading-normal text-white placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/40"
                          value="John"
                        />
                      </label>
                      <label className="flex flex-col flex-1">
                        <p className="pb-2 text-sm font-medium leading-snug text-gray-300">Last Name</p>
                        <input
                          className="form-input h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-2 border-[#3b5444] bg-[#111813] px-4 text-base leading-normal text-white placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/40"
                          value="Doe"
                        />
                      </label>
                      <label className="flex flex-col flex-1">
                        <p className="pb-2 text-sm font-medium leading-snug text-gray-300">Date of Birth</p>
                        <input
                          className="form-input h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-2 border-[#3b5444] bg-[#111813] px-4 text-base leading-normal text-white placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/40"
                          type="date"
                          value="1995-08-15"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="shadow-card mb-8 rounded-xl border border-white/10 bg-card-dark">
                  <div className="p-6">
                    <h2 className="font-display mb-5 text-xl font-normal uppercase tracking-wide text-secondary">
                      Contact Information
                    </h2>
                    <div className="grid grid-cols-1 gap-5">
                      <label className="flex flex-col flex-1">
                        <p className="pb-2 text-sm font-medium leading-snug text-gray-300">Email Address</p>
                        <input
                          className="form-input h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-2 border-[#3b5444] bg-[#111813] px-4 text-base leading-normal text-white placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/40"
                          type="email"
                          value={user.email || ''}
                        />
                      </label>
                      <label className="flex flex-col flex-1">
                        <p className="pb-2 text-sm font-medium leading-snug text-gray-300">Phone Number</p>
                        <input
                          className="form-input h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-2 border-[#3b5444] bg-[#111813] px-4 text-base leading-normal text-white placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/40"
                          type="tel"
                          value="+1 (555) 123-4567"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <button className="shadow-button font-display flex h-14 w-full min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-4 text-lg font-normal uppercase leading-normal tracking-wider text-background-dark transition-transform duration-200 hover:scale-[1.02]">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'wght' 600" }}>
                    save
                  </span>
                  <span className="truncate">Save Changes</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="shadow-button font-display flex h-14 w-full min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-red-500 mt-4 px-4 text-lg font-normal uppercase leading-normal tracking-wider text-white transition-transform duration-200 hover:scale-[1.02]">
                  <span className="truncate">Log Out</span>
                </button>
              </>
            ) : (
                <div className="text-center py-20">
                <h1 className="font-display mb-5 text-4xl font-normal uppercase tracking-wide text-white">Profile</h1>
                <p className="text-lg mb-8">Please log in to view your profile.</p>
                <Link href="/sign-in">
                  <button
                    className="shadow-button font-display flex h-14 w-full min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-4 text-lg font-normal uppercase leading-normal tracking-wider text-background-dark transition-transform duration-200 hover:scale-[1.02]"
                  >
                    <span className="truncate">Log In</span>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
