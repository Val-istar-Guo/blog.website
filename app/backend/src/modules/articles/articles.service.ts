import { Throttle } from '@/decorators/throttle.'
import { request } from '@/utils/request'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import * as fs from 'fs-extra'
import * as os from 'os'
import * as path from 'path'
import { ArticleDto } from './dto/article.dto'

@Injectable()
export class ArticlesService implements OnModuleInit {
  #articles: ArticleDto[] = []
  #tmpdir = ''

  async onModuleInit() {
    this.#tmpdir = await fs.mkdtemp(`${os.tmpdir()}/articles-`)
    await this.fetchArticles()
  }

  @Cron('0 */10 * * * *')
  private async fetchArticles() {
    const files = await request
      .get('https://api.github.com/repos/Val-istar-Guo/article/contents')

    this.#articles = files
      .filter((file) => file.type === 'dir' || file.type === 'file')
      .filter((file) => (
        // 文件夹名不是 assets
        !(file.type === 'dir' && file.name === 'assets') &&
        // 文件名必须以 .md 结尾
        !(file.type === 'file' && !file.name.endsWith('.md'))
      ))
      .map((file): ArticleDto => {
        if (file.type === 'file') {
          return {
            title: file.name.replace(/.md$/, ''),
          }
        }
      })
  }

  private async fetchContent(pathname: string): Promise<void> {
    const res = await request
      .get(`https://api.github.com/repos/Val-istar-Guo/articles/contents${pathname}`)
      .set('accept', 'application/vnd.github.raw')
      .option('resolveWithFullResponse')


    const filepath = path.join(this.#tmpdir, pathname)
    const content = await res['buffer']() as Buffer

    await fs.ensureFile(filepath)
    await fs.writeFile(filepath, content, { flag: 'w' })
  }

  @Throttle(5000)
  private async updateContent(pathname: string) {
    try {
      await this.fetchContent(pathname)
    } catch (e) {
      console.warn(e)
    }
  }

  findAll(): ArticleDto[] {
    return this.#articles
  }

  async findFile(pathname: string): Promise<fs.ReadStream> {
    const filepath = path.join(this.#tmpdir, pathname)
    if (await fs.pathExists(filepath)) {
      void this.updateContent(pathname)
    } else {
      await this.fetchContent(pathname)
    }

    return fs.createReadStream(filepath)
  }

  findOne(title: string): Promise<fs.ReadStream> {
    const pathname = `${title}.md`
    return this.findFile(pathname)
  }
}
