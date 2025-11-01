'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

interface PaginationProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function Pagination({ hasNextPage, hasPrevPage }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';

  const handlePrev = () => {
    router.push(`${pathname}?page=${Number(page) - 1}`);
  };

  const handleNext = () => {
    router.push(`${pathname}?page=${Number(page) + 1}`);
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      <button
        disabled={!hasPrevPage}
        onClick={handlePrev}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <p className="text-white">Page {page}</p>
      <button
        disabled={!hasNextPage}
        onClick={handleNext}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
