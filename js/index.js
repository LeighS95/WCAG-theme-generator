// // import { colorToRGB } from './colorToRGB';
// // import { brighten, checkReadable, multiplyColor } from './colourFunctions';
// // import { contrastRatio } from './contrastRatio';
// // import { generateColor } from './generateColor';
// const tinycolor = require('tinycolor2');
// const generateColor = require('./generateColor');
const {generateSplitComPalette} = require('./generatePalette');
// const {generateAllPalettes} = require('./generatePalette');
// // import { hexToRGB } from './hexToHSL';
const { getReccommended, reccommendedColors } = require('./reccommendedColor');
// // import { relativeLuminance } from './relativeLuminance';

console.log(generateSplitComPalette('pink'))