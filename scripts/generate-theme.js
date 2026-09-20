import fs from 'fs';
import { createPalette } from './theme/palette.js';
import { createColors } from './theme/colors.js';
import { createWorkbenchColors } from './theme/workbench.js';
import {
  createSemanticTokenColors,
  createTokenColors,
} from './theme/token-colors.js';

const createTheme = (name, type) => {
  const palette = createPalette(type);
  const colors = createColors(palette, type);

  return {
    name,
    type,
    semanticHighlighting: true,
    colors: createWorkbenchColors(colors, palette, type),
    semanticTokenColors: createSemanticTokenColors(colors),
    tokenColors: createTokenColors(colors),
  };
};

/**
 * A typo in a palette key yields `undefined`, which `JSON.stringify` drops
 * silently - the token then falls back to the built-in VS Code theme. Report
 * those instead of shipping them.
 */
const warnOnUndefined = (value, path = []) => {
  if (value === undefined) {
    console.warn(`undefined value at ${path.join('.')}`);
    return;
  }
  if (value !== null && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      warnOnUndefined(child, [...path, key]);
    }
  }
};

const writeTheme = (file, name, type) => {
  const theme = createTheme(name, type);
  warnOnUndefined(theme, [file]);
  fs.writeFileSync(
    new URL(`../themes/${file}`, import.meta.url),
    JSON.stringify(theme, null, 2),
  );
};

writeTheme('Springbok-dark-theme.json', 'Dark Springbok', 'dark');
// same as the dark theme, under the name the extension shipped with
writeTheme('Springbok-legacy-theme.json', 'Springbok Theme', 'dark');
writeTheme('Springbok-light-theme.json', 'Light Springbok', 'light');
