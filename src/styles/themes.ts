import { Color, colorFromHex, darken, lighten } from '../utils/colorify';
import colors from './colors';

export interface TalkyBaseTheme {
  background: Color;
  foreground: Color;
  border: Color;
  primaryBackground: Color;
  primaryForeground: Color;
  secondaryBackground: Color;
  secondaryForeground: Color;
  attentionBackground: Color;
  attentionForeground: Color;
  actionBackground: Color;
  actionForeground: Color;
}

export interface TalkyTheme extends TalkyBaseTheme {
  buttonPrimaryBackground: Color;
  buttonPrimaryBackgroundHover: Color;
  buttonPrimaryBackgroundActive: Color;
  buttonPrimaryText: Color;

  buttonSecondaryBackground: Color;
  buttonSecondaryBackgroundHover: Color;
  buttonSecondaryBackgroundActive: Color;
  buttonSecondaryText: Color;

  buttonAttentionBackground: Color;
  buttonAttentionBackgroundHover: Color;
  buttonAttentionBackgroundActive: Color;
  buttonAttentionText: Color;

  buttonActionBackground: Color;
  buttonActionBackgroundHover: Color;
  buttonActionBackgroundActive: Color;
  buttonActionText: Color;

  alertInfoBackground: Color;
  alertInfoForeground: Color;

  alertErrorBackground: Color;
  alertErrorForeground: Color;
}

const lightBase: TalkyBaseTheme = {
  background: colorFromHex('#fff'),
  foreground: colorFromHex('#444'),
  border: lighten(colorFromHex('#444'), 0.5),
  primaryBackground: colors.blue,
  primaryForeground: colorFromHex('#fff'),
  secondaryBackground: colors.grayLighter,
  secondaryForeground: colors.grayDark,
  attentionBackground: colors.pink,
  attentionForeground: colorFromHex('#fff'),
  actionBackground: colors.green,
  actionForeground: colorFromHex('#fff')
};

const darkBase: TalkyBaseTheme = {
  ...lightBase,
  background: colorFromHex('#121212'),
  foreground: colorFromHex('#fff'),
  border: lighten(colorFromHex('#121212'), 0.25),
  secondaryBackground: colorFromHex('#2a2a2a'),
  secondaryForeground: colorFromHex('#fff')
};

function kebabToCamel(s: string): string {
  return s.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

function mergeOverrides(base: TalkyBaseTheme): TalkyBaseTheme {
  const baseTheme: TalkyBaseTheme = { ...base };
  const properties = Array.from(
    document.head.querySelectorAll('meta[name*=simplewebrtc-theme]')
  ).reduce((a, b) => {
    const name = b.getAttribute('name');
    const content = b.getAttribute('content');
    if (name !== null && content !== null) {
      a[kebabToCamel(name.replace('simplewebrtc-theme-', ''))] = content;
    }
    return a;
  }, {} as { [key: string]: string });

  Object.keys(properties).forEach(k => {
    if (baseTheme.hasOwnProperty(k)) {
      baseTheme[k as keyof TalkyBaseTheme] = colorFromHex(properties[k]);
    }
  });

  return baseTheme;
}

function baseToFull(base: TalkyBaseTheme): TalkyTheme {
  return {
    ...base,
    buttonPrimaryBackground: base.primaryBackground,
    buttonPrimaryBackgroundHover: lighten(base.primaryBackground, 0.05),
    buttonPrimaryBackgroundActive: darken(base.primaryBackground, 0.05),
    buttonPrimaryText: base.primaryForeground,

    buttonSecondaryBackground: base.secondaryBackground,
    buttonSecondaryBackgroundHover: lighten(base.secondaryBackground, 0.05),
    buttonSecondaryBackgroundActive: darken(base.secondaryBackground, 0.05),
    buttonSecondaryText: base.secondaryForeground,

    buttonAttentionBackground: base.attentionBackground,
    buttonAttentionBackgroundHover: lighten(base.attentionBackground, 0.05),
    buttonAttentionBackgroundActive: darken(base.attentionBackground, 0.05),
    buttonAttentionText: base.attentionForeground,

    buttonActionBackground: base.actionBackground,
    buttonActionBackgroundHover: lighten(base.actionBackground, 0.05),
    buttonActionBackgroundActive: darken(base.actionBackground, 0.05),
    buttonActionText: base.actionForeground,

    alertInfoBackground: lighten(base.primaryBackground, 0.5),
    alertInfoForeground: base.primaryBackground,

    alertErrorBackground: lighten(base.attentionBackground, 0.5),
    alertErrorForeground: base.attentionBackground
  };
}

const themes: { [index: string]: TalkyTheme } = {
  light: baseToFull(mergeOverrides(lightBase)),
  dark: baseToFull(mergeOverrides(darkBase))
};

export default themes;
