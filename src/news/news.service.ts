import { Injectable } from '@nestjs/common';
import { News } from './news.interface';

@Injectable()
export class NewsService {
  private readonly news: News[] = [];

  create(news: News): number {
    return this.news.push({
      id: this.news.length + 1,
      title: news.title,
      description: news.description,
      author: news.author,
      createdAt: new Date(),
    });
  }

  findAll(): News[] {
    return this.news;
  }

  findByIndex(index: number): News | null {
    console.assert(
      typeof this.news[index] !== 'undefined',
      '[findByIndex] Invalid',
    );

    if (typeof this.news[index] !== 'undefined') {
      return this.news[index];
    }
    return null;
  }

  edit(news: News): number {
    for (const i in this.news) {
      if (this.news[i].id === +news.id) {
        this.news[i].title = news.title;
        this.news[i].description = news.description;
        this.news[i].author = news.author;
        return 1;
      }
    }
    return 0;
  }
}
