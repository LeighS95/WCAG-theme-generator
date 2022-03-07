"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiplyColor = void 0;
const tinycolor2_1 = __importDefault(require("tinycolor2"));
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
