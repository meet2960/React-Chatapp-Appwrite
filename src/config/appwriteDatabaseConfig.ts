import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class DatabaseService {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
}

// export const databaseService = new DatabaseService();
// export const databaseCRUD = databaseService.databases;