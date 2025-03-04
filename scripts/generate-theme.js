import fs from 'fs';
import convert from 'color-convert';

/**
 * SL (from HSL)
 *
 * Type 1:
 * darkest: 85%, 18%
 * darker: 85%, 30%
 * dark: 65%, 43%
 * light: 61%, 55%
 * xlight: 58%, 71%
 *
 * Type 2:
 * darkest: 12%, 18%
 * darker: 12%, 30%
 * dark: 10%, 43% ? might keep 12
 * dark: 8%, 55% ? might keep 12
 */

const createPaletteColor = (color, h) => {
  const hsl = convert.hex.hsl(color);
  if (hsl[0] !== h) throw new Error('Color h must be ' + hsl[0]);
  if (hsl[1] !== 65) throw new Error('Color s must be 65%');
  if (hsl[2] !== 43) throw new Error('Color l must be 43%');

  return {
    darkest: '#' + convert.hsl.hex([hsl[0], 85, 18]),
    darker: '#' + convert.hsl.hex([hsl[0], 85, 30]),
    dark: color,
    light: '#' + convert.hsl.hex([hsl[0], 61, 55]),
    bright: '#' + convert.hsl.hex([hsl[0], 100, 46]),
    xlight: '#' + convert.hsl.hex([hsl[0], 58, 71]),
  };
};

const palette = {
  // springbok h: 22°
  springbok: {
    darkest: '#552407',
    darker: '#8F3C0C',
    dark: '#B55A26',
    light: '#D37947',
  },

  // h: 22%
  soil: {
    darkest: '#332c28', // 22°, 12%, 18%
    darker: '#564a43', // 22°, 12%, 30%
  },

  // ainsi
  red: createPaletteColor('#b52a26', 2),
  green: createPaletteColor('#26b52a', 122),
  yellow: createPaletteColor('#b5a726', 54),
  blue: createPaletteColor('#2653b5', 221),
  magenta: createPaletteColor('#b526a2', 308),
  cyan: createPaletteColor('#26a2b5', 188),

  // additional
  sky: createPaletteColor('#2672b5', 208),
  purple: createPaletteColor('#6b26b5', 269),
  orange: createPaletteColor('#b57c26', 36),

  black: {
    darkest: '#080808', //3%
    darker: '#1a1a1a', //10%
    dark: '#383838', // 22%
    light: '#797979', // 47%
  },
  dark: {
    darkest: '#181818', //9%
    darker: '#2f2f2f', //18%
    dark: '#474747', // 28%
    light: '#878787', // 53%
  },
  dim: { dark: '#707070', light: '#9f9f9f', xlight: '#e0e0e0' },
  white: { dark: '#D7D7D7', light: '#ebebeb', xlight: '#ffffff' },
};

const colors = {
  focus: palette.springbok.dark,
  error: palette.red.dark,
  warning: palette.yellow.dark,
  inactiveForeground: palette.dim.light,

  panels: {
    background: palette.dark.darkest,
    foreground: palette.dim.xlight,
    focusForeground: palette.white.light,
    border: palette.dark.darker,
  },

  editor: {
    background: palette.black.darkest,
    foreground: palette.dim.xlight,
    border: palette.dark.darker,
  },

  links: {
    default: palette.springbok.dark,
    active: palette.springbok.light,
  },
  buttons: {
    background: palette.springbok.darker,
    hoverBackground: palette.springbok.dark,
    foreground: palette.white.light,
  },
  keywords: {
    default: palette.springbok.light,
  },
  language: {
    constants: palette.red.light,
  },
  types: {
    default: palette.sky.xlight,
    primitives: palette.sky.xlight,
    property: palette.sky.light,
  },
  classes: {
    name: palette.white.xlight,
    defaultLibrary: palette.red.light,
  },
  functions: {
    name: palette.purple.xlight,
    call: palette.purple.xlight,
    defaultLibrary: palette.red.light,
    preprocessor: palette.magenta.bright,
  },
  variables: {
    language: palette.springbok.light,
    defaultLibrary: palette.red.light,
  },
  comments: {
    default: palette.dim.dark,
    doc: '#6A8759',
    jsdocParameterName: '#629755',
  },

  values: {
    number: palette.yellow.bright,
    string: palette.orange.bright,
    escape: '#ff6a14',
    stringInterpolation: '#ff6a14',
    regexp: '#C365CA',
    regexpEscape: '#e5bde8',
    regexpGroup: '#f0daf2',
  },
  propertyName: '#B57E26',
  attributeName: palette.yellow.light,
  tag: palette.yellow.dark,
  markdown: {
    heading: '#D37947',
    quote: palette.magenta.dark,
    listPunctuation: '#B57E26',
  },
  css: {
    property: palette.yellow.dark,
  },
  dotenv: {
    property: '#B57E26',
    value: '#FFA014',
  },
};

