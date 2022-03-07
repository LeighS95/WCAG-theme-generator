"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAnalogousPalette = void 0;
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const generateMonoPalette_1 = require("./generateMonoPalette");
function generateAnalogousPalette(color, options) {
    if (typeof color !== 'object') {
        color = (0, tinycolor2_1.default)(color).toHsl();
    }
    let color2 = (0, tinycolor2_1.default)(color).toHsl();
    let color3 = (0, tinycolor2_1.default)(color).toHsl();
    color2.h = (color.h + 30) > 360 ? (color.h + 30) - 360 : color.h + 30;
    color3.h = (color.h - 30) < 0 ? 360 + (color.h - 30) : color.h - 30;
    const palette = {
        color1: (0, generateMonoPalette_1.generateMonoPalette)(color, options),
        color2: (0, generateMonoPalette_1.generateMonoPalette)(color2, options),
        color3: (0, generateMonoPalette_1.generateMonoPalette)(color3, options)
    };
    return palette;
}
exports.generateAnalogousPalette = generateAnalogousPalette;
