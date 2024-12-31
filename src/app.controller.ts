import { Body, Controller, Get, Post } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { v4 as uuid } from 'uuid';

@Controller()
export class AppController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  getRoot(@Body() body: { name: string }) {
    return {
      createdDate: new Date().toISOString(),
      description: '',
      name: body.name || "Lucinda's Jelly Bean Bonanza",
      id: uuid(),
      questions: [
        {
          id: uuid(),
          question: 'What in the world has the blue colour?',
          referenceResponse: 'Blueberries.',
        },
        {
          id: uuid(),
          question: 'What in the world has the red colour?',
          referenceResponse: 'Cherries.',
        },
      ],
      stats: {
        runsInMonth: 120,
        totalRuns: 500,
      },
      testRuns: [],
    };
  }

  @Get('list')
  getList() {
    return {
      cursor: uuid(),
      items: [
        {
          createdDate: '2024-12-28T22:07:24.078Z',
          description: '',
          name: "Lucinda's Jelly Bean Bonanza",
          id: uuid(),
          questions: [
            {
              id: uuid(),
              question: 'What in the world has the blue colour?',
              referenceResponse: 'Blueberries.',
            },
            {
              id: uuid(),
              question: 'What in the world has the red colour?',
              referenceResponse: 'Cherries.',
            },
          ],
          stats: { runsInMonth: 120, totalRuns: 500 },
          testRuns: [],
        },
      ],
    };
  }

  @Post()
  async createRecord(@Body() body: { name: string }) {
    const newId = uuid();
    const newData = {
      createdDate: new Date().toISOString(),
      description: '',
      name: body.name,
      id: newId,
      questions: [],
      stats: { runsInMonth: 0, totalRuns: 0 },
      testRuns: [],
    };
    await this.db.createRecord(newId, newData);
    return newData;
  }
}
