import tinycolor from "tinycolor2";
import { generateMonoPalette } from "./generateMonoPalette";
import { PaletteOptions } from '../types';

export function generateSplitCompPalette(
    color:any,
    options?: PaletteOptions
) {
    if(typeof color !== 'object') {
        color = tinycolor(color).toHsl();
    }

    const split = (color.h + 180) > 360 ? (color.h + 180) - 360 : color.h + 180;

    let color2 = tinycolor(color).toHsl();
    let color3 = tinycolor(color).toHsl();

    color2.h = split - 30;
    color3.h = split + 30;

    const palette = {
        color1: generateMonoPalette(color, options),
        color2: generateMonoPalette(color2, options),
        color3: generateMonoPalette(color3, options)
    }

    return palette;
}