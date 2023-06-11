"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Throttle = void 0;
const throttle_debounce_1 = require("throttle-debounce");
function Throttle(wait) {
    return function (target, key, descriptor) {
        return {
            configurable: true,
            enumerable: descriptor.enumerable,
            get: function () {
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor.enumerable,
                    value: (0, throttle_debounce_1.throttle)(wait, descriptor.value),
                });
                return this[key];
            },
        };
    };
}
exports.Throttle = Throttle;
//# sourceMappingURL=throttle..js.map