import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import * as process from 'process';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DB_CONNECTION_STRING,
      ssl: { rejectUnauthorized: false },
    });
  }

  async onModuleInit() {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS items (
        id uuid PRIMARY KEY,
        data jsonb NOT NULL
      );
    `);
  }

  async createRecord(id: string, data: any) {
    const query = `INSERT INTO items (id, data) VALUES ($1, $2)`;
    await this.pool.query(query, [id, data]);
  }
}
