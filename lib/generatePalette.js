const tinycolor = require('tinycolor2');

/**
 * @description Generates a spectrum based on inout color
 * @param color 
 * @param {number} paletteLength  how long palette should be
 * @param {string} level AA or AAA
 * @returns {array} of { h, s, l }
 */
function generatePalette(color, paletteLength = 9, level = 'AA') {
    const hsl = tinycolor(color).toHsl();
    const { h, s , l } = hsl;

    const base = Math.round(l * 100) / 100;
    let increment = Math.round(100 / paletteLength) / 100;

    if(level === 'AAA') increment *= 2;

    let arr = [];
    let k = base;

    while(arr.length < paletteLength) {
        for(let j = base; j < paletteLength / 10; j += increment) {
            console.log(j)
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

module.exports = generatePalette