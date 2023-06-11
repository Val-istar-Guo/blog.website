import { throttle } from 'throttle-debounce'

export function Throttle(wait: number): MethodDecorator {
  return function (target, key, descriptor) {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function () {
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: throttle(wait, descriptor.value as any),
        })

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this[key]
      },
    }
  }
}
