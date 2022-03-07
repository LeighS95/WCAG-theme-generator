import tinycolor from "tinycolor2";
import { generateMonoPalette } from "./generateMonoPalette";
import { PaletteOptions } from "../types";

export function generateTetradicPalette(
    color: any,
    options?: PaletteOptions
) {
    if(typeof color !== 'object') {
        color = tinycolor(color).toHsl();
    }

    let color2 = tinycolor(color).toHsl();
    let color3 = tinycolor(color).toHsl();
    let color4 = tinycolor(color).toHsl();

    color2.h = (color.h + 90) > 360 ? (color.h + 90) - 360 : color.h + 90;
    color3.h = (color2.h + 90) > 360 ? (color2.h + 90) - 360 : color2.h + 90;
    color4.h = (color3.h + 90) > 360 ? (color3.h + 90) - 360 : color3.h + 90;

    const palette = {
        color1: generateMonoPalette(color, options),
        color2: generateMonoPalette(color2, options),
        color3: generateMonoPalette(color3, options),
        color4: generateMonoPalette(color4, options)
    }

    return palette;
}