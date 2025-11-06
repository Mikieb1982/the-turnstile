'use client'; 

import { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const teams = [
  {
    pos: 1,
    crest: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8mm-l4ZoW8EnqbqMcE2dJ-KtVXjC4q0K_hF25fGfJ7ZA-3lFzXa8EjizDWMqGi96JeQzVmHOiBl0ecMVvGzfzbnSRIZqie-cHscHvMsbBsFdwwSr1eP1t75q3GFPf_fgblKozMK5HPmeES0EyVJ6n1XvrwcVopZ1w5M7hEPaUsv27-SPNV07ujXV5aLHtqdL_sWq3bqTbqGLnwWCZZfT2-fCazECEXDFVegdHJl0dqMwQjkfHxdGvv7BHwPEeDNmOMb92PPgP2GF7',
    name: 'St Helens',
    p: 14,
    w: 12,
    l: 2,
    d: 0,
    pts: 24,
  },
  {
    pos: 2,
    crest: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWcHYEEq7-nxiK-ODhgm95IUE8WkGqgFDiWrzB9PG5sxDt_bn3t889dY9o3hfQyFYBn0Ms9GtKVbl4KYYemdJctYPa02QqIfuiDzfdkoj3eo1_aQ7RLWnoI_E529Dr60DWgvp5K0NlV4CuzGKNzWNFOlhKj3FHCWFmwzcPH5X3XTvVx_qlGprSfToroFICaaiNHCLOO3ec7BdAFPeUzScZXxN5TkPwcOv9y1RJ2ONzj2raEJTUmq3PMNZKDLZjIUr6g0wYeV2KUXMp',
    name: 'Wigan Warriors',
    p: 14,
    w: 11,
    l: 3,
    d: 0,
    pts: 22,
  },
  {
    pos: 3,
    crest: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-CJsezTT11Oi8gETRIZDRk1D-JNoYEIaowo4kXiDbGRgCR1zxp65x_SXXCdYrKeWUeWJVez8r1FanmrNtoP6Aro-F8E4rTSnFmOPNLXVHmJF728beKpv9o4Cav3GyqqpZhB0TIIQ6gwG5Ik92AZrzfgz815mBRByoDTh6UTslCsj5fLitthYdYb8oRBi27FLScdOZnPtZJ4v9OzisM9miROEU0FMKCcOM_48LpdU58OlVq-Z2e7gdTCcQyy-8EDT7K3jk_vlPPxul',
    name: 'Catalans Dragons',
    p: 13,
    w: 10,
    l: 3,
    d: 0,
    pts: 20,
  },
  {
    pos: 4,
    crest: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRrgmbyrtaqULLyg6Djx0ZlRr9CNqVBNR3XCxp629MwS_5df-9hdMglo7-I8jRCwpa8lDBPazUD1OHsNH6n18nx5Q2exYEsIToX3lWhMyVhoWYDiOyhC1VkdSmYYSboG2-VSFicaXq3q47B_y6gN0y6d3APGhShGMLCIB1FrdFv5wZule0q0gPksqQFDpxgDP5bhSIE6DyfsGpsFcuG2MFNfbQ9rKxaEiMU6nG1gIf7cceB9g07ibdzy5jKijNJGl_blvC_kbWZGa5',
    name: 'Hull KR',
    p: 14,
    w: 9,
    l: 5,
    d: 0,
    pts: 18,
  },
  {
    pos: 5,
    crest: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEfogFVqjLWyLw2yDfzM8jJOpocTlWab_aRC62HPRhJXPq3p4isO7vcoOb9WU5LQsr5tVIzF-69mhbX5MuSJProqTZFwKZMxUKrBkRAqKB_ke-VddPts61QjR6iFKt0im5LB6W5Z-ByZFRiS70QUKSn2EXWOVqKEsvUAgY7IwEqMJGvTuNt5c8-JI3YtjxO0zCvU83iE2da34XRIzWTDFF0KyIbw7uVS8TxZJ-axiFHsKJLnzGWHm3pjrNYC-f4r0WhKk5ScWPnO1P',
    name: 'Warrington',
    p: 14,
    w: 8,
    l: 6,
    d: 0,
    pts: 16,
  },
  {
    pos: 6,
    crest: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxZsdGrPPk9cQqrlhLM1jnNNUBm1E1rvO4xZMpQZ_M1CzavRSavzG-7yarjbpOYXEX1fN-lakcpa-3tBpGHMlFuime3SKpJUJNK7qB2yVDbHzGRt2WGD5jn5xV5-x66NB2v6YxHfyvDcly27WvH_Y8IcLme1NjAGUx9lrj8ECbbf4-fnkoAUjPFEGDYgoO1UaOpya1qA5GimV0C03exbQXxoSokZo8Ha3Pf_fPvryrieHafVUY0XdLI6ZTyxU1ivJfJ1T0JeaYbm_9',
    name: 'Salford',
    p: 13,
    w: 7,
    l: 6,
    d: 0,
    pts: 14,
  },
  {
    pos: 7,
    crest: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0XDyUTeONHIVVnoKgO2LOqHybzCCsgp3EsOI9KmpVlKAAi46c-SFMHC28Q6QeZnQSe4lIVWI_QdZP-VnuIT_WPXnNmVK4hM3EKgCHbi6SW5Z8pCPa9LFtjnMDxRzWFVEwlX4cFoGd6rdbvrn0f3EcCWb5vgCY2YV122EolPSTRyUIZnMowoC6OjzzEQljsY8ivhDhsPw5mhivbfnldsLBqiiWVIpprtgbM-rvqmIM25puxThHiVftZBgD2cBkYdH1DAYiui9uAlmu',
    name: 'Leeds Rhinos',
    p: 13,
    w: 6,
    l: 7,
    d: 0,
    pts: 12,
  },
  {
    pos: 8,
    crest: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeRoFH5tM3u-OmHgweGmGdlhxrvXC4nRfH8Hd_yniAdPz1oqu4MJfv5POZxoP6JssEkxgWMCdHUHJZNgKi9KopwjUOt5xQTa5ub9wUOuEmkHHK3-BDCRBs0GBfzQKNz1_nX2D5ZzfS5ouqQxhJsOz_s0Vz1gzNV3zj0ltfAfHaTp89oC2j_gUhwg0dDu3YjYxj7A3FI-uMRXlytqMkNN52F3g2ayluH3U7NC6AbGEajSo_d2Mc_1-u-m0Q402GcXXSiFq0lU_OqOoF',
    name: 'Huddersfield',
    p: 13,
    w: 5,
    l: 7,
    d: 1,
    pts: 11,
  },
];

type SortableKeys = 'pos' | 'name' | 'p' | 'w' | 'l' | 'd' | 'pts';

export default function LeagueTableV4() {
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>({
    key: 'pts',
    direction: 'descending',
  });

  const sortedTeams = [...teams].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: SortableKeys) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    if (sortConfig.direction === 'ascending') {
      return <ArrowUp className="h-4 w-4" />;
    }
    return <ArrowDown className="h-4 w-4" />;
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display">
      <div className="relative flex min-h-screen w-full flex-col">
        <div className="sticky top-0 z-10 flex items-center bg-background-light/80 dark:bg-background-dark/80 p-4 pb-2 backdrop-blur-sm">
          <button className="flex size-10 shrink-0 items-center justify-center text-white">
            <span className="material-symbols-outlined text-zinc-100">arrow_back</span>
          </button>
          <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-zinc-100">League Table</h1>
          <button className="flex size-10 shrink-0 items-center justify-center text-white">
            <span className="material-symbols-outlined text-zinc-100">ios_share</span>
          </button>
        </div>
        <div className="flex flex-col gap-4 px-4 pt-2 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative">
              <select className="appearance-none rounded-full border border-zinc-700 bg-zinc-800 py-2 pl-4 pr-10 text-sm font-medium text-zinc-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                <option>Super League 2024</option>
                <option>Super League 2023</option>
                <option>Super League 2022</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">expand_more</span>
            </div>
            <p className="text-xs font-normal leading-normal text-zinc-400 whitespace-nowrap">Last updated: 2 mins ago</p>
          </div>
          <div>
            <p className="mb-2 text-sm font-normal leading-normal text-zinc-400">Sort by</p>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => requestSort('pts')}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${
                  sortConfig?.key === 'pts' ? 'bg-primary text-background-dark' : 'bg-zinc-800 text-zinc-300'
                }`}
              >
                <span>Points</span>
                {getSortIcon('pts')}
              </button>
              <button
                onClick={() => requestSort('name')}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                  sortConfig?.key === 'name' ? 'bg-primary text-background-dark' : 'bg-zinc-800 text-zinc-300'
                }`}
              >
                <span>Team</span>
              </button>
              <button
                onClick={() => requestSort('w')}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                  sortConfig?.key === 'w' ? 'bg-primary text-background-dark' : 'bg-zinc-800 text-zinc-300'
                }`}
              >
                <span>Wins</span>
              </button>
              <button
                onClick={() => requestSort('p')}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                  sortConfig?.key === 'p' ? 'bg-primary text-background-dark' : 'bg-zinc-800 text-zinc-300'
                }`}
              >
                <span>Played</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2 px-4 pb-6">
          <div className="flex min-h-14 items-center gap-4">
            <div className="flex flex-1 items-center gap-4">
              <p className="w-8 text-center text-xs font-medium uppercase tracking-wider text-zinc-400">Pos</p>
              <p className="flex-1 text-xs font-medium uppercase tracking-wider text-zinc-400">Team</p>
            </div>
            <div className="flex shrink-0 space-x-4 text-center">
              <p className="w-6 text-xs font-medium uppercase tracking-wider text-zinc-400">P</p>
              <p className="w-6 text-xs font-medium uppercase tracking-wider text-zinc-400">W</p>
              <p className="w-6 text-xs font-medium uppercase tracking-wider text-zinc-400">L</p>
              <p className="w-6 text-xs font-medium uppercase tracking-wider text-zinc-400">D</p>
              <p className="flex w-8 items-center justify-center gap-1 text-xs font-bold uppercase tracking-wider text-primary">
                Pts
                {getSortIcon('pts')}
              </p>
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-zinc-900/50">
            {sortedTeams.map((team, index) => (
              <div
                key={team.name}
                className={`flex min-h-16 items-center gap-4 border-b border-zinc-800 p-2 ${
                  team.name === 'Wigan Warriors' ? 'bg-primary/10 rounded-lg ring-1 ring-primary/50' : ''
                } ${index === sortedTeams.length - 1 ? 'border-b-0' : ''}`}
              >
                <div className="flex flex-1 items-center gap-4">
                  <p className="w-8 shrink-0 text-center text-base font-semibold leading-normal text-white">{team.pos}</p>
                  <div
                    className="size-8 rounded-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url("${team.crest}")` }}
                  ></div>
                  <p className="flex-1 truncate text-base font-medium leading-normal text-white">{team.name}</p>
                </div>
                <div className="flex shrink-0 space-x-4 text-center font-mono text-sm">
                  <p className="w-6 text-zinc-300">{team.p}</p>
                  <p className="w-6 text-zinc-300">{team.w}</p>
                  <p className="w-6 text-zinc-300">{team.l}</p>
                  <p className="w-6 text-zinc-300">{team.d}</p>
                  <p className="w-8 font-bold text-primary">{team.pts}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
