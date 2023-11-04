import { Client, Account, Databases } from "appwrite";
import conf from "../conf/conf";
export const client = new Client();

client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(client);

export const databases = new Databases(client);

export const CHAT_COLLECTION_ID = String(
  import.meta.env.VITE_APPWRITE_CHATCOLLECTION_ID
);
