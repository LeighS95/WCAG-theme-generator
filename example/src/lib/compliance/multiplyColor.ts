import tinycolor from "tinycolor2";
import { Color } from "../types";

export function multiplyColor(
    color: Color,
    multiplier: number
) {
    let hsvColor:any = tinycolor(color).toHsv();
    let chroma = hsvColor.s * hsvColor.v;

    if(hsvColor.v === 0) hsvColor.v = (1 / 255);

    hsvColor.v = hsvColor * multiplier;

    hsvColor.v === 0 ? hsvColor.s = 0 : hsvColor.s = chroma / hsvColor.v;

    hsvColor.v = Math.min(1, hsvColor.v);
    hsvColor.s = Math.min(1, hsvColor.s);

    return tinycolor(hsvColor).toHexString();
}