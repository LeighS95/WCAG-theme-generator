"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiplyColor = exports.checkReadable = exports.brighten = void 0;
const tinycolor2_1 = __importDefault(require("tinycolor2"));
/**
 * @description brightens a color by set value
 * @param {color} color
 * @param {number|string} lightenBy Amount to brighten input color by
 * @returns {string}
 */
function brighten(color, lightenBy) {
    return (0, tinycolor2_1.default)(color).brighten(lightenBy).toString();
}
exports.brighten = brighten;
/**
 * @description Ruturn if light or dark text color should be used
 * @param {color} color
 * @param {string} level provide WCAG level AA or AAA
 * @returns {string} 'use dark' or 'use light'
 */
function checkReadable(color, level = 'AA') {
    const ratio = level === 'AAA' ? 7.0 : 4.5;
    if (tinycolor2_1.default.readability(color, '#000000') > ratio) {
        return 'Use Dark Font';
    }
    return 'Use Light Font';
}
exports.checkReadable = checkReadable;
function multiplyColor(color, multiplier) {
    let hsvColor = (0, tinycolor2_1.default)(color).toHsv();
    let chroma = hsvColor.s * hsvColor.v;
    if (hsvColor.v === 0)
        hsvColor.v = (1 / 255);
    hsvColor.v = hsvColor * multiplier;
    hsvColor.v === 0 ? hsvColor.s = 0 : hsvColor.s = chroma / hsvColor.v;
    hsvColor.v = Math.min(1, hsvColor.v);
    hsvColor.s = Math.min(1, hsvColor.s);
    return (0, tinycolor2_1.default)(hsvColor).toHexString();
}
exports.multiplyColor = multiplyColor;
