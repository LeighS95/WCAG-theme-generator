import tinycolor from 'tinycolor2';
import { generateMonoPalette } from "./generateMonoPalette";
import { generateCompPalette } from "./generateCompPalette";
import { generateSplitCompPalette } from "./generateSplitCompPalette";
import { generateTriadicPalette } from "./generateTriadicPalette";
import { generateTetradicPalette } from "./generateTetradicPalette";
import { generateAnalogousPalette } from "./generateAnalogousPalette";
import { PaletteOptions } from '../types';


export function generateAllPalettes(
    color: any,
    options?: PaletteOptions
) {
    const hsl = tinycolor(color).toHsl();

    let baseColorPalettes = {
        monoChrome: {...generateMonoPalette(hsl, options)},
        complimentary: {...generateCompPalette(hsl, options)},
        splitComplimentary: {...generateSplitCompPalette(hsl, options)},
        triadic: {...generateTriadicPalette(hsl, options)},
        tetradic: {...generateTetradicPalette(hsl, options)},
        analogous: {...generateAnalogousPalette(hsl, options)},
    };

    return baseColorPalettes;
}