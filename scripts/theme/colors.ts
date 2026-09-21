import type { Palette, ThemeType } from './palette.ts';

/**
 * The semantic layer: every palette value gets a role here, and the token maps
 * in `workbench.ts` / `token-colors.ts` only ever reference roles.
 */
export const createColors = (palette: Palette, type: ThemeType) => {
  const isDark = type === 'dark';

  const language1Color = palette.red;
  const language2Color = palette.magenta;
  const type1Color = palette.sky;

  const transparent = '#00000000';

  // surface behind inline `code` and fenced blocks in workbench markdown
  const preformatBackground = isDark
    ? palette.dark.darker
    : palette.soil.xlight;

  // The light base sits much closer to its editor background than the dark one
  // does, so it needs more alpha to read as a selection at all.
  const selectionBase = isDark ? palette.springbok.light : palette.soil.light;
  const selectionAlpha = isDark
    ? { active: '64', inactive: '32', hover: '96' }
    : { active: 'cc', inactive: '66', hover: 'e6' };

  const baseColors = {
    focus: palette.springbok.dark,
    error: palette.red.dark,
    warning: palette.yellow.dark,
    foreground: isDark ? palette.white.light : palette.black.dark,
    activeForeground: isDark ? palette.white.light : palette.black.darkest,
    inactiveBackground: isDark ? palette.dim.darkest : palette.dim.xlight,
    inactiveForeground: isDark ? palette.dim.light : palette.dim.dark,
  };

  return {
    ...baseColors,

    /**
     * -- Surfaces --
     *
     * Nothing is separated by a line, so every boundary has to be a step.
     * Three levels, lightest to darkest, mirroring Light+:
     *
     *   editor  - the editor and the tab strip it belongs to     (100% / 3%)
     *   surface - side bar, menus, palette, modern UI cards      ( 95% / 9%)
     *   frame   - title bar, activity bar, inactive tabs         ( 88% / 18%)
     *
     * `bottomPanel` sits between `surface` and `editor`, see below.
     */
    surface: {
      background: isDark ? palette.dark.darkest : palette.soil.xxlight,
      foreground: isDark ? palette.dim.xlight : palette.dim.darkest,
      focusForeground: isDark ? palette.white.light : palette.black.dark,
      // the step does the separating - a line on top of it only adds noise
      border: transparent,
    },

    // What the modern UI cards sit on, and the title/activity bar outside of
    // it. It has to contrast with `surface` or the cards' `border-radius` has
    // nothing to reveal, but it shows in 2px gaps between them, so a saturated
    // color would read as a decorative border. Contrast without hue.
    frame: {
      background: isDark ? palette.dark.darker : palette.soil.light,
    },

    // The bottom panel needs a level of its own: on `surface.background` it
    // reads as a third side bar, on `editor.background` it merges into the
    // editor above it. So it sits between the two.
    bottomPanel: {
      background: isDark ? palette.soil.darkest : palette.white.xlight,
      border: isDark ? palette.dark.darker : palette.soil.light,
    },

    sideBar: {
      titleForeground: isDark ? palette.dark.light : palette.dim.dark,
    },

    editor: {
      background: isDark ? palette.black.darkest : palette.white.xlight,
      foreground: isDark ? palette.dim.xlight : palette.black.dark,
      // between two split editors, which share a background
      border: isDark ? palette.dark.darker : palette.white.light,
      lineHighlightBackground: isDark ? '#1d1d1d' : '#f0f0f0',
      // alpha is appended at each use site, so this is a base, not a fill
      wordHighlightBase: isDark ? palette.springbok.light : palette.soil.xlight,
      blameForeground: isDark ? palette.soil.dark : palette.dim.light,
      cursor: isDark ? palette.springbok.light : palette.springbok.dark,
      // inline completions - warm dim, to read as distinct from the grey comments
      ghostText: palette.soil.dark,
      activeIndentGuide: palette.soil.dark,
    },

    editorGutter: {
      background: isDark ? palette.black.darker : palette.white.light,
      modifiedBackground: isDark
        ? palette.yellow.light
        : palette.yellow.darkerBright,
      addedBackground: isDark
        ? palette.green.light
        : palette.green.darkerBright,
      deletedBackground: isDark ? palette.red.light : palette.red.darkerBright,
      commentRangeForeground: isDark ? palette.dim.dark : palette.dim.light,

      lineNumberForeground: isDark ? palette.dim.dark : palette.dim.light,
      activeLineNumberForeground: isDark
        ? palette.white.light
        : palette.dark.dark,
    },

    diffEditor: {
      insertedTextBackground: isDark
        ? palette.green.light + '20'
        : palette.green.darkerBright + '20',
      removedTextBackground: isDark
        ? palette.red.light + '20'
        : palette.red.darkerBright + '20',
    },

    peekView: {
      border: isDark ? palette.springbok.darker : palette.springbok.light,
      titleBackground: isDark ? '#531412' : palette.soil.light,
      titleLabelForeground: isDark
        ? palette.white.xlight
        : palette.black.darkest,
      // same as the editor, a step darker
      editorBackground: isDark ? '#030303' : '#F3F3F3',
      editorMatchHighlightBackground: isDark ? '#14221e' : palette.soil.light,
      resultBackground: isDark ? '#0F0F0F' : palette.white.xlight,
      resultMatchHighlightBackground: isDark ? '#1e332d' : '#1e332d31',
      resultSelectionBackground: isDark
        ? palette.springbok.darker
        : palette.soil.xlight,
    },

    merge: {
      currentHeaderBackground: isDark
        ? palette.cyan.dark + '90'
        : palette.cyan.xlight + '90',
      currentContentBackground: isDark
        ? palette.cyan.dark + '60'
        : palette.cyan.xlight + '60',
      incomingHeaderBackground: isDark
        ? palette.blue.darker + '90'
        : palette.blue.xlight + '90',
      incomingContentBackground: isDark
        ? palette.blue.darker + '60'
        : palette.blue.xlight + '60',
      commonHeaderBackground: isDark
        ? palette.yellow.darker + '90'
        : palette.yellow.xlight + '90',
      commonContentBackground: isDark
        ? palette.yellow.darker + '60'
        : palette.yellow.xlight + '60',
    },

    // squiggles and their gutter/ruler marks
    diagnostics: {
      error: isDark ? palette.red.light : palette.red.darkerBright,
      warning: isDark ? palette.yellow.light : palette.yellow.darkerBright,
      info: isDark ? palette.sky.light : palette.sky.darkerBright,
    },

    selection: {
      background: selectionBase + selectionAlpha.active,
      inactiveBackground: selectionBase + selectionAlpha.inactive,
      hoverHighlightBackground: selectionBase + selectionAlpha.hover,
    },

    tabs: {
      // classic UI only - modern UI forces `.title.tabs` transparent and the
      // strip shows `editor.background` instead
      background: isDark ? palette.dark.darkest : palette.white.xlight,
      activeBackground: isDark ? palette.springbok.darkest : palette.soil.light,
      inactiveBackground: isDark ? palette.dim.darkest : palette.white.xlight,
      hoverBackground: isDark ? palette.soil.dark : palette.soil.light,
    },

    quickInput: {
      background: isDark ? palette.dark.darkest : palette.white.xlight,
      foreground: isDark ? palette.dim.xlight : palette.dim.darkest,
    },

    input: {
      background: isDark ? palette.dark.darker : palette.white.xlight,
      border: isDark ? palette.dark.darker : palette.soil.light,
      foreground: isDark ? palette.dim.xlight : palette.dark.darkest,

      option: {
        activeBorder: isDark
          ? palette.springbok.dark
          : palette.springbok.xlight,
        activeBackground: isDark
          ? palette.springbok.dark
          : palette.springbok.xlight,
        activeForeground: isDark ? palette.white.xlight : palette.black.darkest,
        hoverBackground: isDark ? palette.soil.dark : palette.soil.light,
      },
    },

    commandCenter: {
      foreground: baseColors.foreground,
      activeForeground: baseColors.activeForeground,
      // Sits on `frame.background`, so it cannot reuse the input background -
      // that is the frame's own color. Only painted when modern UI is off:
      // with it on, `.agent-status-pill` is forced `transparent !important`.
      background: isDark ? palette.dark.darkest : palette.white.xlight,
      // The hover still shows under modern UI, so it has to read against the
      // frame, not just against the background above.
      activeBackground: isDark ? palette.dark.dark : palette.springbok.xlight,
      border: isDark ? palette.dark.darker : palette.soil.xlight,
      activeBorder: isDark ? palette.dark.light : palette.springbok.xlight,
      inactiveForeground: baseColors.inactiveForeground,
      inactiveBorder: baseColors.inactiveBackground,
      debuggingBackground: '#8F100C90',
    },

    statusBar: {
      background: isDark ? palette.dark.darker : palette.white.xlight,
      foreground: isDark ? palette.dim.xlight : palette.dim.darkest,
      border: transparent,
      noFolderBackground: isDark ? palette.dark.light : palette.white.light,
      debuggingBackground: '#8F100C',
      debuggingForeground: palette.white.light,
    },

    terminal: {
      background: isDark ? palette.black.darkest : palette.white.xlight,
      foreground: isDark ? palette.white.light : palette.black.dark,
      black: isDark ? palette.black.light : palette.black.darkest,
      brightBlack: isDark ? palette.black.bright : palette.black.light,
      white: isDark ? palette.white.dark : palette.dim.dark,
      brightWhite: isDark ? palette.white.xlight : palette.dim.darkest,
      red: isDark ? palette.red.light : palette.red.darker,
      brightRed: isDark ? palette.red.bright : palette.red.dark,
      green: isDark ? palette.green.light : palette.green.darker,
      brightGreen: isDark ? palette.green.bright : palette.green.dark,
      yellow: isDark ? palette.yellow.light : palette.yellow.darker,
      brightYellow: isDark ? palette.yellow.bright : palette.yellow.dark,
      blue: isDark ? palette.blue.light : palette.blue.darker,
      brightBlue: isDark ? palette.blue.bright : palette.blue.dark,
      magenta: isDark ? palette.magenta.light : palette.magenta.darker,
      brightMagenta: isDark ? palette.magenta.bright : palette.magenta.dark,
      cyan: isDark ? palette.cyan.light : palette.cyan.darker,
      brightCyan: isDark ? palette.cyan.bright : palette.cyan.dark,
    },

    buttons: {
      background: palette.springbok.darker,
      hoverBackground: palette.springbok.dark,
      foreground: palette.white.light,
    },

    scrollbar: {
      shadow: isDark ? '#00000033' : '#55555533',
      slider: {
        background: palette.soil.light + '33',
        hoverBackground: palette.springbok.light + '83',
        activeBackground: palette.springbok.light + '63',
      },
    },

    // key caps in the command palette and keybinding editor - the bottom border
    // is a step darker than the rest to give the cap its lip
    keybinding: {
      background: isDark ? palette.soil.darkest : palette.soil.xlight,
      foreground: isDark ? palette.soil.light : palette.soil.darkest,
      border: isDark ? palette.soil.dark : palette.soil.light,
      bottomBorder: isDark ? palette.soil.darker : palette.soil.dark,
    },

    /* -- Workbench markdown -- */

    links: {
      default: isDark ? palette.springbok.dark : palette.springbok.light,
      active: isDark ? palette.springbok.light : palette.springbok.dark,
      editorActive: isDark ? palette.springbok.dark : palette.springbok.light,
    },
    // inline `code` in settings descriptions, chat and walkthroughs - kept off
    // the link colors to stay distinguishable from them
    preformat: {
      background: preformatBackground,
      foreground: isDark ? palette.springbok.light : palette.springbok.darkest,
    },
    // fenced blocks, same surface as inline code
    codeBlock: {
      background: preformatBackground,
    },
    blockQuote: {
      background: isDark ? palette.soil.darkest : palette.soil.xlight,
      // 5px left bar, needs to read against that surface
      border: isDark ? palette.springbok.light : palette.springbok.darker,
    },
    // hairline rules, rendered at 33% opacity in chat markdown
    separator: palette.soil.dark,

    /* -- Syntax -- */

    keywords: {
      default: isDark ? palette.springbok.light : palette.springbok.dark,
    },
    language: {
      constants: isDark ? language1Color.light : language1Color.dark,
    },
    types: {
      default: isDark ? type1Color.xlight : type1Color.darkestBright,
      primitives: isDark ? type1Color.xlight : type1Color.darkestBright,
      property: isDark ? type1Color.light : type1Color.darkest,
      inlayHint: (isDark ? type1Color.light : type1Color.darkestBright) + 'a0',
    },
    classes: {
      name: isDark ? palette.white.xlight : palette.black.darkest,
      // TextMate fallback for `entity.name.type.class`, where the semantic
      // `class` token is unavailable
      declaration: isDark ? palette.white.xlight : palette.black.light,
    },
    functions: {
      name: isDark ? palette.purple.xlight : palette.purple.dark,
      call: isDark ? palette.purple.xlight : palette.purple.dark,
      defaultLibrary: isDark ? language1Color.light : language1Color.dark,
      preprocessor: language2Color.light,
    },
    variables: {
      language: isDark ? palette.springbok.light : palette.springbok.dark,
      defaultLibrary: isDark ? language1Color.light : language1Color.darker,
    },
    imports: {
      name: isDark ? '#aaaabb' : palette.black.dark,
      alias: isDark ? '#ddddee' : palette.black.dark,
    },
    comments: {
      default: isDark ? palette.dim.dark : palette.dim.light,
      doc: '#6A8759',
      jsdocParameterName: '#629755',
    },
    values: {
      number: isDark ? palette.yellow.bright : palette.red.darkerBright,
      string: isDark ? palette.orange.bright : palette.orange.darkerBright,
      escape: isDark
        ? palette.springbok.bright
        : palette.springbok.darkerBright,
      stringInterpolation: isDark
        ? palette.springbok.bright
        : palette.springbok.darkerBright,
      regexp: isDark ? '#C365CA' : palette.yellow.darkest,
      regexpEscape: isDark ? '#e5bde8' : palette.red.dark,
      regexpGroup: isDark ? '#f0daf2' : palette.yellow.darkestBright,
    },
    // syntax inside a template expression or a JSX attribute embed
    embeddedExpression: isDark ? '#eeeeff' : '#111100',
    colorLiteral: isDark ? '#ffffff' : '#000000',
    propertyName: isDark ? palette.orange.dark : palette.orange.darkestBright,
    attributeName: isDark ? palette.yellow.light : palette.red.darker,
    tag: isDark ? palette.yellow.dark : palette.red.darkestBright,
    markdown: {
      heading: isDark ? palette.springbok.light : palette.springbok.dark,
      quote: isDark ? palette.magenta.dark : palette.magenta.darkestBright,
      listPunctuation: isDark
        ? palette.orange.dark
        : palette.orange.darkestBright,
    },
    css: {
      property: isDark ? palette.yellow.dark : palette.red.darkestBright,
    },
    dotenv: {
      property: isDark ? palette.orange.dark : palette.orange.darker,
      value: isDark ? palette.orange.bright : palette.orange.darkerBright,
    },
  };
};

export type Colors = ReturnType<typeof createColors>;