const theme = {
  name: 'Springbok Theme',
  type: 'dark',
  semanticHighlighting: true,
  colors: {
    focusBorder: colors.focus,
    foreground: palette.white.light,
    errorForeground: colors.error,
    'selection.background': '#d3784780',
    'icon.foreground': palette.white.light,

    'textLink.foreground': colors.links.default,
    'textLink.activeForeground': colors.links.active,
    'editorLink.activeForeground': palette.springbok.dark,
    'button.background': colors.buttons.background,
    'button.hoverBackground': colors.buttons.hoverBackground,
    'button.foreground': colors.buttons.foreground,
    'checkbox.background': palette.springbok.darker,

    'progressBar.background': palette.springbok.dark,

    'inputOption.activeBorder': palette.springbok.dark,
    'inputOption.activeBackground': palette.springbok.dark,
    'inputOption.activeForeground': palette.white.light,
    'inputOption.hoverBackground': '#332c28',
    'inputValidation.errorBorder': palette.red.dark,
    'inputValidation.errorBackground': palette.red.dark,
    'inputValidation.errorForeground': palette.white.light,
    'inputValidation.infoBorder': palette.blue.dark,
    'inputValidation.infoBackground': palette.blue.dark,
    'inputValidation.infoForeground': palette.white.light,
    'inputValidation.warningBorder': colors.warning,
    'inputValidation.warningBackground': colors.warning,
    'inputValidation.warningForeground': palette.white.light,
    'badge.background': palette.springbok.dark,
    'badge.foreground': palette.white.light,

    'list.activeSelectionBackground': palette.springbok.darkest,
    'list.inactiveSelectionBackground': palette.springbok.darkest,
    'list.dropBackground': palette.springbok.light,
    'list.focusBackground': palette.springbok.darkest,
    'list.hoverBackground': palette.soil.darkest,
    'list.inactiveFocusBackground': palette.springbok.dark,
    'list.filterMatchBackground': palette.red.dark,
    'list.highlightForeground': palette.red.dark,

    'gitDecoration.addedResourceForeground': palette.green.light,
    'gitDecoration.modifiedResourceForeground': palette.yellow.light,
    'gitDecoration.deletedResourceForeground': palette.red.light,
    'gitDecoration.untrackedResourceForeground': palette.green.dark,
    'gitDecoration.conflictingResourceForeground': palette.red.dark,
    // gitDecoration.ignoredResourceForeground
    // gitDecoration.submoduleResourceForeground

    'activityBar.background': '#181818',
    'activityBar.foreground': palette.white.light,
    'activityBar.inactiveForeground': colors.inactiveForeground,
    'activityBar.activeBorder': palette.springbok.dark,
    'activityBar.dropBorder': palette.springbok.dark,
    'activityBarTop.background': '#181818',
    'activityBarTop.foreground': palette.white.light,
    'activityBarTop.inactiveForeground': colors.inactiveForeground,
    'activityBarTop.activeBorder': palette.springbok.dark,
    'activityBarBadge.background': palette.springbok.dark,
    'activityBarBadge.foreground': palette.white.light,
    'activityErrorBadge.foreground': palette.white.light,
    'activityErrorBadge.background': palette.red.dark,
    'activityWarningBadge.foreground': palette.white.light,
    'activityWarningBadge.background': colors.warning,
    'titleBar.activeBackground': '#181818',
    'titleBar.activeForeground': palette.dim.xlight,
    'titleBar.inactiveBackground': '#2f2f2f',
    'titleBar.inactiveForeground': colors.inactiveForeground,
    'titleBar.border': colors.panels.border,
    'menu.background': '#181818',
    'menu.foreground': palette.dim.xlight,
    'menu.selectionBackground': '#552407',
    'menu.selectionForeground': palette.white.light,
    'menu.separatorBackground': '#2f2f2f',
    'commandCenter.foreground': palette.white.light,
    'commandCenter.background': '#2f2f2f',
    'commandCenter.border': colors.panels.border,
    'commandCenter.inactiveForeground': colors.inactiveForeground,
    'commandCenter.inactiveBorder': colors.panels.border,
    'commandCenter.debuggingBackground': '#8F100C90',
    'sideBar.background': '#181818',
    'sideBar.foreground': palette.white.light,
    'sideBar.border': colors.panels.border,
    'sideBarTitle.background': colors.panels.background,
    'sideBarSectionHeader.background': colors.panels.background,
    'sideBarSectionHeader.foreground': colors.panels.foreground,
    'sideBarTitle.foreground': palette.dark.light,
    'panel.background': colors.panels.background,
    'panel.border': colors.panels.border,
    'panelTitle.activeBorder': palette.springbok.dark,
    'panelTitle.activeForeground': palette.white.light,
    'panelTitle.inactiveForeground': colors.inactiveForeground,
    'panelSection.border': colors.panels.border,
    'keybindingLabel.background': '#51515180',
    'keybindingLabel.foreground': palette.dim.xlight,
    'keybindingLabel.border': '#81818180',
    'keybindingLabel.bottomBorder': '#41414190',
    'sideBySideEditor.horizontalBorder': colors.panels.border,
    'sideBySideEditor.verticalBorder': colors.panels.border,
    'breadcrumb.background': colors.panels.background,
    'breadcrumb.foreground': colors.panels.foreground,
    'breadcrumb.focusForeground': colors.panels.focusForeground,
    'breadcrumb.activeSelectionForeground': colors.panels.focusForeground,
    'breadcrumbPicker.background': colors.panels.background,
    'editorGroup.border': colors.editor.border,
    'outputView.background': colors.editor.background,
    'editor.background': colors.editor.background,
    'editor.foreground': colors.editor.foreground,
    'editor.selectionBackground': '#f5a37331',
    'editor.inactiveSelectionBackground': '#363431',
    'editor.wordHighlightBackground': '#333837',
    'editor.wordHighlightStrongBackground': '#395550',
    'editor.hoverHighlightBackground': '#746b5f96',
    'editor.findMatchBackground': '#1d5042',
    'editor.findMatchHighlightBackground': '#1e332d',

    'editor.lineHighlightBackground': '#1d1d1d',
    'editor.selectionHighlightBackground': '#333837',
    'editor.rangeHighlightBackground': '#212423',
    'editor.symbolHighlightBackground': '#212423',

    'editorGutter.background': '#1a1a1a',
    'editorGutter.modifiedBackground': palette.yellow.light,
    'editorGutter.addedBackground': palette.green.light,
    'editorGutter.deletedBackground': palette.red.light,
    'editorGutter.commentRangeForeground': palette.dim.dark,

    'editorInlayHint.background': '#1a1a1a', // palette.sky.darkest, // '#2f2f2f',
    'editorInlayHint.foreground': palette.sky.dark, // palette.dim.light,

    'editorWhitespace.foreground': '#414141',
    'editorBracketMatch.border': '#eee',
    'editorIndentGuide.activeBackground': '#B0BEC5A4',
    'diffEditor.insertedTextBackground': palette.green.light + '20',
    'diffEditor.removedTextBackground': palette.red.light + '20',

    'peekView.border': palette.springbok.darker,
    'peekViewTitle.background': '#531412',
    // same as editor but darker
    'peekViewEditor.background': '#030303',
    // same as editor but darker
    'peekViewEditor.matchHighlightBackground': '#14221e',
    'peekViewResult.background': '#0F0F0F',
    'peekViewResult.matchHighlightBackground': '#1e332d',
    'peekViewResult.selectionBackground': palette.springbok.darker,

    'merge.currentHeaderBackground': palette.cyan.dark + '90',
    'merge.currentContentBackground': palette.cyan.dark + '60',
    'merge.incomingHeaderBackground': palette.blue.dark + '90',
    'merge.incomingContentBackground': palette.blue.dark + '60',
    'merge.commonHeaderBackground': palette.yellow.dark + '90',
    'merge.commonContentBackground': palette.yellow.dark + '60',

    'statusBar.background': '#1a1a1a',
    'statusBar.foreground': palette.dim.xlight,
    'statusBar.border': '#2f2f2f',
    'statusBar.noFolderBackground': '#717171',
    'statusBar.debuggingBackground': '#8F100C',
    'statusBarItem.remoteBackground': palette.springbok.darker,
    'statusBarItem.remoteForeground': palette.yellow.light,

    'settings.modifiedItemIndicator': palette.yellow.light,

    'terminal.background': '#000000',
    'terminal.foreground': '#F5F5F5',
    'terminal.ansiBlack': palette.black.dark,
    'terminal.ansiRed': palette.red.dark,
    'terminal.ansiGreen': palette.green.dark,
    'terminal.ansiYellow': palette.yellow.dark,
    'terminal.ansiBlue': palette.blue.dark,
    'terminal.ansiMagenta': palette.magenta.dark,
    'terminal.ansiCyan': palette.cyan.dark,
    'terminal.ansiWhite': palette.white.dark,
    'terminal.ansiBrightBlack': palette.black.light,
    'terminal.ansiBrightRed': palette.red.light,
    'terminal.ansiBrightGreen': palette.green.light,
    'terminal.ansiBrightYellow': palette.yellow.light,
    'terminal.ansiBrightBlue': palette.blue.light,
    'terminal.ansiBrightMagenta': palette.magenta.light,
    'terminal.ansiBrightCyan': palette.cyan.light,
    'terminal.ansiBrightWhite': palette.white.xlight,
    'terminal.selectionBackground': '#F5A27326',
    'terminal.inactiveSelectionBackground': '#363431',
  },
  semanticTokenColors: {
    /* -- Values -- */
    enumMember: {
      fontStyle: 'bold italic',
    },
    'variable.constant': {
      bold: true,
    },
    /* -- Types -- */
    type: {
      foreground: colors.types.default,
    },
    interface: {
      foreground: colors.types.default,
    },
    /* -- Entities -- */
    class: {
      foreground: colors.classes.name,
      bold: true,
    },
    'class.defaultLibrary': {
      foreground: colors.classes.name,
      fontStyle: 'bold',
    },
    function: {
      foreground: colors.functions.name,
    },
    'function.defaultLibrary': {
      foreground: colors.functions.defaultLibrary,
      fontStyle: 'bold',
    },
    /* -- Variables -- */
    'variable.defaultLibrary': {
      foreground: colors.variables.defaultLibrary,
    },
    // "variable.local": {
    //   "foreground": "#be5555"
    // },
    // "function.local": {
    //   "foreground": "#be6a55"
    // },
    parameter: {
      italic: true,
    },
    '*.static': {
      bold: true,
    },
  },
  tokenColors: [
    /* -- Values -- */

    /* Boolean */
    // Booleans are not always detected, also green is confusing with types
    // {
    //   "scope": ["constant.language.boolean"],
    //   "settings": {
    //     "foreground": palette.green.dark
    //   }
    // },

    /* Numeric */
    {
      scope: [
        'constant.numeric',
        'constant.numeric keyword.other.unit',
        'constant.other.timestamp',
      ],
      settings: {
        foreground: colors.values.number,
      },
    },

    /* String */
    {
      scope: 'string',
      settings: {
        foreground: colors.values.string,
      },
    },
    {
      name: 'Escape',
      scope: 'constant.character.escape',
      settings: {
        foreground: colors.values.escape,
      },
    },
    {
      name: 'String interpolation',
      scope: ['punctuation.definition.template-expression'],
      settings: {
        foreground: colors.values.stringInterpolation,
      },
    },
    {
      scope: 'meta.template.expression',
      settings: {
        foreground: '#eeeeff',
      },
    },

    /* Regexp */
    {
      scope: 'string.regexp',
      settings: {
        foreground: colors.values.regexp,
      },
    },
    {
      name: 'Regex Character Class + Escape',
      scope: 'constant.character.escape.backslash.regexp',
      settings: {
        foreground: colors.values.regexpEscape,
      },
    },
    {
      name: 'Regex Group/Set',
      scope: [
        'punctuation.definition.group.regexp',
        'punctuation.definition.character-class.regexp',
      ],
      settings: {
        foreground: colors.values.regexpGroup,
      },
    },

    /* Language */
    {
      scope: ['constant.language'],
      settings: {
        foreground: colors.language.constants,
      },
    },

    /* Colors */
    {
      scope: ['constant.other.color'],
      settings: {
        foreground: '#ffffff',
      },
    },

    /* -- Comment -- */
    {
      name: 'Comment',
      scope: ['comment', 'comment.block'],
      settings: {
        foreground: colors.comments.default,
      },
    },
    {
      name: 'Comment Documentation',
      scope: ['comment.block.documentation'],
      settings: {
        foreground: colors.comments.doc,
      },
    },
    {
      name: 'JsDoc',
      scope: [
        'storage.type.class.jsdoc',
        'punctuation.definition.block.tag.jsdoc',
      ],
      settings: {
        foreground: colors.comments.doc,
        fontStyle: 'bold underline',
      },
    },
    {
      name: 'JsDoc Parameter name',
      scope: 'variable.other.jsdoc',
      settings: {
        foreground: colors.comments.jsdocParameterName,
        fontStyle: 'italic',
      },
    },

    /* -- Keywords, Storage, Punctuation -- */
    {
      scope: ['storage.type', 'storage.modifier'],
      settings: {
        foreground: colors.keywords.default,
        fontStyle: 'bold',
      },
    },
    {
      scope: ['storage.modifier'],
      settings: {
        fontStyle: 'bold italic',
      },
    },

    {
      scope: [
        'keyword',
        'keyword.operator',
        'keyword.operator.new',
        'keyword.operator.expression',
        'keyword.operator.cast',
        'keyword.operator.sizeof',
        'keyword.operator.logical.python',
        'keyword.control',
      ],
      settings: {
        foreground: colors.keywords.default,
      },
    },

    /* -- Entities -- */
    {
      name: 'Attributes',
      scope: ['entity.other.attribute-name'],
      settings: {
        foreground: colors.attributeName,
      },
    },

    {
      name: 'Keys',
      scope: ['meta.object-literal.key'],
      settings: {
        foreground: colors.propertyName,
      },
    },

    {
      scope: ['entity.name.function.preprocessor'],
      settings: {
        foreground: colors.functions.preprocessor,
        fontStyle: 'bold',
      },
    },

    {
      scope: ['entity.name.type.class'],
      settings: {
        foreground: palette.white.xlight,
        fontStyle: 'bold',
      },
    },

    {
      scope: ['entity.name.function'],
      settings: {
        foreground: colors.functions.name,
        fontStyle: 'bold',
      },
    },

    /* -- Variables -- */
    {
      name: 'Language',
      scope: ['variable.language'],
      settings: {
        foreground: colors.variables.language,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Parameter',
      scope: ['variable.parameter'],
      settings: {
        foreground: palette.white.light,
        fontStyle: 'italic',
      },
    },
    {
      scope: ['variable.other.enummember'],
      settings: {
        foreground: colors.types.property,
        fontStyle: 'bold italic',
      },
    },
    {
      name: 'Variable',
      scope: [
        'entity.name.variable',
        'meta.definition.variable',
        'variable.object.property',
      ],
      settings: {
        foreground: palette.white.light,
      },
    },
    /* Variables: imports */
    {
      scope: ['meta.import variable.other.readwrite'],
      settings: { foreground: '#aaaabb' },
    },
    {
      scope: ['meta.import variable.other.readwrite.alias'],
      settings: { foreground: '#ddddee' },
    },

    /* -- Types -- */
    {
      scope: ['entity.name.type'],
      settings: {
        foreground: colors.types.default,
      },
    },

    {
      scope: ['meta.definition.property'],
      settings: {
        foreground: colors.types.property,
      },
    },
    // {
    //   "scope": [
    //     // "storage.type.interface",
    //     // "storage.type.type",
    //     // "storage.type.built-in",
    //     // "meta.interface storage.modifier",
    //     // "keyword.operator.expression.typeof",
    //     // "keyword.operator.expression.keyof",
    //     // "keyword.control.as"
    //   ],
    //   "settings": {
    //     "foreground": colors.types,
    //     "fontStyle": "bold"
    //   }
    // },
    // {
    //   "scope": [
    //     "meta.interface",
    //     "meta.type.declaration",
    //     "meta.type.annotation",
    //     "meta.interface meta.definition.property",
    //     "meta.return.type"
    //   ],
    //   "settings": {
    //     "foreground": colors.types
    //   }
    // },
    // {
    //   "scope": "entity.name.type.enum",
    //   "settings": {
    //     "foreground": "#ddddee",
    //     "fontStyle": "bold"
    //   }
    // },
    // {
    //   "scope": "entity.name.type.module",
    //   "settings": {
    //     "foreground": "#ddddee"
    //   }
    // },
    {
      scope: [
        'support.type.builtin',
        'support.type.primitive',
        'storage.type.built-in',
      ],
      settings: {
        foreground: colors.types.primitives,
        fontStyle: 'bold',
      },
    },

    /* -- Tag, Html and React -- */
    {
      scope: ['punctuation.definition.tag', 'entity.name.tag'],
      settings: {
        foreground: colors.tag,
      },
    },
    {
      scope: 'support.class.component',
      settings: {
        fontStyle: 'bold',
      },
    },
    {
      scope: ['meta.tag.attributes punctuation.section.embedded'],
      settings: {
        foreground: '#eeeeff',
      },
    },
    {
      name: 'String interpolation',
      scope: [
        'meta.jsx.children punctuation.section.embedded',
        'meta.tag.attributes meta.jsx.children punctuation.section.embedded',
      ],
      settings: {
        foreground: colors.values.stringInterpolation,
      },
    },

    /* -- Json/Yaml/Css -- */
    {
      scope: ['support.type.property-name'],
      settings: {
        foreground: colors.propertyName,
      },
    },

    /* -- dotenv -- */
    {
      scope: ['variable.other.env'],
      settings: {
        foreground: colors.dotenv.property,
      },
    },
    {
      scope: ['source.env'],
      settings: {
        foreground: colors.dotenv.value,
      },
    },

    /* -- Markdown -- */
    {
      scope: ['markup.heading'],
      settings: {
        foreground: colors.markdown.heading,
        fontStyle: 'bold',
      },
    },
    {
      scope: ['markup.underline'],
      settings: {
        fontStyle: 'underline',
      },
    },
    {
      scope: ['markup.bold'],
      settings: {
        fontStyle: 'bold',
      },
    },
    {
      scope: ['markup.italic'],
      settings: {
        fontStyle: 'italic',
      },
    },
    {
      scope: ['markup.underline.link'],
      settings: {
        foreground: colors.links.default,
      },
    },
    {
      scope: ['markup.quote'],
      settings: {
        foreground: colors.markdown.quote,
      },
    },
    {
      scope: ['markup.list punctuation.definition.list.begin'],
      settings: {
        foreground: colors.markdown.listPunctuation,
        fontStyle: 'bold',
      },
    },

    /* -- Css -- */
    {
      scope: ['source.css entity.other.attribute-name.id'],
      settings: {
        fontStyle: 'bold',
      },
    },
    {
      scope: ['source.css entity.name.tag'],
      settings: {
        foreground: colors.css.property,
        fontStyle: 'bold',
      },
    },
    {
      scope: ['source.css support.function'],
      settings: {
        foreground: colors.functions.call,
      },
    },
  ],
};

fs.writeFileSync(
  new URL('../themes/SpringbokTheme-color-theme.json', import.meta.url),
  JSON.stringify(theme, null, 2),
);
