import tinycolor from 'tinycolor2';
import { Color } from '../types';
import { contrastRatio } from './contrastRatio';
import { multiplyColor } from './multiplyColor';
import { relativeLuminance } from './relativeLuminance';

export function recommendedColor(
    target:number,
    background: Color,
    foreground?: Color
) {
    let cr = contrastRatio(background, foreground)

    let fore = tinycolor(foreground).toHexString();
    let back = tinycolor(background).toHexString();

    let fDiff = Math.abs(relativeLuminance(fore) - 0.5);
    let bDiff = Math.abs(relativeLuminance(back) - 0.5);

    console.log(cr)
    console.log(target)

    let multiplier = (1 + 1 / 400);
    let reccomended;
    let change;
    let newCol;

    if(cr < target) {
        if(relativeLuminance(back) < 0.5) {
            multiplier = (1 / multiplier);
        }

        let i = 0;

        while(cr < target) {
            newCol = multiplyColor(back, 1 / multiplier);

            i++;
            cr = tinycolor.readability(newCol, foreground);
        }

        reccomended = tinycolor(newCol).toHsl();
    }

    return reccomended

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