import fs from 'fs';

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
const palette = {
  springbok: {
    darkest: '#552407',
    darker: '#8F3C0C',
    dark: '#B55A26',
    light: '#D37947',
  },
  soil: {
    darkest: '#332c28',
    darker: '#564a43',
  },

  sky: {
    dark: '#2672b5',
    light: '#4691d2', // '#4b9ce3',
    xlight: '#8bb8e0',
  },
  purple: {
    dark: '#6b26b5',
    light: '#8a46d2',
    xlight: '#b48ae0',
  },

  black: { dark: '#383838', light: '#797979' },
  red: { darker: '#8e0f0b', dark: '#B52A26', light: '#E2504B' },
  green: { dark: '#26b52a', light: '#4dd852' },
  yellow: { dark: '#b5a226', light: '#dac84e' },
  blue: { dark: '#2653b5', light: '#5c88e7' },
  magenta: { dark: '#a51449', light: '#e5578b' },
  cyan: { dark: '#26a2b5', light: '#54cbdd' },
  white: { dark: '#D7D7D7', light: '#FFFFFF' },
};

const colors = {
  links: {
    default: palette.springbok.dark,
    active: palette.springbok.light,
  },
  buttons: {
    background: palette.springbok.darker,
    hoverBackground: palette.springbok.dark,
    foreground: '#eee',
  },
  keywords: {
    default: palette.springbok.light,
  },
  types: {
    default: palette.sky.xlight,
    primitives: palette.sky.xlight,
    property: palette.sky.light,
  },
  classes: {
    name: '#fff',
    defaultLibrary: palette.red.light,
  },
  functions: {
    name: palette.purple.xlight,
    call: palette.purple.xlight,
    defaultLibrary: palette.red.light,
  },
  variables: {
    language: palette.springbok.light,
  },
};

