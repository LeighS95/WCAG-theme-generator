import tinycolor2 from 'tinycolor2';
import { getReccommended } from './reccommendedColor';

/**
 * @description Generates color with AA or AAA contrast ratio
 * @param {any} color 
 * @param {string} level AA or AAA
 * @returns {string} color as string
 */
export function generateColor(color, level = 'AA') {
    if(level === undefined) return tinycolor2(color).toHexString();

    const ratio = level === 'AAA' ? 7.0 : 4.5;

    return getReccommended(color, ratio);
}