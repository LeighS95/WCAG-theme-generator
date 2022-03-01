import tinycolor from 'tinycolor2';

/**
 * @description Conver color to RGB format
 * @param {any} color 
 * @returns {object} rgb color object
 */
function colorToRGB(color) {
    color = color.toLowerCase();

    if(color.substring(0, 3) === 'rgb') {
        let matches = /^rgba?\s*\((\d+),\s*(\d+),\s*(\d+)([^)]*)\)$/.exec(color);

        return color = {
            r: (matches[1] / 255),
            g: (matches[2] / 255),
            b: (matches[3] / 255)
        }
    }

    if(color.charAt(0) === '#') {
        color = color.substr(1);
    }

    if(color.length === 3) {
        color.replace(/^(.)(.)(.)$/, '$1$1$2$2$3$3');
    }

    return color = {
        r: (parseInt(color.substr(0, 2), 16) / 255),
        g: (parseInt(color.substr(2, 2), 16) / 255),
        b: (parseInt(color.substr(3, 3), 16) / 255)
    }
}

/**
 * @description brightens a color by set value
 * @param {color} color 
 * @param {number|string} lightenBy Amount to brighten input color by
 * @returns {string}
 */
function brighten(color, lightenBy) {
    return tinycolor(color).brighten(lightenBy).toString();
}

/**
 * @description Ruturn if light or dark text color should be used
 * @param {color} color
 * @param {string} level provide WCAG level AA or AAA
 * @returns {string} 'use dark' or 'use light'
 */
function checkReadable(color, level = 'AA') {
    const ratio = level === 'AAA' ? 7.0 : 4.5;

    if(tinycolor.readability(color, '#000000') > ratio) {
        return 'Use Dark Font'
    }

    return 'Use Light Font'
}

function multiplyColor$1(color, multiplier) {
    let hsvColor = tinycolor(color).toHsv();
    let chroma = hsvColor.s * hsvColor.v;

    if(hsvColor.v === 0) hsvColor.v = (1 / 255);

    hsvColor.v = hsvColor * multiplier;

    hsvColor.v === 0 ? hsvColor.s = 0 : hsvColor.s = chroma / hsvColor.v;

    hsvColor.v = Math.min(1, hsvColor.v);
    hsvColor.s = Math.min(1, hsvColor.s);

    return tinycolor(hsvColor).toHexString();
}

function relativeLuminance(color) {
    color = tinycolor(color).toRgb();

    let transformed = {};

    for(let x in color) {
        if(color[x] <= 0.03928) {
            transformed[x] = color[x] / 12.92;
        } else {
            transformed[x] = Math.pow(((color[x] + 0.055) / 1.055), 2.4);
        }
    }

    let luminance = ((transformed.r * 0.02126) + (transformed.g * 0.7152) + (transformed.b * 0.0722));

    return luminance;
}

/**
 * @description Get contrast ratio between 2 colors
 * @param {color} color1 
 * @param {color} color2 
 * @returns {number} contrast ratio as a number
 */
function contrastRatio(color1, color2) {
    let ratio = (0.05 + relativeLuminance(color1)) / (0.05 + relativeLuminance(color2));

    if(ratio < 1) ratio = 1 / ratio;

    return ratio;
}

/**
 * @description returns a recommended color based on color2. If color2 is not set then it will determine if color is light or dark then reccomended based on that
 * @param {*} color 
 * @param {*} color2 
 * @param {number} ratio
 * @returns {string} Hex Color String
 */
function getReccommended(color, color2, ratio) {
    if(color2) {
        if(tinycolor.readability(color, color2) < ration) {
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

function reccommendedColors(background, foreground, target) {
    let cr = tinycolor.readability(background, foreground);

    let fore = tinycolor(foreground).toRgbString();
    let back = tinycolor(background).toRgbString();

    Math.abs(relativeLuminance(fore) - 0.5);
    Math.abs(relativeLuminance(back) - 0.5);

    let reccomended = tinycolor(color).toHexString();
    let change, newCol;

    if(cr < target) {
        let multiplier = (1 + 1 / 400);
        change = 'back',
        newCol = back;

        if(relativeLuminance(back) < 0.5) {
            multiplier = (1 / multiplier);
        }

        let hsv = tinycolor(newCol).toHsv();
        hsv.s * hsv.v;
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
                    hsv.s * hsv*v;
                    changed = true;
                }
            }
            
            i++;

            newCol = tinycolor(hsv).toRgb();
            newCol = multiplyColor(newcol, Math.pow(mulitiplier, i));

            change === 'fore' ? newFore = newCol : newBack = newCol;

            cr = tinycolor.readability(newBack, newFore);

        }

        reccomended = tinycolor(newBack).toHexString();
    }

    return reccomended;
}

/**
 * @description Generates color with AA or AAA contrast ratio
 * @param {any} color 
 * @param {string} level AA or AAA
 * @returns {string} color as string
 */
function generateColor(color, level = 'AA') {
    if(level === undefined) return tinycolor(color).toHexString();

    const ratio = level === 'AAA' ? 7.0 : 4.5;

    return getReccommended(color, ratio);
}

/**
 * @description Generates a spectrum based on inout color
 * @param color 
 * @param {number} paletteLength  how long palette should be
 * @param {string} level AA or AAA
 * @returns {array} of { h, s, l }
 */
function generatePalette(color, paletteLength = 9, level = 'AA') {
    const hsl = tinycolor(color).toHsl();
    const { h, s , l} = hsl;

    const base = Math.round(l * 100) / 100;
    let increment = Math.round(100 / paletteLength) / 100;

    if(level === 'AAA') increment *= 2;

    let arr = [];
    let k = base;

    for(let j = base; j < paletteLength / 10; j += increment) {
        while(k - increment > 0.99) {
            arr.push({ h, s, l: k - increment });
            k -= increment;
        }

        if(j >= paletteLength / 10 - increment) {
            arr.push({ h, s, l: Math.round((j * 100) / 100) / 2 });
        }

        arr.push({ h, s, l: Math.round(j * 100) / 100 });
    }

    arr.sort((a, b) => {
        return a.l - b.l;
    });

    return arr;
}

/**
 * @param {string} hex
 * @returns {object} color as rgb
 */
function hexToRGB(hex) {
    let r, g, b = 0;

    if(hex.length === 4) {
        r = '0x' + hex[1] + hex[1];
        g = '0x' + hex[2] + hex[2];
        b = '0x' + hex[3] + hex[3];
    } else if(hex.length === 7) {
        r = '0x' + hex[1] + hex[2];
        g = '0x' + hex[3] + hex[4];
        b = '0x' + hex[5] + hex[6];
    } else { 
        throw new Error('Invalid hex value given');
    }

    return { r, g, b };
}

var index = {
    colorToRGB,
    brighten,
    checkReadable,
    multiplyColor: multiplyColor$1,
    contrastRatio,
    generateColor,
    generatePalette,
    hexToRGB,
    getReccommended,
    reccommendedColors,
    relativeLuminance
};

export { index as default };
