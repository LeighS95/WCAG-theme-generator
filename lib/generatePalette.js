const tinycolor = require('tinycolor2');

/**
 * @description Generates a spectrum based on inout color
 * @param color 
 * @param {number} paletteLength  how long palette should be
 * @param {string} level AA or AAA
 * @returns {array} of { h, s, l }
 */
function generateMonoPalette(color, paletteLength = 9, level = 'AA') {
    const hsl = tinycolor(color).toHsl();
    const { h, s , l } = hsl;

    const base = Math.round(l * 100) / 100;
    let increment = Math.round(100 / paletteLength) / 100;

    if(level === 'AAA') increment *= 2;

    let arr = [];
    let k = base;

    while(arr.length < paletteLength) {
        for(let j = base; j < paletteLength / 10; j += increment) {
            if(j + increment >= 1 && tinycolor(color).toHexString() !== '#ffffff') {
                arr.push({ h, s, l: 1 });
            }
    
            if(j + increment <= 0 && tinycolor(color).toHexString() !== '#000000') {
                arr.push({ h, s, l: 1 });
            }
            // while(k - increment > 0.99) {
            //     arr.push({ h, s, l: k - increment });
            //     k -= increment;
            // }
    
            // if(j >= paletteLength / 10 - increment) {
            //     arr.push({ h, s, l: Math.round((j * 100) / 100) / 2 });
            // }

            arr.push({ h, s, l: Math.round(j * 100) / 100 });
        }
    
        for(let i = base; i > 0; i -= increment) {
            if(i + increment >= 1 && tinycolor(color).toHexString() !== '#ffffff') {
                arr.push({ h, s, l: 1 });
            }
    
            if(i + increment <= 0 && tinycolor(color).toHexString() !== '#000000') {
                arr.push({ h, s, l: 1 });
            }
            arr.push({ h, s, l: Math.round(i * 100) / 100 });
        }
    }

    arr.sort((a, b) => {
        return a.l - b.l;
    });

    var filtered = arr.reduce((unique, o) => {
        if(!unique.some(obj => obj.l >= 1 || obj.l === o.l)) {
          unique.push(o);
        }
        return unique;
    },[]);

    return filtered;
}

function roundColorValues(color) {
    let newColor = {};
    
    Object.keys(color).forEach(function(key) {
        const k = color[key];
        let v = k;
        if(k > 1) v = (k - 1);
        newColor[key] = v.toFixed(2);
    });

    return newColor;
}

function generateComPalette(color) {
    const hsl = tinycolor(color).toHsl();

    let color1 = {h: (hsl.h += 0.5), s: (hsl.s += 0.5), l: (hsl.l +=0.5)};

    color1 = roundColorValues(color1);

    const palette = [color1];

    return palette;
}

function generateTriadicPalette(color) {
    const hsl = tinycolor(color).toHsl();

    let color1 = {h: (hsl.h += 0.33), s: (hsl.s += 0.33), l: (hsl.l +=0.33)};
    let color2 = {h: (hsl.h += 0.66), s: (hsl.s += 0.66), l: (hsl.l +=0.66)};

    color1 = roundColorValues(color1);
    color2 = roundColorValues(color2);

    const palette = [color1, color2];

    return palette;
}

function generateSquarePalette(color) {
    const hsl = tinycolor(color).toHsl();

    let color1 = {h: (hsl.h += 0.25), s: (hsl.s += 0.25), l: (hsl.l +=0.25)};
    let color2 = {h: (hsl.h += 0.5), s: (hsl.s += 0.5), l: (hsl.l +=0.5)};
    let color3 = {h: (hsl.h += 0.75), s: (hsl.s += 0.75), l: (hsl.l +=0.75)};

    color1 = roundColorValues(color1);
    color2 = roundColorValues(color2);
    color3 = roundColorValues(color3);

    const palette = [color1, color2, color3];

    return palette;
}

function generateAllPalettes(color) {
    const hsl = tinycolor(color).toHsl();

    let base = {h: hsl.h, s: hsl.s, l: hsl.l};

    let baseColorPalettes = {
        monoChrome: {...generateMonoPalette(base)},
        complimentary: {...generateComPalette(base)},
        triadic: {...generateTriadicPalette(base)},
        square: {...generateSquarePalette(base)},
    };

    console.log("baseColorPalettes ", baseColorPalettes);

}

module.exports = {
    generateMonoPalette,
    generateComPalette,
    generateTriadicPalette,
    generateSquarePalette,
    generateAllPalettes,
}