import { neon } from "@neondatabase/serverless";
import { config } from "dotenv"
import { drizzle } from "drizzle-orm/neon-http";


config({
  path: '.dev.vars'
})

// Local mode 
const connectLocalDB = () => {

}


// Production mode
const connectRemoteDB = () => {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  return db;
}