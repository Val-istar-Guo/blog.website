import * as packageJson from '@@/package.json'
import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger'

export function swaggerEnhance(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .addTag('articles')
    .build()

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey,
  }

  const document = SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup('api', app, document)
  const httpAdapter = app.getHttpAdapter()
  httpAdapter.get('/swagger', (_req, res) => {
    res.json(document)
  })
}
