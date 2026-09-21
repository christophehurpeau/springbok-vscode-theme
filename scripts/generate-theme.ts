import fs from 'node:fs';
import { createColors } from './theme/colors.ts';
import type { ThemeType } from './theme/palette.ts';
import { createPalette } from './theme/palette.ts';
import {
  createSemanticTokenColors,
  createTokenColors,
} from './theme/token-colors.ts';
import { createWorkbenchColors } from './theme/workbench.ts';

interface WriteThemeOptions {
  file: string;
  name: string;
  type: ThemeType;
}

const createTheme = ({ name, type }: Omit<WriteThemeOptions, 'file'>) => {
  const palette = createPalette(type);
  const colors = createColors(palette, type);

  return {
    name,
    type,
    semanticHighlighting: true,
    colors: createWorkbenchColors({ colors, palette, type }),
    semanticTokenColors: createSemanticTokenColors(colors),
    tokenColors: createTokenColors(colors),
  };
};

const writeTheme = ({ file, name, type }: WriteThemeOptions) => {
  fs.writeFileSync(
    new URL(`../themes/${file}`, import.meta.url),
    JSON.stringify(createTheme({ name, type }), null, 2),
  );
};

writeTheme({
  file: 'Springbok-dark-theme.json',
  name: 'Dark Springbok',
  type: 'dark',
});

// same as the dark theme, under the name the extension shipped with
writeTheme({
  file: 'Springbok-legacy-theme.json',
  name: 'Springbok Theme',
  type: 'dark',
});

writeTheme({
  file: 'Springbok-light-theme.json',
  name: 'Light Springbok',
  type: 'light',
});
