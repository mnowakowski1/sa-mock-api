import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import * as process from 'process';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
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
