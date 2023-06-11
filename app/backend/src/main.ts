import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { swaggerEnhance } from './enhances/swagger.enhance'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  swaggerEnhance(app)

  await app.listen(3000)
}

void bootstrap()
