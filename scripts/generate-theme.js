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
    // medium: '#' + convert.hsl.hex([hsl[0], 65, 49]),
    light: '#' + convert.hsl.hex([hsl[0], 61, 56]),
    bright: '#' + convert.hsl.hex([hsl[0], 100, 45]),
    xlight: '#' + convert.hsl.hex([hsl[0], 61, 71]),
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

    light: '#D9CAC2',
    xlight: '#F6E7DE',
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

  black: {
    darkest: '#080808', //3%
    darker: '#1a1a1a', //10%
    dark: '#383838', // 22%
    light: '#797979', // 47%
    bright: '#a0a0a0', // 63%
  },
  dark: {
    darkest: '#181818', //9%
    darker: '#2f2f2f', //18%
    dark: '#474747', // 28%
    light: '#878787', // 53%
  },
  dim: {
    darkest: '#2f2f2f', //18%
    dark: '#707070', // 43%
    light: '#9f9f9f',
    xlight: '#e0e0e0',
  },
  white: { dark: '#D7D7D7', light: '#ebebeb', xlight: '#ffffff' },
};

const language1Color = palette.red;
const language2Color = palette.magenta;

const type1Color = palette.sky;
// const type2Color = palette.blue;

const createTheme = (name, type) => {
  const foregroundPalette = type === 'dark' ? palette.white : palette.black;

  const colors = {
    focus: palette.springbok.dark,
    error: palette.red.dark,
    warning: palette.yellow.dark,
    foreground: type === 'dark' ? palette.white.light : palette.black.dark,
    inactiveBackground:
      type === 'dark' ? palette.dim.darkest : palette.dim.light,
    inactiveForeground: type === 'dark' ? palette.dim.light : palette.dim.dark,

    quickInput: {
      background: type === 'dark' ? palette.dark.darkest : palette.white.xlight,
      foreground: type === 'dark' ? palette.dim.xlight : palette.dim.darkest,
    },

    panels: {
      background: type === 'dark' ? palette.dark.darkest : palette.white.xlight,
      foreground: type === 'dark' ? palette.dim.xlight : palette.dim.darkest,
      focusForeground:
        type === 'dark' ? palette.white.light : palette.black.dark,
      border: type === 'dark' ? palette.dark.darker : palette.dim.light,
      sideBarForeground:
        type === 'dark' ? palette.dark.light : palette.dim.dark,
    },

    editor: {
      background:
        type === 'dark' ? palette.black.darkest : palette.white.xlight,
      foreground: type === 'dark' ? palette.dim.xlight : palette.dim.dark,
      border: palette.dark.darker,
      lineHighlightBackground: type === 'dark' ? '#1d1d1d' : '#f0f0f0',
      wordHighlight:
        type === 'dark' ? palette.springbok.light : palette.soil.xlight,
    },

    selection: {
      background:
        (type === 'dark' ? palette.springbok.light : palette.soil.light) + '64',
      inactiveBackground:
        (type === 'dark' ? palette.springbok.light : palette.soil.light) + '32',
      hoverHighlightBackground:
        (type === 'dark' ? palette.springbok.light : palette.soil.light) + '96',
    },

    tabs: {
      background: type === 'dark' ? palette.dark.darkest : palette.white.xlight,
      activeTabBackground:
        type === 'dark' ? palette.dark.dark : palette.white.light,
    },

    editorGutter: {
      background: type === 'dark' ? palette.black.darker : palette.white.dark,
    },

    commandCenter: {
      background: type === 'dark' ? palette.dark.darker : palette.dim.light,
    },

    links: {
      default:
        type === 'dark' ? palette.springbok.dark : palette.springbok.light,
      active:
        type === 'dark' ? palette.springbok.light : palette.springbok.dark,
      editorActive:
        type === 'dark' ? palette.springbok.dark : palette.springbok.light,
    },
    buttons: {
      background: palette.springbok.darker,
      hoverBackground: palette.springbok.dark,
      foreground: palette.white.light,
    },
    keywords: {
      default:
        type === 'dark' ? palette.springbok.light : palette.springbok.dark,
    },
    language: {
      constants: language1Color.light,
    },
    types: {
      default: type === 'dark' ? type1Color.xlight : type1Color.light,
      primitives: type === 'dark' ? type1Color.xlight : type1Color.light,
      property: type === 'dark' ? type1Color.light : type1Color.dark,
    },
    classes: {
      name: type === 'dark' ? palette.white.xlight : palette.black.darkest,
      defaultLibrary:
        type === 'dark' ? language1Color.light : language1Color.dark,
    },
    functions: {
      name: type === 'dark' ? palette.purple.xlight : palette.purple.light,
      call: type === 'dark' ? palette.purple.xlight : palette.purple.light,
      defaultLibrary:
        type === 'dark' ? language1Color.light : language1Color.darker,
      preprocessor: language2Color.light,
    },
    variables: {
      language:
        type === 'dark' ? palette.springbok.light : palette.springbok.dark,
      defaultLibrary:
        type === 'dark' ? language1Color.light : language1Color.darker,
    },
    comments: {
      default: type === 'dark' ? palette.dim.dark : palette.dim.light,
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
    attributeName:
      type === 'dark' ? palette.yellow.light : palette.yellow.darker,
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

  return {
    name,
    type,
    semanticHighlighting: true,
    colors: {
      focusBorder: colors.focus,
      foreground: colors.foreground,
      errorForeground: colors.error,
      'selection.background': '#d3784780',
      'icon.foreground': colors.foreground,
      'scrollbar.shadow': type === 'dark' ? '#00000033' : '#55555533',

      'quickInput.background': colors.quickInput.background,
      'quickInput.foreground': colors.quickInput.foreground,
      'pickerGroup.foreground': palette.springbok.dark,

      'textLink.foreground': colors.links.default,
      'textLink.activeForeground': colors.links.active,
      'editorLink.activeForeground': colors.links.editorActive,
      'button.background': colors.buttons.background,
      'button.hoverBackground': colors.buttons.hoverBackground,
      'button.foreground': colors.buttons.foreground,
      'checkbox.background': palette.springbok.darker,

      'progressBar.background': palette.springbok.dark,

      'input.background': colors.panels.background,
      'input.border': colors.panels.border,
      'input.foreground': colors.panels.foreground,
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

      'list.activeSelectionForeground': colors.foreground,
      'list.activeSelectionBackground':
        type === 'dark' ? palette.springbok.darkest : palette.soil.xlight,
      'list.inactiveSelectionBackground':
        type === 'dark' ? palette.springbok.darkest : palette.soil.xlight,
      'list.dropBackground': palette.springbok.light,
      'list.focusBackground':
        type === 'dark' ? palette.springbok.darkest : palette.soil.xlight,
      'list.hoverBackground':
        type === 'dark' ? palette.soil.darkest : palette.soil.light,
      'list.inactiveFocusBackground':
        type === 'dark' ? palette.springbok.dark : palette.springbok.light,
      'list.filterMatchBackground': palette.red.dark,
      'list.highlightForeground': palette.red.dark,

      'gitDecoration.addedResourceForeground': palette.green.light,
      'gitDecoration.modifiedResourceForeground': palette.yellow.light,
      'gitDecoration.deletedResourceForeground': palette.red.light,
      'gitDecoration.untrackedResourceForeground': palette.green.dark,
      'gitDecoration.conflictingResourceForeground': palette.red.dark,
      // gitDecoration.ignoredResourceForeground
      // gitDecoration.submoduleResourceForeground
      'activityBar.background': colors.panels.background,
      'activityBar.foreground': colors.foreground,
      'activityBar.inactiveForeground': colors.inactiveForeground,
      'activityBar.border': colors.panels.border,
      'activityBar.activeBorder': palette.springbok.dark,
      'activityBar.dropBorder': palette.springbok.dark,
      'activityBarTop.background': colors.panels.background,
      'activityBarTop.foreground': colors.foreground,
      'activityBarTop.inactiveForeground': colors.inactiveForeground,
      'activityBarTop.activeBorder': palette.springbok.dark,
      'activityBarBadge.background': palette.springbok.dark,
      'activityBarBadge.foreground': palette.white.light,
      'activityErrorBadge.background': palette.red.dark,
      'activityErrorBadge.foreground': palette.white.light,
      'activityWarningBadge.background': colors.warning,
      'activityWarningBadge.foreground': palette.white.light,
      'titleBar.activeBackground': colors.panels.background,
      'titleBar.activeForeground': colors.panels.foreground,
      'titleBar.inactiveBackground': colors.inactiveBackground,
      'titleBar.inactiveForeground': colors.inactiveForeground,
      'titleBar.border': colors.panels.border,
      'menu.background': colors.panels.background,
      'menu.foreground': colors.panels.foreground,
      'menu.selectionBackground': '#552407',
      'menu.selectionForeground': colors.foreground,
      'menu.separatorBackground': '#2f2f2f',
      'commandCenter.foreground': colors.foreground,
      'commandCenter.background': colors.commandCenter.background,
      'commandCenter.border': colors.panels.border,
      'commandCenter.inactiveForeground': colors.inactiveForeground,
      'commandCenter.inactiveBorder': colors.panels.border,
      'commandCenter.debuggingBackground': '#8F100C90',
      'commandCenter.debuggingForeground': palette.white.light,
      'sideBar.background': colors.panels.background,
      'sideBar.foreground': colors.foreground,
      'sideBar.border': colors.panels.border,
      'sideBarTitle.background': colors.panels.background,
      'sideBarTitle.foreground': colors.panels.sideBarForeground,
      'sideBarSectionHeader.background': colors.panels.background,
      'sideBarSectionHeader.foreground': colors.panels.foreground,
      'panel.background': colors.panels.background,
      'panel.border': colors.panels.border,
      'panelTitle.activeBorder': palette.springbok.dark,
      'panelTitle.activeForeground': colors.foreground,
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
      'editor.selectionBackground': colors.selection.background,
      'editor.inactiveSelectionBackground': colors.selection.inactiveBackground,
      'editor.wordHighlightBackground': colors.editor.wordHighlight + '16',
      'editor.wordHighlightStrongBackground':
        colors.editor.wordHighlight + '32',
      'editor.hoverHighlightBackground':
        colors.selection.hoverHighlightBackground,
      'editor.findMatchBackground': type === 'dark' ? '#1d5042' : '#1d504241',
      'editor.findMatchHighlightBackground':
        type === 'dark' ? '#1e332d' : '#1e332d41',
      'editorUnnecessaryCode.opacity': '#000000c0',

      'editor.lineHighlightBackground': colors.editor.lineHighlightBackground,
      'editor.selectionHighlightBackground':
        type === 'dark' ? '#333837' : '#33383721',
      'editor.rangeHighlightBackground':
        type === 'dark' ? '#212423' : '#21242321',
      'editor.symbolHighlightBackground':
        type === 'dark' ? '#212423' : '#21242321',

      'editorGroupHeader.tabsBackground': colors.tabs.background,
      'tab.activeBackground': colors.tabs.activeTabBackground,
      'tab.activeForeground': colors.foreground,
      'tab.inactiveBackground': colors.inactiveBackground,
      'tab.inactiveForeground': colors.inactiveForeground,

      'editorGutter.background': colors.editorGutter.background,
      'editorGutter.modifiedBackground': palette.yellow.light,
      'editorGutter.addedBackground': palette.green.light,
      'editorGutter.deletedBackground': palette.red.light,
      'editorGutter.commentRangeForeground':
        type === 'dark' ? palette.dim.dark : palette.dim.light,

      'editorLineNumber.foreground':
        type === 'dark' ? palette.dim.dark : palette.dim.light,
      'editorLineNumber.activeForeground':
        type === 'dark' ? palette.white.light : palette.dark.dark,

      'editorInlayHint.background': palette.black.dark + '00', // 00 means 0% opacity (transparent)
      'editorInlayHint.foreground':
        (type === 'black' ? type1Color.xlight : type1Color.light) + 'a0', // palette.dim.light,

      'editorWhitespace.foreground': type === 'dark' ? '#414141' : '#dfdfdf',
      'editorBracketMatch.border': type === 'dark' ? '#eee' : '#444',
      'editorIndentGuide.activeBackground': '#B0BEC5A4',
      'diffEditor.insertedTextBackground': palette.green.light + '20',
      'diffEditor.removedTextBackground': palette.red.light + '20',

      'peekView.border': palette.springbok.darker,
      'peekViewTitle.background': '#531412',
      // same as editor but darker
      'peekViewEditor.background': type === 'dark' ? '#030303' : '#F3F3F3',
      // same as editor but darker
      'peekViewEditor.matchHighlightBackground':
        type === 'dark' ? '#14221e' : palette.soil.light,
      'peekViewResult.background':
        type === 'dark' ? '#0F0F0F' : colors.panels.background,
      'peekViewResult.matchHighlightBackground':
        type === 'dark' ? '#1e332d' : '#1e332d31',
      'peekViewResult.selectionBackground':
        type === 'dark' ? palette.springbok.darker : palette.soil.light,

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
      'terminal.ansiBlack': palette.black.light,
      'terminal.ansiRed': palette.red.light,
      'terminal.ansiGreen': palette.green.light,
      'terminal.ansiYellow': palette.yellow.light,
      'terminal.ansiBlue': palette.blue.light,
      'terminal.ansiMagenta': palette.magenta.light,
      'terminal.ansiCyan': palette.cyan.light,
      'terminal.ansiWhite': palette.white.dark,
      'terminal.ansiBrightBlack': palette.black.bright,
      'terminal.ansiBrightRed': palette.red.bright,
      'terminal.ansiBrightGreen': palette.green.bright,
      'terminal.ansiBrightYellow': palette.yellow.bright,
      'terminal.ansiBrightBlue': palette.blue.bright,
      'terminal.ansiBrightMagenta': palette.magenta.bright,
      'terminal.ansiBrightCyan': palette.cyan.bright,
      'terminal.ansiBrightWhite': palette.white.xlight,
      'terminal.selectionBackground': colors.selection.background,
      'terminal.inactiveSelectionBackground':
        colors.selection.inactiveBackground,
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
          foreground: type === 'dark' ? '#eeeeff' : '#111100',
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
          foreground: type === 'dark' ? '#ffffff' : '#000000',
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
          foreground: foregroundPalette.xlight,
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
          foreground: colors.foreground,
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
          foreground: colors.foreground,
        },
      },
      /* Variables: imports */
      {
        scope: ['meta.import variable.other.readwrite'],
        settings: {
          foreground: type === 'dark' ? '#aaaabb' : foregroundPalette.dark,
        },
      },
      {
        scope: ['meta.import variable.other.readwrite.alias'],
        settings: {
          foreground: type === 'dark' ? '#ddddee' : foregroundPalette.dark,
        },
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
          foreground: type === 'dark' ? '#eeeeff' : '#111100',
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
};

fs.writeFileSync(
  new URL('../themes/Springbok-dark-theme.json', import.meta.url),
  JSON.stringify(createTheme('Dark Springbok', 'dark'), null, 2),
);

fs.writeFileSync(
  new URL('../themes/Springbok-legacy-theme.json', import.meta.url),
  JSON.stringify(createTheme('Springbok Theme', 'dark'), null, 2),
);
fs.writeFileSync(
  new URL('../themes/Springbok-light-theme.json', import.meta.url),
  JSON.stringify(createTheme('Light Springbok', 'light'), null, 2),
);
