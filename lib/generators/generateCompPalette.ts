import tinycolor from "tinycolor2";
import { PaletteOptions } from "../types";
import { generateMonoPalette } from "./generateMonoPalette";

export function generateCompPalette(
    color: any,
    options?: PaletteOptions
) {
    if(typeof color !== 'object') {
        color = tinycolor(color).toHsl();
    }

    let color2 = tinycolor(color).toHsl();

    color2.h = (color.h + 180) > 360 ? (color.h + 180) - 360 : color.h + 180;

    const palette = {
        color1: generateMonoPalette(color, options),
        color2: generateMonoPalette(color2, options)
    }

    return palette;
}