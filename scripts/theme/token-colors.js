/**
 * Syntax highlighting.
 *
 * `semanticTokenColors` wins over `tokenColors` where the language server
 * provides the token; `tokenColors` is the TextMate fallback.
 *
 * Note both spellings of the bold/italic styles below are deliberate and not
 * interchangeable: `bold: true` merges with whatever the TextMate rule already
 * set, `fontStyle` replaces it outright.
 */

export const createSemanticTokenColors = (colors) => ({
  // -- Values --
  enumMember: {
    fontStyle: 'bold italic',
  },
  'variable.constant': {
    bold: true,
  },

  // -- Types --
  type: {
    foreground: colors.types.default,
  },
  interface: {
    foreground: colors.types.default,
  },

  // -- Entities --
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

  // -- Variables --
  'variable.defaultLibrary': {
    foreground: colors.variables.defaultLibrary,
  },
  parameter: {
    italic: true,
  },
  '*.static': {
    bold: true,
  },
});

/**
 * Order is significant: the last rule that matches a scope wins.
 */
export const createTokenColors = (colors) => [
  // -- Values --
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
      foreground: colors.embeddedExpression,
    },
  },
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
  {
    scope: ['constant.language'],
    settings: {
      foreground: colors.language.constants,
    },
  },
  {
    scope: ['constant.other.color'],
    settings: {
      foreground: colors.colorLiteral,
    },
  },

  // -- Comments --
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

  // -- Keywords, storage, punctuation --
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

  // -- Entities --
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
      foreground: colors.classes.declaration,
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

  // -- Variables --
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
  {
    scope: ['meta.import variable.other.readwrite'],
    settings: {
      foreground: colors.imports.name,
    },
  },
  {
    scope: ['meta.import variable.other.readwrite.alias'],
    settings: {
      foreground: colors.imports.alias,
    },
  },

  // -- Types --
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

  // -- Tags, HTML and React --
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
      foreground: colors.embeddedExpression,
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

  // -- Json/Yaml/Css --
  {
    scope: ['support.type.property-name'],
    settings: {
      foreground: colors.propertyName,
    },
  },

  // -- dotenv --
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

  // -- Markdown --
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

  // -- Css --
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
];
