export type Color =
    | string
    | { r: number, b: number, g: number }
    | { r: number, g: number, b: number, a: number }
    | { h: number, s: number, l: number }
    | { h: number, s: number, l: number, a: number }

export type PaletteOptions = {
    paletteLength: number;
    level: 'AA' | 'AAA';
    saturationStep?: number;
}