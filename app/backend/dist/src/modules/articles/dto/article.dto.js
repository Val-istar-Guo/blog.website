"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleDto = void 0;
const openapi = require("@nestjs/swagger");
class ArticleDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, description: { required: false, type: () => String }, author: { required: false, type: () => String } };
    }
}
exports.ArticleDto = ArticleDto;
//# sourceMappingURL=article.dto.js.map