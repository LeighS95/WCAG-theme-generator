const tinycolor = require('tinycolor2');
const getReccommended = require('./reccommendedColor');

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

module.exports = generateColor