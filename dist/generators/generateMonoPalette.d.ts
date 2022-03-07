import { PaletteOptions } from '../types';
/**
 * @description Generates a spectrum based on inout color
 * @param {Color} color
 * @param {number} paletteLength  how long palette should be
 * @param {string} level AA or AAA
 * @returns {array} of { h, s, l }
 */
export declare function generateMonoPalette(color: any, options?: PaletteOptions): any;
