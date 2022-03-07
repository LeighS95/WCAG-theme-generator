const tinycolor = require('tinycolor2');

/**
 * @description Generates a spectrum based on inout color
 * @param color 
 * @param {number} paletteLength  how long palette should be
 * @param {string} level AA or AAA
 * @returns {array} of { h, s, l }
 */
function generateMonoPalette(color, paletteLength = 9, level = 'AA') {
    if(typeof color !== 'object') {
        color = tinycolor(color).toHsl();
    }
    const { h, s , l, a } = color;

    const base = Math.round(l * 100) / 100;
    let increment = Math.round(100 / paletteLength) / 100;

    if(level === 'AAA') increment *= 2;

    let arr = [];

    function lightenBase() {
        for(let j = base; j < paletteLength / 10; j += increment) {
            if(j + increment >= 1 && tinycolor(color).toHexString() !== '#ffffff') {
                arr.push({ h, s, l: 1, a });
            }
    
            if(j + increment <= 0 && tinycolor(color).toHexString() !== '#000000') {
                arr.push({ h, s, l: 1, a });
            }

            arr.push({
                h,
                s,
                l: Math.round(j * 100) / 100 ,
                a
            });
        }
    }

    function darkenBase() {
        for(let i = base; i > 0; i -= increment) {
            if(i + increment >= 1 && tinycolor(color).toHexString() !== '#ffffff') {
                arr.push({ h, s, l: 1 });
            }
    
            if(i + increment <= 0 && tinycolor(color).toHexString() !== '#000000') {
                arr.push({ h, s, l: 1 });
            }
            arr.push({
                h,
                s,
                l: Math.round(i * 100) / 100,
                a
            });
        }
    }

    while(arr.length < paletteLength) {
        if(tinycolor(color).isDark()) {
            lightenBase();
            darkenBase();
        }
        // for(let j = base; j < paletteLength / 10; j += increment) {
        //     if(j + increment >= 1 && tinycolor(color).toHexString() !== '#ffffff') {
        //         arr.push({ h, s, l: 1 });
        //     }
    
        //     if(j + increment <= 0 && tinycolor(color).toHexString() !== '#000000') {
        //         arr.push({ h, s, l: 1 });
        //     }

        //     arr.push({ h, s, l: Math.round(j * 100) / 100 });
        // }

        if(tinycolor(color).isLight()) {
            darkenBase();
            lightenBase();
        }
    
        // for(let i = base; i > 0; i -= increment) {
        //     if(i + increment >= 1 && tinycolor(color).toHexString() !== '#ffffff') {
        //         arr.push({ h, s, l: 1 });
        //     }
    
        //     if(i + increment <= 0 && tinycolor(color).toHexString() !== '#000000') {
        //         arr.push({ h, s, l: 1 });
        //     }
        //     arr.push({ h, s, l: Math.round(i * 100) / 100 });
        // }
    }

    arr.sort((a, b) => {
        return a.l - b.l;
    });

    const filtered = arr.reduce((unique, o) => {
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
    if(typeof color !== 'object') {
        color = tinycolor(color).toHsl();
    }

    let color2 = tinycolor(color).toHsl();

    color2.h = (color.h + 180) > 360 ? (color.h + 180) - 360 : color.h + 180;

    // let h1 = defineHue(h0, 180);
    // if (h > 1) h = (h / 360).toFixed(2);

    // let color1 = {h, s, l};
    // color1 = {...generateMonoPalette((color1))};

    const palette = {
        color1: generateMonoPalette(color),
        color2: generateMonoPalette(color2)
    }

    // const palette = {color1};

    return palette;
}

function generateSplitComPalette(color) {
    if(typeof color !== 'object') {
        color = tinycolor(color).toHsl();
    }

    let split = (color.h + 180) > 360 ? (color.h + 180) - 360 : color.h + 180;

    let color2 = tinycolor(color).toHsl();
    let color3 = tinycolor(color).toHsl();

    color2.h = split - 30;
    color3.h = split + 30;

    // let h1 = defineHue(h0, 150);
    // let h2 = defineHue(h0, 210);

    // let color1 = {h: h1, s, l};
    // let color2 = {h: h2, s, l}
    // color1 = {...generateMonoPalette(roundColorValues(color1))};
    // color2 = {...generateMonoPalette(roundColorValues(color2))};

    const palette = {
        color1: generateMonoPalette(color),
        color2: generateMonoPalette(color2),
        color3: generateMonoPalette(color3)
    }

    // const palette = {color1, color2};

    return palette;
}

function generateTriadicPalette(color) {
    color = tinycolor(color).toHsl();
    // let { h, s , l } = color;
    color = tinycolor(color).toHsl();

    let split = (color.h + 180) > 360 ? (color.h + 180) - 360 : color.h + 180;

    let color2 = tinycolor(color).toHsl();
    let color3 = tinycolor(color).toHsl();

    color2.h = split - 60;
    color3.h = split + 60;

    // let h1 = defineHue(h0, 120);
    // let h2 = defineHue(h0, 240);

    // let color1 = {h: h1, s, l};
    // let color2 = {h: h2, s, l}
    // color1 = {...generateMonoPalette(roundColorValues(color1))};
    // color2 = {...generateMonoPalette(roundColorValues(color2))};

    const palette = {
        color1: generateMonoPalette(color),
        color2: generateMonoPalette(color2),
        color3: generateMonoPalette(color3)
    }

    // const palette = {color1, color2};

    return palette;
}

function generateTetradicPalette(color) {
    if(typeof color !== 'object') {
        color = tinycolor(color).toHsl();
    }
    // let { h: h0, s , l } = color;

    let color2 = tinycolor(color).toHsl();
    let color3 = tinycolor(color).toHsl();
    let color4 = tinycolor(color).toHsl();

    // let increment = 120;

    color2.h = (color.h + 90) > 360 ? (color.h + 90) - 360 : color.h + 90;
    color3.h = (color2.h + 90) > 360 ? (color2.h + 90) - 360 : color2.h + 90;
    color4.h = (color3.h + 90) > 360 ? (color3.h + 90) - 360 : color3.h + 90;

    // let h1 = defineHue(h0, 90);
    // let h2 = defineHue(h0, 180);
    // let h3 = defineHue(h0, 270);

    // let color1 = {h: h1, s, l};
    // let color2 = {h: h2, s, l}
    // let color3 = {h: h3, s, l}
    // color1 = {...generateMonoPalette(roundColorValues(color1))};
    // color2 = {...generateMonoPalette(roundColorValues(color2))};
    // color3 = {...generateMonoPalette(roundColorValues(color3))};

    const palette = {
        color1: generateMonoPalette(color),
        color2: generateMonoPalette(color2),
        color3: generateMonoPalette(color3),
        color4: generateMonoPalette(color4)
    }

    // const palette = {color1, color2, color3};

    return palette;
}

function generateAnalogousPalette(color) {
    if(typeof color !== 'object') {
        color = tinycolor(color).toHsl();
    }
    // let { h: h0, s , l } = color;

    let color2 = tinycolor(color).toHsl();
    let color3 = tinycolor(color).toHsl();

    color2.h = (color.h + 30) > 360 ? (color.h + 30) - 360 : color.h + 30;
    color3.h = (color.h - 30) < 0 ? 360 + (color.h - 30) : color.h - 30;

    // let h1 = defineHue(h0, 30);
    // let h2 = defineHue(h0, 60);
    // let h3 = defineHue(h0, 90);

    // let color1 = {h: h1, s, l};
    // let color2 = {h: h2, s, l}
    // let color3 = {h: h3, s, l}
    // color1 = {...generateMonoPalette(roundColorValues(color1))};
    // color2 = {...generateMonoPalette(roundColorValues(color2))};
    // color3 = {...generateMonoPalette(roundColorValues(color3))};

    const palette = {
        color1: generateMonoPalette(color),
        color2: generateMonoPalette(color2),
        color3: generateMonoPalette(color3)
    }

    // const palette = {color1, color2, color3};

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


module.exports = {
    generateMonoPalette,
    generateComPalette,
    generateSplitComPalette,
    generateTriadicPalette,
    generateTetradicPalette,
    generateAnalogousPalette,
    generateAllPalettes
};
