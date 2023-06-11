"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerEnhance = void 0;
const packageJson = require("../../package.json");
const swagger_1 = require("@nestjs/swagger");
function swaggerEnhance(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle(packageJson.name)
        .setDescription(packageJson.description)
        .setVersion(packageJson.version)
        .addTag('articles')
        .build();
    const options = {
        operationIdFactory: (controllerKey, methodKey) => methodKey,
    };
    const document = swagger_1.SwaggerModule.createDocument(app, config, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    const httpAdapter = app.getHttpAdapter();
    httpAdapter.get('/swagger', (_req, res) => {
        res.json(document);
    });
}
exports.swaggerEnhance = swaggerEnhance;
//# sourceMappingURL=swagger.enhance.js.map