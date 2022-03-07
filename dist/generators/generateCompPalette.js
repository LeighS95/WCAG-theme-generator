"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCompPalette = void 0;
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const generateMonoPalette_1 = require("./generateMonoPalette");
function generateCompPalette(color, options) {
    if (typeof color !== 'object') {
        color = (0, tinycolor2_1.default)(color).toHsl();
    }
    let color2 = (0, tinycolor2_1.default)(color).toHsl();
    color2.h = (color.h + 180) > 360 ? (color.h + 180) - 360 : color.h + 180;
    const palette = {
        color1: (0, generateMonoPalette_1.generateMonoPalette)(color, options),
        color2: (0, generateMonoPalette_1.generateMonoPalette)(color2, options)
    };
    return palette;
}
exports.generateCompPalette = generateCompPalette;
