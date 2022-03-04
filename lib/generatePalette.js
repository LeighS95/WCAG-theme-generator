const tinycolor = require('tinycolor2');

/**
 * @description Generates a spectrum based on inout color
 * @param color 
 * @param {number} paletteLength  how long palette should be
 * @param {string} level AA or AAA
 * @returns {array} of { h, s, l }
 */
function generateMonoPalette(color, paletteLength = 9, level = 'AA') {
    let { h, s , l } = color;
    if (h > 1) h = (h / 360).toFixed(2);

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
    
    // Object.keys(color).forEach(function(key) {
    //     const k = color[key];
    //     let v = k;
    //     if(k > 1) v = (k - 1);
    //     v = v.toFixed(2);
    //     newColor[key] = v;
    // });

    Object.keys(color).forEach(function(key) {
        const k = color[key];
        let v = k.toFixed(2);
        newColor[key] = parseFloat(v);
    });

    return newColor;
}

function defineHue(hue, multiplier) {
    let newHue = ((hue + multiplier) - 360);
    if (newHue < 0) newHue = 360 + newHue;
    newHue = newHue / 360;

    return newHue;
}

function generateComPalette(color) {
    let { h: h0, s , l } = color;

    let h1 = defineHue(h0, 180);

    let color1 = {h: h1, s, l};
    color1 = {...generateMonoPalette(roundColorValues(color1))};

    const palette = {color1};

    return palette;
}

function generateSplitComPalette(color) {
    let { h: h0, s , l } = color;

    let h1 = defineHue(h0, 150);
    let h2 = defineHue(h0, 210);

    let color1 = {h: h1, s, l};
    let color2 = {h: h2, s, l}
    color1 = {...generateMonoPalette(roundColorValues(color1))};
    color2 = {...generateMonoPalette(roundColorValues(color2))};

    const palette = {color1, color2};

    return palette;
}

function generateTriadicPalette(color) {
    let { h: h0, s , l } = color;

    let h1 = defineHue(h0, 120);
    let h2 = defineHue(h0, 240);

    let color1 = {h: h1, s, l};
    let color2 = {h: h2, s, l}
    color1 = {...generateMonoPalette(roundColorValues(color1))};
    color2 = {...generateMonoPalette(roundColorValues(color2))};

    const palette = {color1, color2};

    return palette;
}

function generateTetradicPalette(color) {
    let { h: h0, s , l } = color;

    let h1 = defineHue(h0, 90);
    let h2 = defineHue(h0, 180);
    let h3 = defineHue(h0, 270);

    let color1 = {h: h1, s, l};
    let color2 = {h: h2, s, l}
    let color3 = {h: h3, s, l}
    color1 = {...generateMonoPalette(roundColorValues(color1))};
    color2 = {...generateMonoPalette(roundColorValues(color2))};
    color3 = {...generateMonoPalette(roundColorValues(color3))};

    const palette = {color1, color2, color3};

    return palette;
}

function generateAnalogousPalette(color) {
    let { h: h0, s , l } = color;

    let h1 = defineHue(h0, 30);
    let h2 = defineHue(h0, 60);
    let h3 = defineHue(h0, 90);

    let color1 = {h: h1, s, l};
    let color2 = {h: h2, s, l}
    let color3 = {h: h3, s, l}
    color1 = {...generateMonoPalette(roundColorValues(color1))};
    color2 = {...generateMonoPalette(roundColorValues(color2))};
    color3 = {...generateMonoPalette(roundColorValues(color3))};

    const palette = {color1, color2, color3};

    return palette;
}

function generateAllPalettes(color) {
    let hsl = tinycolor(color).toHsl();

    // Object.keys(hsl).forEach(function(key) {
    //     const k = hsl[key];
    //     let v = k;
    //     if (k >= 10) v = k / 1000;
    //     if (k > 1 && k < 10) {
    //         v = k / 100;
    //     }
    //     base[key] = v;
    // });

    let baseColorPalettes = {
        monoChrome: {...generateMonoPalette(hsl)},
        complimentary: {...generateComPalette(hsl)},
        splitComplimentary: {...generateSplitComPalette(hsl)},
        triadic: {...generateTriadicPalette(hsl)},
        tetradic: {...generateTetradicPalette(hsl)},
        analogous: {...generateAnalogousPalette(hsl)},
    };

    console.log('baseColorPalettes ', JSON.stringify(baseColorPalettes, null, 4));

    return baseColorPalettes;
}


module.exports = generateAllPalettes;
