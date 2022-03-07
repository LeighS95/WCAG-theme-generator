"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTetradicPalette = void 0;
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const generateMonoPalette_1 = require("./generateMonoPalette");
function generateTetradicPalette(color, options) {
    if (typeof color !== 'object') {
        color = (0, tinycolor2_1.default)(color).toHsl();
    }
    let color2 = (0, tinycolor2_1.default)(color).toHsl();
    let color3 = (0, tinycolor2_1.default)(color).toHsl();
    let color4 = (0, tinycolor2_1.default)(color).toHsl();
    color2.h = (color.h + 90) > 360 ? (color.h + 90) - 360 : color.h + 90;
    color3.h = (color2.h + 90) > 360 ? (color2.h + 90) - 360 : color2.h + 90;
    color4.h = (color3.h + 90) > 360 ? (color3.h + 90) - 360 : color3.h + 90;
    const palette = {
        color1: (0, generateMonoPalette_1.generateMonoPalette)(color, options),
        color2: (0, generateMonoPalette_1.generateMonoPalette)(color2, options),
        color3: (0, generateMonoPalette_1.generateMonoPalette)(color3, options),
        color4: (0, generateMonoPalette_1.generateMonoPalette)(color4, options)
    };
    return palette;
}
exports.generateTetradicPalette = generateTetradicPalette;
