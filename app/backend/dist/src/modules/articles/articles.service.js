"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ArticlesService_articles, _ArticlesService_tmpdir;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesService = void 0;
const throttle_1 = require("../../decorators/throttle.");
const request_1 = require("../../utils/request");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const fs = require("fs-extra");
const os = require("os");
const path = require("path");
let ArticlesService = class ArticlesService {
    constructor() {
        _ArticlesService_articles.set(this, []);
        _ArticlesService_tmpdir.set(this, '');
    }
    async onModuleInit() {
        __classPrivateFieldSet(this, _ArticlesService_tmpdir, await fs.mkdtemp(`${os.tmpdir()}/articles-`), "f");
        await this.fetchArticles();
    }
    async fetchArticles() {
        const files = await request_1.request
            .get('https://api.github.com/repos/Val-istar-Guo/article/contents');
        __classPrivateFieldSet(this, _ArticlesService_articles, files
            .filter((file) => file.type === 'dir' || file.type === 'file')
            .filter((file) => (!(file.type === 'dir' && file.name === 'assets') &&
            !(file.type === 'file' && !file.name.endsWith('.md'))))
            .map((file) => {
            if (file.type === 'file') {
                return {
                    title: file.name.replace(/.md$/, ''),
                };
            }
        }), "f");
    }
    async fetchContent(pathname) {
        const res = await request_1.request
            .get(`https://api.github.com/repos/Val-istar-Guo/articles/contents${pathname}`)
            .set('accept', 'application/vnd.github.raw')
            .option('resolveWithFullResponse');
        const filepath = path.join(__classPrivateFieldGet(this, _ArticlesService_tmpdir, "f"), pathname);
        const content = await res['buffer']();
        await fs.ensureFile(filepath);
        await fs.writeFile(filepath, content, { flag: 'w' });
    }
    async updateContent(pathname) {
        try {
            await this.fetchContent(pathname);
        }
        catch (e) {
            console.warn(e);
        }
    }
    findAll() {
        return __classPrivateFieldGet(this, _ArticlesService_articles, "f");
    }
    async findFile(pathname) {
        const filepath = path.join(__classPrivateFieldGet(this, _ArticlesService_tmpdir, "f"), pathname);
        if (await fs.pathExists(filepath)) {
            void this.updateContent(pathname);
        }
        else {
            await this.fetchContent(pathname);
        }
        return fs.createReadStream(filepath);
    }
    findOne(title) {
        const pathname = `${title}.md`;
        return this.findFile(pathname);
    }
};
_ArticlesService_articles = new WeakMap();
_ArticlesService_tmpdir = new WeakMap();
__decorate([
    (0, schedule_1.Cron)('0 */10 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticlesService.prototype, "fetchArticles", null);
__decorate([
    (0, throttle_1.Throttle)(5000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticlesService.prototype, "updateContent", null);
ArticlesService = __decorate([
    (0, common_1.Injectable)()
], ArticlesService);
exports.ArticlesService = ArticlesService;
//# sourceMappingURL=articles.service.js.map