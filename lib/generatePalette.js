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

    for(let j = base; j < paletteLength / 10; j += increment) {
        while(k - increment > 0.99) {
            console.log('ibjj')
            arr.push({ h, s, l: k - increment });
            k -= increment;
        }

        if(j >= paletteLength / 10 - increment) {
            console.log('in')
            arr.push({ h, s, l: Math.round((j * 100) / 100) / 2 });
        }

        console.log('njknjnj')
        arr.push({ h, s, l: Math.round(j * 100) / 100 });
    }

    arr.sort((a, b) => {
        return a.l - b.l;
    });

    return arr;
}

module.exports = generatePalette

/**
 * take any color
 * calc palette size
 * calc increment size
 * divide palette length by increment
 */