"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_enhance_1 = require("./enhances/swagger.enhance");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, swagger_enhance_1.swaggerEnhance)(app);
    await app.listen(3000);
}
void bootstrap();
//# sourceMappingURL=main.js.map