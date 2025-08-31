import type { Config } from 'drizzle-kit';

export default {
	schema: './src/database/schema.ts',
	out: './migrations',
	dialect: 'sqlite',
    driver: 'd1-http',
    verbose: true,
} satisfies Config;
