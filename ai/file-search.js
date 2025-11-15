const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({});

async function search_files(query, files) {
  // Create the File Search store with an optional display name
  const fileSearchStore = await ai.fileSearchStores.create({
    config: { displayName: 'file-search-store' }
  });

  for(const file of files) {
    // Upload and import a file into the File Search store, supply a file name which will be visible in citations
    let operation = await ai.fileSearchStores.uploadToFileSearchStore({
      file: file,
      fileSearchStoreName: fileSearchStore.name,
      config: {
        displayName: file,
      }
    });

    // Wait until import is complete
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.get({ operation });
    }
  }


  // Ask a question about the file
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: query,
    config: {
      tools: [
        {
          fileSearch: {
            fileSearchStoreNames: [fileSearchStore.name]
          }
        }
      ]
    }
  });

  return response.text;
}

module.exports = {
    search_files
}
