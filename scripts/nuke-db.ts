import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function nuke() {
    console.log('Connecting to DB...');
    const client = await pool.connect();
    try {
        console.log('Dropping public schema...');
        await client.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
        console.log('Database schema reset successfully.');
    } catch (err) {
        console.error('Error resetting DB:', err);
        process.exit(1);
    } finally {
        client.release();
        pool.end();
    }
}
nuke();
