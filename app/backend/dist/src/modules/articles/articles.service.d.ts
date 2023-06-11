/// <reference types="node" />
import { OnModuleInit } from '@nestjs/common';
import * as fs from 'fs-extra';
import { ArticleDto } from './dto/article.dto';
export declare class ArticlesService implements OnModuleInit {
    #private;
    onModuleInit(): Promise<void>;
    private fetchArticles;
    private fetchContent;
    private updateContent;
    findAll(): ArticleDto[];
    findFile(pathname: string): Promise<fs.ReadStream>;
    findOne(title: string): Promise<fs.ReadStream>;
}
