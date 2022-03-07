/**
 * @description brightens a color by set value
 * @param {color} color
 * @param {number|string} lightenBy Amount to brighten input color by
 * @returns {string}
 */
export declare function brighten(color: any, lightenBy: any): string;
/**
 * @description Ruturn if light or dark text color should be used
 * @param {color} color
 * @param {string} level provide WCAG level AA or AAA
 * @returns {string} 'use dark' or 'use light'
 */
export declare function checkReadable(color: any, level?: string): "Use Dark Font" | "Use Light Font";
export declare function multiplyColor(color: any, multiplier: any): string;
