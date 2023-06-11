import { StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { ArticlesService } from './articles.service';
import { ArticleDto } from './dto/article.dto';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    fetchArticles(): ArticleDto[];
    fetchArticle(title: string): Promise<StreamableFile>;
    fetchAsset(res: Response, filepath: string): Promise<StreamableFile>;
}
