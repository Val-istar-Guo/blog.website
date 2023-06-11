"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const keq_1 = require("keq");
exports.request = keq_1.request.create();
exports.request
    .use(keq_1.mount.host('api.github.com'), async (ctx, next) => {
    ctx.request.headers.set('Authorization', 'Bearer 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');
    await next();
    if (ctx.response) {
        if (!ctx.response.ok) {
            const body = await ctx.response.json();
            throw new Error(body.message);
        }
    }
});
//# sourceMappingURL=request.js.map