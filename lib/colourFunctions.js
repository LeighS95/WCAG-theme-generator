const tinycolor2 = require('tinycolor2');

/**
 * @description brightens a color by set value
 * @param {color} color 
 * @param {number|string} lightenBy Amount to brighten input color by
 * @returns {string}
 */
export function brighten(color, lightenBy) {
    return tinycolor2(color).brighten(lightenBy).toString();
}

/**
 * @description Ruturn if light or dark text color should be used
 * @param {color} color
 * @param {string} level provide WCAG level AA or AAA
 * @returns {string} 'use dark' or 'use light'
 */
export function checkReadable(color, level = 'AA') {
    const ratio = level === 'AAA' ? 7.0 : 4.5;

    if(tinycolor2.readability(color, '#000000') > ratio) {
        return 'Use Dark Font'
    }

    return 'Use Light Font'
}

export function multiplyColor(color, multiplier) {
    let hsvColor = tinycolor2(color).toHsv();
    let chroma = hsvColor.s * hsvColor.v;

    if(hsvColor.v === 0) hsvColor.v = (1 / 255);

    hsvColor.v = hsvColor * multiplier;

    hsvColor.v === 0 ? hsvColor.s = 0 : hsvColor.s = chroma / hsvColor.v;

    hsvColor.v = Math.min(1, hsvColor.v);
    hsvColor.s = Math.min(1, hsvColor.s);

    return tinycolor2(hsvColor).toHexString();
}