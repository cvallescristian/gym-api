// This is if you want to create migration locally;

import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { resolve } from 'node:path';
import postgres from 'postgres';

config({
  path: '.dev.vars'
})

const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1});

const main = async () => {
	try {
    await migrate(drizzle(migrationClient), { migrationsFolder: resolve(__dirname, '../../migrations')})
		await migrationClient.end();
		console.log('Migration done!');
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

main();