const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const app = express();

app.use(cors());
app.use(express.json());

const loadMockData = () => {
  const mockDataPath = path.resolve(__dirname, '../services/mockData.ts');
  const tsSource = fs.readFileSync(mockDataPath, 'utf8');
  const { outputText } = ts.transpileModule(tsSource, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true }
  });

  const module = { exports: {} };
  const exports = module.exports;
  const loader = new Function('require', 'module', 'exports', outputText);
  loader(require, module, exports);

  return module.exports;
};

const { mockMatches, mockLeagueTable } = loadMockData();

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/api/matches', (req, res) => {
  res.json(mockMatches);
});

app.get('/api/league-table', (req, res) => {
  res.json(mockLeagueTable);
});

app.get('/api/users/:userId/profile', (req, res) => {
  const { userId } = req.params;

  res.json({
    id: userId,
    name: 'Placeholder User',
    email: 'placeholder@example.com',
    favouriteTeamId: null,
    bio: 'This is a placeholder profile returned by the mock API.'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
