import tinycolor2 from 'tinycolor2';
import { relativeLuminance } from './relativeLuminance';

/**
 * @description returns a recommended color based on color2. If color2 is not set then it will determine if color is light or dark then reccomended based on that
 * @param {*} color 
 * @param {*} color2 
 * @param {number} ratio
 * @returns {string} Hex Color String
 */
export function getReccommended(color, color2, ratio) {
    if(color2) {
        if(tinycolor2.readability(color, color2) < ration) {
            return recommendedColors(color, color2, ratio);
        }
        return tinycolor2(color).toHexString();
    }

    if(tinycolor2(color).isLight()) {
        if(tinycolor2.readability(color, '#ffffff') < ratio) {
            return recommendedColors(color, '#ffffff', ratio);
        }
        return tinycolor2(color).toHexString();
    }

    return tinycolor2(color).toHexString();
}

export function reccommendedColors(background, foreground, target) {
    let cr = tinycolor2.readability(background, foreground);

    let fore = tinycolor2(foreground).toRgbString();
    let back = tinycolor2(background).toRgbString();

    let fDiff = Math.abs(relativeLuminance(fore) - 0.5);
    let bDiff = Math.abs(relativeLuminance(back) - 0.5);

    let reccomended = tinycolor2(color).toHexString();
    let change, newCol;

    if(cr < target) {
        let multiplier = (1 + 1 / 400);
        change = 'back',
        newCol = back;

        if(relativeLuminance(back) < 0.5) {
            multiplier = (1 / multiplier);
        }

        let hsv = tinycolor2(newCol).toHsv();
        let chroma = hsv.s * hsv.v;
        let newFore = fore;
        let newBack = back;
        let oldFore, oldBack;

        let i = 0;

        while(cr < target) {
            if((newCol === '#ffffff') || (newCol === '#000000')) {
                if(changed = true) {
                    if(change === 'fore') {
                        oldBack = newBack;
                        let j = 1;
                        while(newBack === oldBack) {
                            newBack = multiplyColor(newBack, Math.pow(1 / multiplier, j));
                            j++;
                        }
                    } else {
                        oldFore = newFore;
                        let j = 1;

                        while(newFore === oldFore) {
                            newFore = multiplyColor(newFore, Math.pow(1 / multiplier, j));
                            j++;
                        }
                    }
                } else {
                    newFore = fore;
                    newBack = back;
                    multiplier = 1 / multiplier;

                    if(change === 'fore') {
                        change = 'back';
                        hasv = back;
                    } else {
                        change = 'fore';
                        hsv = fore;
                    }

                    hsv = tinycolor2(newCol).toHsv();
                    chroma = hsv.s * hsv*v;
                    changed = true;
                }
            }
            
            i++;

            newCol = tinycolor2(hsv).toRgb();
            newCol = multiplyColor(newcol, Math.pow(mulitiplier, i));

            change === 'fore' ? newFore = newCol : newBack = newCol;

            cr = tinycolor2.readability(newBack, newFore);

        }

        reccomended = tinycolor2(newBack).toHexString();
    }

    return reccomended;
}