'use server';

import Parser from 'rss-parser';

const parser = new Parser();

async function getFeed(feedUrl: string) {
  try {
    const feed = await parser.parseURL(feedUrl);
    return feed.items;
  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error);
    return [];
  }
}

export default async function SuperLeagueNews() {
  const feed = await getFeed('https://www.skysports.com/rss/12196');

  return (
    <div className="bg-gray-800 p-6 rounded-lg card-lifted">
      <h2 className="text-2xl font-bold mb-4">Super League News</h2>
      {feed.length > 0 ? (
        <ul>
          {feed.slice(0, 5).map((item) => (
            <li key={item.guid} className="mb-4 border-b border-gray-700 pb-4">
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:text-green-400">
                {item.title}
              </a>
              <p className="text-gray-400 text-sm mt-1">{item.pubDate}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">Could not load news feed.</p>
      )}
    </div>
  );
}
