import tinycolor from "tinycolor2";
import { generateMonoPalette } from "./generateMonoPalette";
import { PaletteOptions } from "../types";

export function generateAnalogousPalette(
    color: any,
    options?: PaletteOptions
) {
    if(typeof color !== 'object') {
        color = tinycolor(color).toHsl();
    }

    let color2 = tinycolor(color).toHsl();
    let color3 = tinycolor(color).toHsl();

    color2.h = (color.h + 30) > 360 ? (color.h + 30) - 360 : color.h + 30;
    color3.h = (color.h - 30) < 0 ? 360 + (color.h - 30) : color.h - 30;

    const palette = {
        color1: generateMonoPalette(color, options),
        color2: generateMonoPalette(color2, options),
        color3: generateMonoPalette(color3, options)
    }

    return palette;
}