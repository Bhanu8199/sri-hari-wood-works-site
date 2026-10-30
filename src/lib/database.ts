import { Pool } from 'pg';

type Database = Pool;

const globalForDatabase = globalThis as typeof globalThis & {
  neonPostgres?: Database;
};

export function getDatabase(): Database | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }

  if (!globalForDatabase.neonPostgres) {
    globalForDatabase.neonPostgres = new Pool({
      connectionString,
      max: 5,
      idleTimeoutMillis: 20_000,
      connectionTimeoutMillis: 10_000,
      ssl: { rejectUnauthorized: false }
    });
  }

  return globalForDatabase.neonPostgres;
}
