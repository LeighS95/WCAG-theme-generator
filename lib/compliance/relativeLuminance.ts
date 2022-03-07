import tinycolor from 'tinycolor2';

export function relativeLuminance(color) {
    color = tinycolor(color).toRgb();

    let transformed:any = {};

    for(let x in color) {
        if(color[x] <= 0.03928) {
            transformed[x] = color[x] / 12.92;
        } else {
            transformed[x] = Math.pow(((color[x] + 0.055) / 1.055), 2.4);
        }
    }

    let luminance = ((transformed.r * 0.02126) + (transformed.g * 0.7152) + (transformed.b * 0.0722));

    return luminance;
}