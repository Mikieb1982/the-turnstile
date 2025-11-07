// services/mockData.ts

// Fix: Converted JSON to a TypeScript export.
// The file was previously invalid JSON-like syntax in a .ts file.
// Also transformed the `teams` array into an object `TEAMS` as expected
// by app/teams/page.tsx and app/results/page.tsx.

const teamsData = [
    {
      "id": "HKR",
      "name": "Hull Kingston Rovers",
      "shortName": "Hull KR",
      "location": "Hull",
      "established": 1882,
      "titles": "5x League Champions",
      "stadium": {
        "name": "Sewell Group Craven Park",
        "city": "Hull",
        "capacity": "12,225",
        "coordinates": {
          "latitude": 53.752,
          "longitude": -0.276
        },
        "notes": ""
      },
      "players": [
        {
          "id": "p1",
          "name": "Mikey Lewis",
          "position": "Halfback",
          "stats": {
            "appearances": 100,
            "tries": 50
          }
        }
      ]
    },
    {
      "id": "WIG",
      "name": "Wigan Warriors",
      "shortName": "Wigan",
      "location": "Wigan",
      "established": 1872,
      "titles": "23x League Champions",
      "stadium": {
        "name": "Brick Community Stadium",
        "city": "Wigan",
        "capacity": "25,133",
        "coordinates": {
          "latitude": 53.547,
          "longitude": -2.653
        },
        "notes": ""
      },
      "players": [
        {
          "id": "p2",
          "name": "Harry Smith",
          "position": "Halfback",
          "stats": {
            "appearances": 120,
            "goals": 300
          }
        }
      ]
    },
    {
      "id": "LEP",
      "name": "Leigh Leopards",
      "shortName": "Leigh",
      "location": "Leigh",
      "established": 1878,
      "titles": "2x League Champions",
      "stadium": {
        "name": "Leigh Sports Village",
        "city": "Leigh",
        "capacity": "12,000",
        "coordinates": {
          "latitude": 53.483,
          "longitude": -2.516
        },
        "notes": ""
      },
      "players": []
    },
    {
      "id": "LEE",
      "name": "Leeds Rhinos",
      "shortName": "Leeds",
      "location": "Leeds",
      "established": 1870,
      "titles": "11x League Champions",
      "stadium": {
        "name": "Headingley Stadium",
        "city": "Leeds",
        "capacity": "21,062",
        "coordinates": {
          "latitude": 53.819,
          "longitude": -1.582
        },
        "notes": ""
      },
      "players": []
    },
    {
      "id": "STH",
      "name": "St Helens",
      "shortName": "Saints",
      "location": "St Helens",
      "established": 1873,
      "titles": "17x League Champions",
      "stadium": {
        "name": "Totally Wicked Stadium",
        "city": "St Helens",
        "capacity": "18,000",
        "coordinates": {
          "latitude": 53.453,
          "longitude": -2.74
        },
        "notes": ""
      },
      "players": []
    },
    {
      "id": "WAK",
      "name": "Wakefield Trinity",
      "shortName": "Wakefield",
      "location": "Wakefield",
      "established": 1873,
      "titles": "2x League Champions",
      "stadium": {
        "name": "Belle Vue",
        "city": "Wakefield",
        "capacity": "9,333",
        "coordinates": {
          "latitude": 53.671,
          "longitude": -1.484
        },
        "notes": ""
      },
      "players": []
    },
    {
      "id": "HFC",
      "name": "Hull FC",
      "shortName": "Hull FC",
      "location": "Hull",
      "established": 1865,
      "titles": "6x League Champions",
      "stadium": {
        "name": "MKM Stadium",
        "city": "Hull",
        "capacity": "25,586",
        "coordinates": {
          "latitude": 53.746,
          "longitude": -0.366
        },
        "notes": ""
      },
      "players": []
    },
    {
      "id": "WAR",
      "name": "Warrington Wolves",
      "shortName": "Warrington",
      "location": "Warrington",
      "established": 1876,
      "titles": "3x League Champions",
      "stadium": {
        "name": "Halliwell Jones Stadium",
        "city": "Warrington",
        "capacity": "15,200",
        "coordinates": {
          "latitude": 53.391,
          "longitude": -2.602
        },
        "notes": ""
      },
      "players": []
    },
    {
      "id": "CAT",
      "name": "Catalans Dragons",
      "shortName": "Catalans",
      "location": "Perpignan, France",
      "established": 2000,
      "titles": "0x League Champions",
      "stadium": {
        "name": "Stade Gilbert Brutus",
        "city": "Perpignan",
        "capacity": "13,000",
        "coordinates": {
          "latitude": 42.697,
          "longitude": 2.903
        },
        "notes": ""
      },
      "players": []
    },
    {
      "id": "HUD",
      "name": "Huddersfield Giants",
      "shortName": "Huddersfield",
      "location": "Huddersfield",
      "established": 1864,
      "titles": "7x League Champions",
      "stadium": {
        "name": "John Smith's Stadium",
        "city": "Huddersfield",
        "capacity": "24,500",
        "coordinates": {
          "latitude": 53.654,
          "longitude": -1.768
        },
        "notes": ""
      },
      "players": []
    },
    {
      "id": "CAS",
      "name": "Castleford Tigers",
      "shortName": "Castleford",
      "location": "Castleford",
      "established": 1926,
      "titles": "0x League Champions",
      "stadium": {
        "name": "Mend-A-Hose Jungle",
        "city": "Castleford",
        "capacity": "11,775",
        "coordinates": {
          "latitude": 53.725,
          "longitude": -1.362
        },
        "notes": ""
      },
      "players": []
    },
    {
      "id": "SAL",
      "name": "Salford Red Devils",
      "shortName": "Salford",
      "location": "Salford",
      "established": 1873,
      "titles": "6x League Champions",
      "stadium": {
        "name": "Salford Community Stadium",
        "city": "Salford",
        "capacity": "12,000",
        "coordinates": {
          "latitude": 53.483,
          "longitude": -2.358
        },
        "notes": ""
      },
      "players": []
    }
  ];

// Create the TEAMS object as expected by the components
export const TEAMS: { [key: string]: any } = teamsData.reduce((acc, team) => {
  acc[team.id] = { ...team, logoUrl: `https://placehold.co/64x64/1a2c20/FFFFFF?text=${team.id}` };
  return acc;
}, {} as { [key: string]: any });


// Add dummy exports for other variables imported in app/results/page.tsx
// to prevent subsequent build failures.
export const finalLeagueTable: any[] = [];
export const selectedMatchResults: any[] = [];

// FIX: Added explicit type to prevent TypeScript from inferring 'never[]'
export const playoffResults: { Eliminators: any[]; SemiFinals: any[]; GrandFinal: any } = {
  Eliminators: [],
  SemiFinals: [],
  GrandFinal: {}
};
export const mockFixtures: any[] = [];
