// app/components/league-table/LeagueTable-v4.tsx
'use client';

import { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import Image from 'next/image'; // Use Next/Image for optimization

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
    key: 'pos', // Default sort by position
    direction: 'ascending',
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
    // As a secondary sort, use position
    if (a.pos < b.pos) return -1;
    if (a.pos > b.pos) return 1;
    return 0;
  });

  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    // For 'pos' and 'pts', default to ascending and descending respectively
    if (key === 'pos' && (!sortConfig || sortConfig.key !== 'pos')) direction = 'ascending';
    if (key === 'pts' && (!sortConfig || sortConfig.key !== 'pts')) direction = 'descending';

    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: SortableKeys) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowDown className="h-4 w-4 opacity-0 group-hover:opacity-50" />; // Show placeholder on hover
    }
    if (sortConfig.direction === 'ascending') {
      return <ArrowUp className="h-4 w-4" />;
    }
    return <ArrowDown className="h-4 w-4" />;
  };

  return (
    // Use theme colors
    <div className="bg-card rounded-2xl shadow-card-glow overflow-hidden">
      {/* This section for filters can be added back above the table 
        if needed, but is removed here to focus on the table structure.
      */}

      <table className="w-full font-body">
        {/* Table Head */}
        <thead className="border-b border-surface">
          <tr className="font-display uppercase text-sm text-text-secondary">
            <th className="py-4 px-2 text-center group" onClick={() => requestSort('pos')}>
              <div className="flex items-center justify-center gap-1 cursor-pointer">
                Pos {getSortIcon('pos')}
              </div>
            </th>
            <th className="py-4 px-2 text-left group" onClick={() => requestSort('name')}>
              <div className="flex items-center gap-1 cursor-pointer">
                Team {getSortIcon('name')}
              </div>
            </th>
            <th className="py-4 px-2 text-center group" onClick={() => requestSort('p')}>
              <div className="flex items-center justify-center gap-1 cursor-pointer">
                P {getSortIcon('p')}
              </div>
            </th>
            <th className="py-4 px-2 text-center group" onClick={() => requestSort('w')}>
              <div className="flex items-center justify-center gap-1 cursor-pointer">
                W {getSortIcon('w')}
              </div>
            </th>
            <th className="py-4 px-2 text-center group" onClick={() => requestSort('l')}>
              <div className="flex items-center justify-center gap-1 cursor-pointer">
                L {getSortIcon('l')}
              </div>
            </th>
            <th className="py-4 px-2 text-center group" onClick={() => requestSort('d')}>
              <div className="flex items-center justify-center gap-1 cursor-pointer">
                D {getSortIcon('d')}
              </div>
            </th>
            <th className="py-4 px-2 text-center text-primary group" onClick={() => requestSort('pts')}>
              <div className="flex items-center justify-center gap-1 cursor-pointer">
                Pts {getSortIcon('pts')}
              </div>
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-surface">
          {sortedTeams.map((team) => (
            <tr
              key={team.name}
              className={`text-text-primary ${
                team.name === 'Wigan Warriors' ? 'bg-primary/10' : 'hover:bg-surface'
              }`}
            >
              <td className="py-3 px-2 text-center font-bold">{team.pos}</td>
              <td className="py-3 px-2">
                <div className="flex items-center gap-3">
                  <Image
                    src={team.crest}
                    alt={`${team.name} crest`}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="font-medium whitespace-nowrap">{team.name}</span>
                </div>
              </td>
              <td className="py-3 px-2 text-center font-mono text-text-secondary">{team.p}</td>
              <td className="py-3 px-2 text-center font-mono text-text-secondary">{team.w}</td>
              <td className="py-3 px-2 text-center font-mono text-text-secondary">{team.l}</td>
              <td className="py-3 px-2 text-center font-mono text-text-secondary">{team.d}</td>
              <td className="py-3 px-2 text-center font-mono font-bold text-primary">{team.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
