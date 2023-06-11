import { request as globalRequest, mount } from 'keq'

export const request = globalRequest.create()

request
  .use(
    mount.host('api.github.com'),
    async (ctx, next) => {
      ctx.request.headers.set('Authorization', 'Bearer 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')

      await next()

      if (ctx.response) {
        if (!ctx.response.ok) {
          const body = await ctx.response.json()
          throw new Error(body.message)
        }
      }
    })
  // .use(debug())
