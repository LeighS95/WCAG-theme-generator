import { PaletteOptions } from '../types';
export declare function generateAllPalettes(color: any, options?: PaletteOptions): {
    monoChrome: any;
    complimentary: {
        color1: any;
        color2: any;
    };
    splitComplimentary: {
        color1: any;
        color2: any;
        color3: any;
    };
    triadic: {
        color1: any;
        color2: any;
        color3: any;
    };
    tetradic: {
        color1: any;
        color2: any;
        color3: any;
        color4: any;
    };
    analogous: {
        color1: any;
        color2: any;
        color3: any;
    };
};
