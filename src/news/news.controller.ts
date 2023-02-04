import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { News } from './news.interface';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('all')
  async getNews(@Res() response): Promise<News[]> {
    return response.status(200).send(this.newsService.findAll());
  }

  @Post('create')
  async create(@Body() news: News, @Res() response: Response) {
    if (this.newsService.create(news) !== 0) {
      return response.status(200).send('Новость успешно создана');
    } else {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error:
            'При создании новости произошла непредвиденная ошибка. Попробуйте повторить операцию позже',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('edit')
  async edit(@Body() news: News, @Res() response: Response) {
    if (this.newsService.edit(news) !== 0) {
      return response
        .status(200)
        .send(
          `Новость с идентификатором id: ${news.id} успешно отредактирована`,
        );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Новость с идентификатором id: ${news.id} не найдена!`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
