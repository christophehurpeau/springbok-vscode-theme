import convert from 'color-convert';

/**
 * Raw colors. No token reads these directly - `colors.js` maps them to roles,
 * and only those roles reach the theme.
 *
 * The generated groups below share one shade ladder, as S%/L% in HSL:
 *
 *   darkest   85% / 18%
 *   darker    85% / 30%
 *   dark      65% / 43%
 *   light     61% / 56%
 *   bright   100% / 45%
 *   xlight    61% / 71%
 *
 * `bright` is the saturated rung, not the lightest one - it is what the ANSI
 * bright terminal colors use.
 *
 * The hand-written groups (`springbok`, `soil`, `black`, `dark`, `dim`,
 * `white`) reuse the rung names but not the ladder: they are tuned by eye and
 * each defines only the rungs it needs. Their L% is in a comment per value.
 */
export const createPalette = (type) => {
  /**
   * Expands one mid-tone hex into the ladder above. The input must be exactly
   * `h`/65%/43% - the `dark` rung - so that the ladder is reproducible from it.
   *
   * The light theme shifts the whole ladder down: same hues, slightly less
   * saturation, and lightness reduced proportionally so the rungs stay legible
   * against a white background instead of a black one.
   */
  const createPaletteColor = (color, h) => {
    const hsl = convert.hex.hsl(color);
    if (hsl[0] !== h) throw new Error('Color h must be ' + hsl[0]);
    if (hsl[1] !== 65) throw new Error('Color s must be 65%');
    if (hsl[2] !== 43) throw new Error('Color l must be 43%');

    const hexHslWithTypeAdjustments = (s, l) => {
      const additionalSaturationOffset = type === 'dark' ? 0 : -4;
      const additionalLightnessOffset = type === 'dark' ? 0 : -(l / 12 + 4);

      return (
        '#' +
        convert.hsl.hex([
          h,
          s + additionalSaturationOffset,
          l + additionalLightnessOffset,
        ])
      );
    };

    return {
      darkest: hexHslWithTypeAdjustments(85, 18),
      darker: hexHslWithTypeAdjustments(85, 30),
      dark: hexHslWithTypeAdjustments(65, 43),
      light: hexHslWithTypeAdjustments(61, 56),
      bright: hexHslWithTypeAdjustments(100, 45),
      xlight: hexHslWithTypeAdjustments(61, 71),
    };
  };

  return {
    // the brand hue, 22 degrees
    springbok: {
      darkest: '#552407',
      darker: '#8F3C0C',
      dark: '#B55A26',
      light: '#D37947',
      xlight: '#e0a88a',
    },

    // the brand hue desaturated: the warm greys every surface is built from
    soil: {
      darkest: '#332c28', // 22deg, 12%, 18%
      darker: '#564a43', // 22deg, 12%, 30%
      dark: '#7b6a60', // 22deg, 12%, 43%

      light: '#D9CAC2', // 21deg, 23%, 81%
      lighter: '#E4DFDD', // 17deg, 11%, 88%
      xlight: '#F6E7DE', // 23deg, 57%, 92%
      xxlight: '#F4F2F1', // 20deg, 12%, 95%
    },

    // ansi
    red: createPaletteColor('#b52a26', 2),
    green: createPaletteColor('#26b52a', 122),
    yellow: createPaletteColor('#b5a726', 54),
    blue: createPaletteColor('#263eb5', 230),
    magenta: createPaletteColor('#b526a2', 308),
    cyan: createPaletteColor('#26a2b5', 188),

    // additional
    sky: createPaletteColor('#2672b5', 208),
    purple: createPaletteColor('#6b26b5', 269),
    orange: createPaletteColor('#b57c26', 36),

    // neutral greys, in three overlapping ranges
    black: {
      darkest: '#080808', // 3%
      darker: '#1a1a1a', // 10%
      dark: '#383838', // 22%
      light: '#797979', // 47%
      bright: '#a0a0a0', // 63%
    },
    dark: {
      darkest: '#181818', // 9%
      darker: '#2f2f2f', // 18%
      dark: '#474747', // 28%
      light: '#878787', // 53%
    },
    dim: {
      darkest: '#2f2f2f', // 18%
      dark: '#707070', // 43%
      light: '#9f9f9f', // 62%
      xlight: '#e0e0e0', // 88%
    },
    white: {
      dark: '#D7D7D7', // 84%
      light: '#ebebeb', // 92%
      xlight: '#fefefe', // 99.6%
    },
  };
};
