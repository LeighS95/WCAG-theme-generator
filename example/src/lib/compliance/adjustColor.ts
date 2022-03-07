import tinycolor from "tinycolor2";
import { multiplyColor } from "./multiplyColor";
import { Color } from "../types";
import { recommendedColor } from "./recommendColor";

export function adjustColor(
    target: number,
    background: Color,
    foreground?: Color,
) {
    let newColor;

    if(!foreground) {
        tinycolor(background).isLight()
            ? foreground = tinycolor('black').toHsl()
            : foreground = tinycolor('white').toHsl();
    }

    recommendedColor(target, background, foreground)

    return newColor;
}