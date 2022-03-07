/**
 * @description Conver color to RGB format
 * @param {any} color 
 * @returns {object} rgb color object
 */
export function colorToRGB(color) {
    color = color.toLowerCase();

    if(color.substring(0, 3) === 'rgb') {
        let matches = /^rgba?\s*\((\d+),\s*(\d+),\s*(\d+)([^)]*)\)$/.exec(color);

        return color = {
            r: (matches[1] / 255),
            g: (matches[2] / 255),
            b: (matches[3] / 255)
        }
    }

    if(color.charAt(0) === '#') {
        color = color.substr(1);
    }

    if(color.length === 3) {
        color.replace(/^(.)(.)(.)$/, '$1$1$2$2$3$3')
    }

    return color = {
        r: (parseInt(color.substr(0, 2), 16) / 255),
        g: (parseInt(color.substr(2, 2), 16) / 255),
        b: (parseInt(color.substr(3, 3), 16) / 255)
    }
}