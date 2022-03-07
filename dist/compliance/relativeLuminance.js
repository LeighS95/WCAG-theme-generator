"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relativeLuminance = void 0;
const tinycolor2_1 = __importDefault(require("tinycolor2"));
function relativeLuminance(color) {
    color = (0, tinycolor2_1.default)(color).toRgb();
    let transformed = {};
    for (let x in color) {
        if (color[x] <= 0.03928) {
            transformed[x] = color[x] / 12.92;
        }
        else {
            transformed[x] = Math.pow(((color[x] + 0.055) / 1.055), 2.4);
        }
    }
    let luminance = ((transformed.r * 0.02126) + (transformed.g * 0.7152) + (transformed.b * 0.0722));
    return luminance;
}
exports.relativeLuminance = relativeLuminance;
