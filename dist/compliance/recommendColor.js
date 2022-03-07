"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendedColor = void 0;
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const contrastRatio_1 = require("./contrastRatio");
const multiplyColor_1 = require("./multiplyColor");
const relativeLuminance_1 = require("./relativeLuminance");
function recommendedColor(target, background, foreground) {
    let cr = (0, contrastRatio_1.contrastRatio)(background, foreground);
    let fore = (0, tinycolor2_1.default)(foreground).toHexString();
    let back = (0, tinycolor2_1.default)(background).toHexString();
    let fDiff = Math.abs((0, relativeLuminance_1.relativeLuminance)(fore) - 0.5);
    let bDiff = Math.abs((0, relativeLuminance_1.relativeLuminance)(back) - 0.5);
    console.log(cr);
    console.log(target);
    let multiplier = (1 + 1 / 400);
    let reccomended;
    let change;
    let newCol;
    if (cr < target) {
        if ((0, relativeLuminance_1.relativeLuminance)(back) < 0.5) {
            multiplier = (1 / multiplier);
        }
        let i = 0;
        while (cr < target) {
            newCol = (0, multiplyColor_1.multiplyColor)(back, 1 / multiplier);
            i++;
            cr = tinycolor2_1.default.readability(newCol, foreground);
        }
        reccomended = (0, tinycolor2_1.default)(newCol).toHsl();
    }
    return reccomended;
    // if(cr < target) {
    //     console.log('lonef')
    //     let multiplier = (1 + 1 / 400);
    //     change = 'back',
    //     newCol = back;
    //     if(relativeLuminance(back) < 0.5) {
    //         multiplier = (1 / multiplier);
    //     }
    //     let hsv:any = tinycolor(newCol).toHsv();
    //     let chroma = hsv.s * hsv.v;
    //     let newFore = fore;
    //     let newBack = back;
    //     let oldFore, oldBack;
    //     let changed = false;
    //     let i = 0;
    //     while(cr < target) {
    //         if((newCol === '#ffffff') || (newCol === '#000000')) {
    //             if(changed = true) {
    //                 if(change === 'fore') {
    //                     oldBack = newBack;
    //                     let j = 1;
    //                     while(newBack === oldBack) {
    //                         newBack = multiplyColor(newBack, Math.pow(1 / multiplier, j));
    //                         j++;
    //                     }
    //                 } else {
    //                     oldFore = newFore;
    //                     let j = 1;
    //                     while(newFore === oldFore) {
    //                         newFore = multiplyColor(newFore, Math.pow(1 / multiplier, j));
    //                         j++;
    //                     }
    //                 }
    //             } else {
    //                 newFore = fore;
    //                 newBack = back;
    //                 multiplier = 1 / multiplier;
    //                 if(change === 'fore') {
    //                     change = 'back';
    //                     hsv = back;
    //                 } else {
    //                     change = 'fore';
    //                     hsv = fore;
    //                 }
    //                 hsv = tinycolor(newCol).toHsv();
    //                 chroma = hsv.s * hsv.v;
    //                 changed = true;
    //             }
    //         }
    //         i++;
    //         newCol = tinycolor(hsv).toRgb();
    //         newCol = multiplyColor(newCol, Math.pow(multiplier, i));
    //         change === 'fore' ? newFore = newCol : newBack = newCol;
    //         cr = tinycolor.readability(newBack, newFore);
    //     }
    //     reccomended = tinycolor(newBack).toHexString();
    // }
    return reccomended;
}
exports.recommendedColor = recommendedColor;