const theme = {
  name: 'Springbok Theme',
  type: 'dark',
  semanticHighlighting: true,
  colors: {
    focusBorder: '#724025',

    'selection.background': '#d3784780',

    'textLink.foreground': colors.links.default,
    'textLink.activeForeground': colors.links.active,
    'editorLink.activeForeground': palette.springbok.dark,
    'button.background': colors.buttons.background,
    'button.hoverBackground': colors.buttons.hoverBackground,
    'button.foreground': colors.buttons.foreground,
    'checkbox.background': palette.springbok.darker,

    'progressBar.background': palette.springbok.dark,

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

    'activityBar.activeBorder': palette.springbok.dark,
    'activityBar.dropBorder': palette.springbok.dark,
    'activityBarBadge.background': palette.springbok.dark,

    'sideBar.background': '#1f1f1f',
    'sideBar.foreground': '#cccccd',
    'sideBarSectionHeader.background': '#1f1f1f',
    'sideBarSectionHeader.foreground': '#aaaaaa',
    'sideBarTitle.foreground': '#999999',

    'editor.background': '#131313',
    'editor.foreground': '#cccccd',
    'editor.selectionBackground': '#F5A27326',
    'editor.inactiveSelectionBackground': '#363431',
    'editor.wordHighlightBackground': '#333837',
    'editor.wordHighlightStrongBackground': '#395550',
    'editor.hoverHighlightBackground': '#746b5f96',
    'editor.findMatchBackground': '#1d5042',
    'editor.findMatchHighlightBackground': '#1e332d',

    'editor.lineHighlightBackground': '#202020',
    'editor.selectionHighlightBackground': '#333837',
    'editor.rangeHighlightBackground': '#212423',
    'editor.symbolHighlightBackground': '#212423',

    'editorWhitespace.foreground': '#414141',
    'editorBracketMatch.border': '#eee',
    'editorIndentGuide.activeBackground': '#abababa4',

    'diffEditor.insertedTextBackground': '#143017',
    'diffEditor.removedTextBackground': '#531412',

    'peekView.border': palette.springbok.darker,
    'peekViewTitle.background': '#531412',
    // same as editor but darker
    'peekViewEditor.background': '#030303',
    // same as editor but darker
    'peekViewEditor.matchHighlightBackground': '#14221e',
    'peekViewResult.background': '#0F0F0F',
    'peekViewResult.matchHighlightBackground': '#1e332d',
    'peekViewResult.selectionBackground': palette.springbok.darker,

    'merge.currentHeaderBackground': '#0A7111',
    'merge.currentContentBackground': '#042706',
    'merge.incomingHeaderBackground': '#0C405B',
    'merge.incomingContentBackground': '#051a25',

    'statusBar.background': '#363636',
    'statusBar.noFolderBackground': '#717171',
    'statusBar.debuggingBackground': '#8F100C',
    'statusBarItem.remoteBackground': palette.springbok.darker,
    'statusBarItem.remoteForeground': '#FFF',

    'settings.modifiedItemIndicator': palette.springbok.dark,

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
    'terminal.ansiBrightWhite': palette.white.light,
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
      foreground: palette.red.light,
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
    // OK

    /* -- Values -- */

    /* Boolean */
    // Booleans are not always detected, also green is confusing with types
    // {
    //   "scope": ["constant.language.boolean"],
    //   "settings": {
    //     "foreground": "#26b52a"
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
        foreground: '#ecd400',
      },
    },

    /* String */
    {
      scope: 'string',
      settings: {
        foreground: '#ffa014',
      },
    },
    {
      name: 'Escape',
      scope: 'constant.character.escape',
      settings: {
        foreground: '#ff6a14',
      },
    },
    {
      name: 'String interpolation',
      scope: ['punctuation.definition.template-expression'],
      settings: {
        foreground: '#ff6a14',
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
        foreground: '#C365CA',
      },
    },
    {
      name: 'Regex Character Class + Escape',
      scope: 'constant.character.escape.backslash.regexp',
      settings: {
        foreground: '#e5bde8',
      },
    },
    {
      name: 'Regex Group/Set',
      scope: [
        'punctuation.definition.group.regexp',
        'punctuation.definition.character-class.regexp',
      ],
      settings: {
        foreground: '#f0daf2',
      },
    },

    /* Language */
    {
      scope: ['constant.language'],
      settings: {
        foreground: palette.red.light,
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
        foreground: '#707070',
      },
    },
    {
      name: 'Comment Documentation',
      scope: ['comment.block.documentation'],
      settings: {
        foreground: '#6A8759',
      },
    },
    {
      name: 'JsDoc',
      scope: [
        'storage.type.class.jsdoc',
        'punctuation.definition.block.tag.jsdoc',
      ],
      settings: {
        foreground: '#6A8759',
        fontStyle: 'bold underline',
      },
    },
    {
      name: 'JsDoc Parameter name',
      scope: 'variable.other.jsdoc',
      settings: {
        foreground: '#629755',
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

    {
      scope: ['punctuation.definition.block'],
      settings: {
        foreground: '#D7D7D7',
        fontStyle: '',
      },
    },

    /* -- Entities -- */
    {
      name: 'Attributes',
      scope: ['entity.other.attribute-name'],
      settings: {
        foreground: '#dac84e',
      },
    },

    {
      name: 'Keys',
      scope: ['meta.object-literal.key'],
      settings: {
        foreground: '#B57E26',
      },
    },

    {
      scope: ['entity.name.function.preprocessor'],
      settings: {
        foreground: '#a51449',
        fontStyle: 'bold',
      },
    },

    {
      scope: ['entity.name.type.class'],
      settings: {
        foreground: '#fff',
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
        foreground: '#d7d7ee',
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
        foreground: '#ccccdd',
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
        foreground: '#b5a226',
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
        foreground: '#ff6a14',
      },
    },

    /* -- Json/Yaml/Css -- */
    {
      scope: ['support.type.property-name'],
      settings: {
        foreground: '#B57E26',
      },
    },

    /* -- dotenv -- */
    {
      scope: ['variable.other.env'],
      settings: {
        foreground: '#B57E26',
      },
    },
    {
      scope: ['source.env'],
      settings: {
        foreground: '#FFA014',
      },
    },

    /* -- Markdown -- */
    {
      scope: ['markup.heading'],
      settings: {
        foreground: '#D37947',
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
        foreground: '#a51449',
      },
    },
    {
      scope: ['markup.list punctuation.definition.list.begin'],
      settings: {
        foreground: '#B57E26',
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
        foreground: '#b5a226',
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
