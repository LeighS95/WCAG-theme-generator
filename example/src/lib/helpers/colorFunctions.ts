import tinycolor from 'tinycolor2';

/**
 * @description brightens a color by set value
 * @param {color} color 
 * @param {number|string} lightenBy Amount to brighten input color by
 * @returns {string}
 */
export function brighten(color:any, lightenBy:any) {
    return tinycolor(color).brighten(lightenBy).toString();
}

/**
 * @description Ruturn if light or dark text color should be used
 * @param {color} color
 * @param {string} level provide WCAG level AA or AAA
 * @returns {string} 'use dark' or 'use light'
 */
export function checkReadable(color:any, level = 'AA') {
    const ratio = level === 'AAA' ? 7.0 : 4.5;

    if(tinycolor.readability(color, '#000000') > ratio) {
        return 'Use Dark Font'
    }

    return 'Use Light Font'
}

export function multiplyColor(color:any, multiplier:any) {
    let hsvColor:any = tinycolor(color).toHsv();
    let chroma = hsvColor.s * hsvColor.v;

    if(hsvColor.v === 0) hsvColor.v = (1 / 255);

    hsvColor.v = hsvColor * multiplier;

    hsvColor.v === 0 ? hsvColor.s = 0 : hsvColor.s = chroma / hsvColor.v;

    hsvColor.v = Math.min(1, hsvColor.v);
    hsvColor.s = Math.min(1, hsvColor.s);

    return tinycolor(hsvColor).toHexString();
}