"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAllPalettes = void 0;
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const generateMonoPalette_1 = require("./generateMonoPalette");
const generateCompPalette_1 = require("./generateCompPalette");
const generateSplitCompPalette_1 = require("./generateSplitCompPalette");
const generateTriadicPalette_1 = require("./generateTriadicPalette");
const generateTetradicPalette_1 = require("./generateTetradicPalette");
const generateAnalogousPalette_1 = require("./generateAnalogousPalette");
function generateAllPalettes(color, options) {
    const hsl = (0, tinycolor2_1.default)(color).toHsl();
    let baseColorPalettes = {
        monoChrome: Object.assign({}, (0, generateMonoPalette_1.generateMonoPalette)(hsl, options)),
        complimentary: Object.assign({}, (0, generateCompPalette_1.generateCompPalette)(hsl, options)),
        splitComplimentary: Object.assign({}, (0, generateSplitCompPalette_1.generateSplitCompPalette)(hsl, options)),
        triadic: Object.assign({}, (0, generateTriadicPalette_1.generateTriadicPalette)(hsl, options)),
        tetradic: Object.assign({}, (0, generateTetradicPalette_1.generateTetradicPalette)(hsl, options)),
        analogous: Object.assign({}, (0, generateAnalogousPalette_1.generateAnalogousPalette)(hsl, options)),
    };
    return baseColorPalettes;
}
exports.generateAllPalettes = generateAllPalettes;
