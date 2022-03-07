"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adjustColor = void 0;
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const recommendColor_1 = require("./recommendColor");
function adjustColor(target, background, foreground) {
    let newColor;
    if (!foreground) {
        (0, tinycolor2_1.default)(background).isLight()
            ? foreground = (0, tinycolor2_1.default)('black').toHsl()
            : foreground = (0, tinycolor2_1.default)('white').toHsl();
    }
    (0, recommendColor_1.recommendedColor)(target, background, foreground);
    return newColor;
}
exports.adjustColor = adjustColor;
