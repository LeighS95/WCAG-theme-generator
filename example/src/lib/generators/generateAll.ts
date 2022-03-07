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
    console.log(color)
    let baseColorPalettes = {
        monoChrome: generateMonoPalette(color, options),
        complimentary: generateCompPalette(color, options),
        splitComplimentary: generateSplitCompPalette(color, options),
        triadic: generateTriadicPalette(color, options),
        tetradic: generateTetradicPalette(color, options),
        analogous: generateAnalogousPalette(color, options),
    };

    return baseColorPalettes;
}