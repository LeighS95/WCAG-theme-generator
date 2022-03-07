"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contrastRatio = void 0;
const relativeLuminance_1 = require("./relativeLuminance");
/**
 * @description Get contrast ratio between 2 colors
 * @param {color} color1
 * @param {color} color2
 * @returns {number} contrast ratio as a number
 */
function contrastRatio(color1, color2) {
    let ratio = (0.05 + (0, relativeLuminance_1.relativeLuminance)(color1)) / (0.05 + (0, relativeLuminance_1.relativeLuminance)(color2));
    if (ratio < 1)
        ratio = 1 / ratio;
    return ratio;
}
exports.contrastRatio = contrastRatio;
