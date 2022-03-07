"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSplitCompPalette = void 0;
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const generateMonoPalette_1 = require("./generateMonoPalette");
function generateSplitCompPalette(color, options) {
    if (typeof color !== 'object') {
        color = (0, tinycolor2_1.default)(color).toHsl();
    }
    const split = (color.h + 180) > 360 ? (color.h + 180) - 360 : color.h + 180;
    let color2 = (0, tinycolor2_1.default)(color).toHsl();
    let color3 = (0, tinycolor2_1.default)(color).toHsl();
    color2.h = split - 30;
    color3.h = split + 30;
    const palette = {
        color1: (0, generateMonoPalette_1.generateMonoPalette)(color, options),
        color2: (0, generateMonoPalette_1.generateMonoPalette)(color2, options),
        color3: (0, generateMonoPalette_1.generateMonoPalette)(color3, options)
    };
    return palette;
}
exports.generateSplitCompPalette = generateSplitCompPalette;
