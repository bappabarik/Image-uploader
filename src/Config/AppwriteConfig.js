import { Client, Account, Storage } from 'appwrite';

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL) // Your Appwrite Endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your project ID

const account = new Account(client);
const storage = new Storage(client);

export { client, account, storage };
