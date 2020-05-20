function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(min, num), max);
}

export interface Color {
  h: number;
  s: number;
  l: number;
  a: number;
}

export function colorFromHsla(h: number, s: number, l: number, a: number = 1): Color {
  return { h: h / 360, s, l, a };
}

export function colorFromHsl(h: number, s: number, l: number): Color {
  return colorFromHsla(h, s, l);
}

export function colorFromRgba(r: number, g: number, b: number, a: number = 1): Color {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return { h, s, l, a };
}

export function colorFromRgb(r: number, g: number, b: number): Color {
  return colorFromRgba(r, g, b);
}

export function colorFromHex(s: string): Color {
  const [r, g, b, a] = s
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, _r, _g, _b) => '#' + _r + _r + _g + _g + _b + _b
    )
    .substring(1)
    .match(/.{2}/g)!
    .map(x => parseInt(x, 16));
  return a ? colorFromRgba(r, g, b, a) : colorFromRgb(r, g, b);
}

export function colorToString(c: Color): string {
  const { h, s, l, a } = c;
  return `hsla(${h}turn, ${(s * 100) / 1}%, ${(l * 100) / 1}%, ${a})`;
}

export function lighten(c: Color, amount: number): Color {
  const { h, s, l, a } = c;
  return { h, s, l: clamp(l + amount, 0, 1), a };
}

export function darken(c: Color, amount: number): Color {
  const { h, s, l, a } = c;
  return { h, s, l: clamp(l - amount, 0, 1), a };
}
