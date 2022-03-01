const tinycolor = require('tinycolor2');
const relativeLuminance = require('./relativeLuminance');
const multiplyColor = require('./colourFunctions');

/**
 * @description returns a recommended color based on color2. If color2 is not set then it will determine if color is light or dark then reccomended based on that
 * @param {*} color 
 * @param {*} color2 
 * @param {number} ratio
 * @returns {string} Hex Color String
 */
function getReccommended(color, ratio, color2) {
    if(color2) {
        if(tinycolor.readability(color, color2) < ratio) {
            return recommendedColors(color, color2, ratio);
        }
        return tinycolor(color).toHexString();
    }

    if(tinycolor(color).isLight()) {
        if(tinycolor.readability(color, '#ffffff') < ratio) {
            return recommendedColors(color, '#ffffff', ratio);
        }
        return tinycolor(color).toHexString();
    }

    return tinycolor(color).toHexString();
}

function recommendedColors(background, foreground, target) {
    let cr = tinycolor.readability(background, foreground);

    let fore = tinycolor(foreground).toRgbString();
    let back = tinycolor(background).toRgbString();

    let fDiff = Math.abs(relativeLuminance(fore) - 0.5);
    let bDiff = Math.abs(relativeLuminance(back) - 0.5);

    let reccomended;
    let change, newCol;

    if(cr < target) {
        let multiplier = (1 + 1 / 400);
        change = 'back',
        newCol = back;

        if(relativeLuminance(back) < 0.5) {
            multiplier = (1 / multiplier);
        }

        let hsv = tinycolor(newCol).toHsv();
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

                    hsv = tinycolor(newCol).toHsv();
                    chroma = hsv.s * hsv*v;
                    changed = true;
                }
            }
            
            i++;

            newCol = tinycolor(hsv).toRgb();
            newCol = multiplyColor(newCol, Math.pow(multiplier, i));

            change === 'fore' ? newFore = newCol : newBack = newCol;

            cr = tinycolor.readability(newBack, newFore);

        }

        reccomended = tinycolor(newBack).toHexString();
    }

    return reccomended;
}

module.exports = getReccommended;