import tinycolor from 'tinycolor2';
import { recommendedColor } from '../compliance/recommendColor';
import { PaletteOptions } from '../types';

/**
 * @description Generates a spectrum based on inout color
 * @param {Color} color 
 * @param {number} paletteLength  how long palette should be
 * @param {string} level AA or AAA
 * @returns {array} of { h, s, l }
 */
export function generateMonoPalette(
    color: any,
    options: PaletteOptions = {
        level: 'AA',
        paletteLength: 10
    }
) {
    const { paletteLength, level } = options;

    color = tinycolor(color).toHsl();
    let { h, s , l } = color;
    
    if(typeof h === 'string') h = parseFloat(h);

    const base = Math.round(l * 100) / 100;
    let increment = Math.round(100 / paletteLength) / 100;

    if(level === 'AAA') increment *= 2;

    const arr = [];

    function lightenBase() {
        for(let j = base; j < (paletteLength - 1) / 10; j += increment) {
            if(j + increment >= 1 && tinycolor(color).toHexString() !== '#ffffff') {
                arr.push({ h, s, l: 1 });
            }
    
            if(j + increment <= 0 && tinycolor(color).toHexString() !== '#000000') {
                arr.push({ h, s, l: 1 });
            }

            arr.push({ h, s, l: Math.round(j * 100) / 100 });
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
            arr.push({ h, s, l: Math.round(i * 100) / 100 });
        }
    }

    while(arr.length < paletteLength) {
        if(tinycolor(color).isDark()) {
            lightenBase();
            darkenBase();
        }

        if(tinycolor(color).isLight()) {
            darkenBase();
            lightenBase();
        }
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