import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({
	path: '.dev.vars',
});

export default defineConfig({
	dialect: 'postgresql', // "mysql" | "sqlite"
	out: './migrations',
	schema: './src/db/schema.ts',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	}
});