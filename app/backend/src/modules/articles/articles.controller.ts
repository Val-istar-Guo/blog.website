import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common'
import { Response } from 'express'
import * as mime from 'mime-types'
import * as path from 'path'
import { ArticlesService } from './articles.service'
import { ArticleDto } from './dto/article.dto'

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  fetchArticles(): ArticleDto[] {
    return this.articlesService.findAll()
  }

  @Get(':title')
  async fetchArticle(
    @Param('title') title: string
  ): Promise<StreamableFile> {
    const stream = await this.articlesService.findOne(title)
    return new StreamableFile(stream)
  }

  @Get('files/**')
  async fetchAsset(
    @Res({ passthrough: true }) res: Response,
    @Param('0') filepath: string
  ): Promise<StreamableFile> {
    const ext = path.extname(filepath)
    if (ext) {
      const type = mime.lookup(ext)
      if (type) res.set('Content-Type', type)
    }

    const stream = await this.articlesService.findFile(filepath)
    return new StreamableFile(stream)
  }
}
