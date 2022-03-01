import { relativeLuminance } from './relativeLuminance';

/**
 * @description Get contrast ratio between 2 colors
 * @param {color} color1 
 * @param {color} color2 
 * @returns {number} contrast ratio as a number
 */
export function contrastRatio(color1, color2) {
    let ratio = (0.05 + relativeLuminance(color1)) / (0.05 + relativeLuminance(color2));

    if(ratio < 1) ratio = 1 / ratio;

    return ratio;
}