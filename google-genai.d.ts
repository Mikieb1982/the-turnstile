declare module '@google/genai' {
  export class GoogleGenAI {
    constructor(config: { apiKey: string });
    chats: {
      create(options: any): Chat;
    };
  }

  export interface Chat {
    sendMessageStream(options: { message: string }): AsyncIterable<{ text: string }>;
  }
}
