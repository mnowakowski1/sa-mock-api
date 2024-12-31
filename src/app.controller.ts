import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DatabaseService } from './database.service';
import { v4 as uuid } from 'uuid';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomizedData = [...Array(10)].map(() => ({
  createdDate: new Date(
    getRandomInt(2020, 2030),
    getRandomInt(0, 11),
    getRandomInt(1, 28),
  ).toISOString(),
  description:
    Math.random() < 0.5 ? '' : `Random description ${getRandomInt(1, 1000)}`,
  name: `Random Bean Bonanza ${getRandomInt(1, 1000)}`,
  id: uuid(),
  questions: [
    {
      id: uuid(),
      question: `Random blue question ${getRandomInt(1, 1000)}`,
      referenceResponse: `Random response A${getRandomInt(1, 1000)}`,
    },
    {
      id: uuid(),
      question: `Random red question ${getRandomInt(1, 1000)}`,
      referenceResponse: `Random response B${getRandomInt(1, 1000)}`,
    },
  ],
  stats: {
    runsInMonth: getRandomInt(1, 500),
    totalRuns: getRandomInt(501, 5000),
  },
  testRuns: [],
}));

@Controller()
export class AppController {
  constructor(private readonly db: DatabaseService) {}
  @Get('/tests/:id')
  getRoot(@Param('id') id: string, @Body() body: { name: string }) {
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

  @Get('/tests')
  getList() {
    return {
      cursor: uuid(),
      items: randomizedData,
    };
  }

  @Post('/tests')
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

  @Patch('/tests/:id')
  @HttpCode(200)
  updateRoot(
    @Param('id') id: string,
    @Body()
    body: {
      name?: string;
      description?: string;
      questions?: Array<{
        id: string;
        question: string;
        referenceResponse?: string;
      }>;
    },
  ) {
    return;
  }
}
