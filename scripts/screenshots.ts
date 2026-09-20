/**
 * Screenshots of the themes, taken in a real VS Code workbench.
 *
 * `code serve-web` runs VS Code with a full node extension host, so the shots
 * include what a static highlighter cannot reproduce: semantic tokens (italic
 * parameters, bold classes, struck-through deprecated symbols), the workbench
 * chrome, the terminal palette and the editor decorations.
 *
 * Requires the `code` CLI on the PATH and the playwright chromium build
 * (`npx playwright install chromium`).
 *
 * Shots are the cartesian product of themes x uis x layouts x files:
 *
 *   node scripts/screenshots.ts
 *   node scripts/screenshots.ts --themes dark --layouts full --files python
 *   node scripts/screenshots.ts --uis modern --layouts ide
 *   node scripts/screenshots.ts --list
 */

import { spawn, type ChildProcess } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, type Page } from 'playwright';

const root = fileURLToPath(new URL('..', import.meta.url));
const port = Number(process.env.SCREENSHOTS_PORT ?? 9777);

const themes = {
  dark: 'Dark Springbok',
  light: 'Light Springbok',
  legacy: 'Springbok Theme',
};

const files = {
  typescript: 'examples/typescript.ts',
  react: 'examples/react.tsx',
  javascript: 'examples/javascript.js',
  python: 'examples/python.py',
  markdown: 'examples/markdown.md',
  'markdown-full': 'examples/full-md.md',
  css: 'examples/css.css',
  html: 'examples/html.html',
  json: 'examples/json.json',
  yaml: 'examples/yaml.yml',
  php: 'examples/php.php',
  arduino: 'examples/arduino.ino',
  conflict: 'examples/conflict.ts',
};

interface Layout {
  /** Screenshotted area: the editor group alone, or the whole window. */
  capture: 'editor' | 'workbench';
  sideBar: boolean;
  secondarySideBar: boolean;
  /** Opens the panel on a terminal running scripts/colors.sh. */
  terminal: boolean;
}

const layouts = {
  editor: {
    capture: 'editor',
    sideBar: false,
    secondarySideBar: false,
    terminal: false,
  },
  ide: {
    capture: 'workbench',
    sideBar: true,
    secondarySideBar: false,
    terminal: false,
  },
  full: {
    capture: 'workbench',
    sideBar: true,
    secondarySideBar: false,
    terminal: true,
  },
  chat: {
    capture: 'workbench',
    sideBar: true,
    secondarySideBar: true,
    terminal: true,
  },
} satisfies Record<string, Layout>;

/**
 * `modern` turns on `workbench.experimental.modernUI`, the shell the theme only
 * sets surfaces for, so its shots show what the modern tabs, activity bar and
 * cards inherit.
 */
const uis = {
  classic: false,
  modern: true,
};

type ThemeKey = keyof typeof themes;
type UiKey = keyof typeof uis;
type LayoutKey = keyof typeof layouts;
type FileKey = keyof typeof files;

interface Shot {
  theme: ThemeKey;
  ui: UiKey;
  layout: LayoutKey;
  file: FileKey;
}

interface MatrixEntry {
  themes: ThemeKey[];
  uis: UiKey[];
  layouts: LayoutKey[];
  files: FileKey[];
}

/** Generated when no --themes/--uis/--layouts/--files is given. */
const defaultMatrix: MatrixEntry[] = [
  {
    themes: ['dark', 'light'],
    uis: ['classic', 'modern'],
    layouts: ['full'],
    files: ['typescript'],
  },
  {
    themes: ['dark', 'light'],
    uis: ['classic'],
    layouts: ['editor'],
    files: ['typescript', 'python', 'markdown'],
  },
];

/**
 * The terminal shows the themed ANSI palette: the profile runs colors.sh and
 * then hands over to a bare shell, so nothing has to be typed into it.
 */
const terminalProfile = {
  screenshots: {
    path: '/bin/bash',
    args: [
      '--norc',
      '--noprofile',
      '-c',
      'bash scripts/colors.sh; exec /bin/bash --norc --noprofile',
    ],
  },
};

interface SettingsOptions {
  theme: string;
  modernUI: boolean;
}

const settingsFor = ({
  theme,
  modernUI,
}: SettingsOptions): Record<string, unknown> => ({
  'workbench.colorTheme': theme,
  'workbench.experimental.modernUI': modernUI,
  'editor.scrollBeyondLastLine': false,
  'security.workspace.trust.enabled': false,
  'editor.fontSize': 13,
  'editor.lineHeight': 20,
  'editor.minimap.enabled': false,
  'editor.renderWhitespace': 'boundary',
  'editor.stickyScroll.enabled': false,
  // it spells out the absolute path of whoever ran the script
  'breadcrumbs.enabled': false,
  'editor.cursorBlinking': 'solid',
  'editor.lightbulb.enabled': 'off',
  'editor.hover.enabled': false,
  'editor.codeLens': false,
  'problems.visibility': false,
  // examples/ is not a compiled project, so its imports do not resolve;
  // diagnostics off keeps the squiggles and the problem count out of the shots
  // without touching semantic highlighting, which the same server provides
  'typescript.validate.enable': false,
  'javascript.validate.enable': false,
  'workbench.startupEditor': 'none',
  'workbench.tips.enabled': false,
  'workbench.layoutControl.enabled': false,
  'workbench.editor.enablePreview': false,
  'window.commandCenter': false,
  'chat.commandCenter.enabled': false,
  'extensions.ignoreRecommendations': true,
  'telemetry.telemetryLevel': 'off',
  'update.showReleaseNotes': false,
  'files.autoSave': 'off',
  'git.enabled': false,
  'terminal.integrated.fontSize': 12,
  // the dom renderer keeps the terminal text readable in the page, which is
  // both how the run checks colors.sh ran and how it lands in the png
  'terminal.integrated.gpuAcceleration': 'off',
  'terminal.integrated.profiles.osx': terminalProfile,
  'terminal.integrated.profiles.linux': terminalProfile,
  'terminal.integrated.defaultProfile.osx': 'screenshots',
  'terminal.integrated.defaultProfile.linux': 'screenshots',
  'terminal.integrated.env.osx': {
    PS1: '$ ',
    BASH_SILENCE_DEPRECATION_WARNING: '1',
  },
  'terminal.integrated.env.linux': { PS1: '$ ' },
});

/** The workbench takes its keybindings from the browser's host, not from ours. */
const mod = process.platform === 'darwin' ? 'Meta' : 'Control';

const args = process.argv.slice(2);
const flag = (name: string): boolean => args.includes(`--${name}`);
const option = (name: string): string | undefined => {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? undefined : args[index + 1];
};

const keysOption = <T extends string>(
  name: string,
  available: Record<string, unknown>,
): T[] | undefined => {
  const raw = option(name);
  if (raw === undefined) return undefined;
  const keys = raw.split(',').map((key) => key.trim());
  const unknown = keys.filter((key) => !(key in available));
  if (unknown.length > 0) {
    throw new Error(
      `unknown --${name}: ${unknown.join(', ')} (available: ${Object.keys(available).join(', ')})`,
    );
  }
  return keys as T[];
};

if (flag('list')) {
  console.log(`themes:  ${Object.keys(themes).join(', ')}`);
  console.log(`uis:     ${Object.keys(uis).join(', ')}`);
  console.log(`layouts: ${Object.keys(layouts).join(', ')}`);
  console.log(`files:   ${Object.keys(files).join(', ')}`);
  process.exit(0);
}

const outDir = path.resolve(root, option('out') ?? 'previews');
const scale = Number(option('scale') ?? 2);
/** An editor shot grows to fit the file, up to this many css pixels. */
const maxHeight = Number(option('max-height') ?? 6000);
const selectedThemes = keysOption<ThemeKey>('themes', themes);
const selectedUis = keysOption<UiKey>('uis', uis);
const selectedLayouts = keysOption<LayoutKey>('layouts', layouts);
const selectedFiles = keysOption<FileKey>('files', files);

const matrix: MatrixEntry[] =
  selectedThemes || selectedUis || selectedLayouts || selectedFiles
    ? [
        {
          themes: selectedThemes ?? ['dark', 'light'],
          uis: selectedUis ?? ['classic'],
          layouts: selectedLayouts ?? ['full'],
          files: selectedFiles ?? ['typescript'],
        },
      ]
    : defaultMatrix;

const shotName = (shot: Shot): string =>
  `${shot.theme}-${shot.ui}-${shot.layout}-${shot.file}.png`;

/** Theme and ui changes cost a reload, so shots are grouped by both. */
const shots: Shot[] = matrix
  .flatMap((entry) =>
    entry.themes.flatMap((theme) =>
      entry.uis.flatMap((ui) =>
        entry.layouts.flatMap((layout) =>
          entry.files.map((file) => ({ theme, ui, layout, file })),
        ),
      ),
    ),
  )
  .filter(
    (shot, index, all) =>
      all.findIndex((other) => shotName(other) === shotName(shot)) === index,
  )
  .sort((a, b) => shotName(a).localeCompare(shotName(b)));

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** A throwaway VS Code install: our theme only, no user extensions or state. */
const prepareServerData = (): string => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'springbok-shots-'));
  const extension = path.join(dir, 'extensions', 'springbok-theme');
  fs.mkdirSync(extension, { recursive: true });
  fs.copyFileSync(
    path.join(root, 'package.json'),
    path.join(extension, 'package.json'),
  );
  fs.cpSync(path.join(root, 'themes'), path.join(extension, 'themes'), {
    recursive: true,
  });
  fs.cpSync(path.join(root, 'images'), path.join(extension, 'images'), {
    recursive: true,
  });
  return dir;
};

const startServer = async (serverDataDir: string): Promise<ChildProcess> => {
  const server = spawn(
    'code',
    [
      'serve-web',
      '--without-connection-token',
      '--accept-server-license-terms',
      '--disable-telemetry',
      '--port',
      String(port),
      '--server-data-dir',
      serverDataDir,
      '--default-folder',
      root,
    ],
    // own process group: the CLI spawns the server as a child, and killing the
    // group is the only way to take both down
    { stdio: ['ignore', 'pipe', 'pipe'], detached: true },
  );
  const log: string[] = [];
  server.stdout?.on('data', (chunk: Buffer) => log.push(String(chunk)));
  server.stderr?.on('data', (chunk: Buffer) => log.push(String(chunk)));

  for (let i = 0; i < 90; i++) {
    try {
      if ((await fetch(`http://127.0.0.1:${port}/`)).ok) return server;
    } catch {
      // not listening yet
    }
    await wait(1000);
  }
  console.error(log.join(''));
  throw new Error('code serve-web did not start');
};

const stopServer = (server: ChildProcess): void => {
  try {
    if (server.pid !== undefined) process.kill(-server.pid, 'SIGTERM');
  } catch {
    server.kill('SIGTERM');
  }
};

/**
 * Quick input swallows keystrokes sent while the workbench is still wiring
 * itself up, so retry until the widget is really visible.
 */
const openQuickInput = async (
  page: Page,
  kind: 'command' | 'file',
): Promise<void> => {
  const input = page.locator('.quick-input-widget input');
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press(kind === 'command' ? 'F1' : `${mod}+P`);
    try {
      await input.waitFor({ state: 'visible', timeout: 3000 });
      return;
    } catch {
      await page.keyboard.press('Escape');
      await wait(500);
    }
  }
  throw new Error('quick input never opened');
};

const runCommand = async (page: Page, label: string): Promise<void> => {
  await openQuickInput(page, 'command');
  await page.locator('.quick-input-widget input').fill(`>${label}`);
  await wait(800);
  await page
    .locator('.quick-input-list .monaco-list-row', { hasText: label })
    .first()
    .click();
  await wait(1000);
};

/**
 * User settings live in the browser, not in the server data dir, so they have
 * to go through the settings editor. Typing the JSON would trip the
 * auto-closing brackets, hence the clipboard.
 */
const writeSettings = async (
  page: Page,
  settings: SettingsOptions,
): Promise<void> => {
  await runCommand(page, 'Preferences: Open User Settings (JSON)');
  // evaluated as source text: the project has no dom lib to type a callback
  await page.evaluate(
    `navigator.clipboard.writeText(${JSON.stringify(JSON.stringify(settingsFor(settings), null, 2))})`,
  );
  await page.keyboard.press(`${mod}+A`);
  await page.keyboard.press(`${mod}+V`);
  await wait(500);
  await page.keyboard.press(`${mod}+S`);
  await wait(1500);
  await runCommand(page, 'View: Close All Editors');
};

/** Tokens arrive in waves: TextMate first, then the language server. */
const waitForStableRender = async (page: Page): Promise<void> => {
  let previous = '';
  let stable = 0;
  for (let i = 0; i < 40; i++) {
    const html = await page.evaluate<string>(
      `document.querySelector('.view-lines')?.innerHTML ?? ''`,
    );
    stable = html !== '' && html === previous ? stable + 1 : 0;
    previous = html;
    if (stable >= 3) return;
    await wait(500);
  }
};

const openFile = async (page: Page, relPath: string): Promise<void> => {
  await openQuickInput(page, 'file');
  await page.locator('.quick-input-widget input').fill(relPath);
  await wait(1000);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.view-lines .view-line', { timeout: 30000 });
  await waitForStableRender(page);
};

/**
 * An editor shot should show the whole file, not one screenful. The window is
 * grown by whatever the editor still has to scroll through, which accounts for
 * the tabs, breadcrumbs and status bar without measuring each of them.
 */
const fitWindowToFile = async (page: Page, relPath: string): Promise<void> => {
  const needed = await page.evaluate<number>(
    `(() => {
      const editor = document.querySelector('.part.editor .monaco-scrollable-element');
      const lines = document.querySelector('.part.editor .view-lines');
      if (!editor || !lines) return window.innerHeight;
      return window.innerHeight + Math.max(0, lines.scrollHeight - editor.clientHeight);
    })()`,
  );
  const height = Math.min(maxHeight, Math.ceil(needed));
  if (height <= viewport.height) return;

  await page.setViewportSize({ width: viewport.width, height });
  await waitForStableRender(page);
  if (height === maxHeight) {
    console.warn(
      `${relPath} is taller than --max-height ${maxHeight}, cropped`,
    );
  }
};

const terminalText = async (page: Page): Promise<string> =>
  page.evaluate<string>(
    `[...document.querySelectorAll('.xterm-rows')].map((rows) => rows.innerText).join('\\n')`,
  );

const terminalCount = async (page: Page): Promise<number> =>
  page.evaluate<number>(`document.querySelectorAll('.xterm').length`);

const openTerminal = async (page: Page): Promise<void> => {
  // a reload restores the terminals of the previous shot: a second one adds a
  // tab list to the panel, and the run may read the palette off the stale one.
  // restored terminals render before they hold any text, so they are counted,
  // not read
  if ((await terminalCount(page)) > 0) {
    await runCommand(page, 'Terminal: Kill All Terminals');
  }
  await runCommand(page, 'Terminal: Create New Terminal');

  // BRIGHT_WHITE is the last word colors.sh prints
  for (let i = 0; i < 60; i++) {
    if ((await terminalText(page)).includes('BRIGHT_WHITE')) {
      await wait(1000);
      return;
    }
    await wait(500);
  }
  throw new Error(
    `colors.sh never rendered, terminal shows:\n${await terminalText(page)}`,
  );
};

/**
 * Only the differences are applied: toggling a part that is already in the
 * wanted state would undo it.
 */
/**
 * The workbench restores its layout across reloads, and the hide commands only
 * exist while the part is showing, so the current state is read from the page
 * rather than tracked. A hidden part has no size. The panel is only ever opened
 * here by creating a terminal, so a visible panel means the terminal is up.
 */
const readLayout = async (page: Page): Promise<Omit<Layout, 'capture'>> => {
  const visible = (selector: string): Promise<boolean> =>
    page.evaluate<boolean>(
      `(document.querySelector('${selector}')?.offsetWidth ?? 0) > 0`,
    );
  return {
    sideBar: await visible('.part.sidebar'),
    secondarySideBar: await visible('.part.auxiliarybar'),
    terminal: await visible('.part.panel'),
  };
};

interface ApplyLayoutOptions {
  page: Page;
  layout: Layout;
}

const applyLayout = async ({
  page,
  layout,
}: ApplyLayoutOptions): Promise<void> => {
  const current = await readLayout(page);

  if (layout.sideBar !== current.sideBar) {
    await runCommand(
      page,
      layout.sideBar ? 'View: Show Explorer' : 'View: Close Primary Side Bar',
    );
  }
  if (layout.secondarySideBar !== current.secondarySideBar) {
    await runCommand(
      page,
      layout.secondarySideBar
        ? 'View: Focus into Secondary Side Bar'
        : 'View: Hide Secondary Side Bar',
    );
  }
  if (layout.terminal !== current.terminal) {
    if (layout.terminal) await openTerminal(page);
    else await runCommand(page, 'View: Toggle Panel Visibility');
  }
};

const serverDataDir = prepareServerData();
process.on('exit', () => {
  if (!flag('keep')) fs.rmSync(serverDataDir, { recursive: true, force: true });
});
const server = await startServer(serverDataDir);

/** What a workbench shot is framed in; editor shots grow from it. */
const viewport = { width: 1440, height: 900 };

const browser = await chromium.launch({ headless: !flag('headed') });
const context = await browser.newContext({
  viewport,
  deviceScaleFactor: scale,
  permissions: ['clipboard-read', 'clipboard-write'],
});
const page = await context.newPage();

try {
  fs.mkdirSync(outDir, { recursive: true });
  await page.goto(
    `http://127.0.0.1:${port}/?folder=${encodeURIComponent(root)}`,
    {
      waitUntil: 'domcontentloaded',
    },
  );
  await page.waitForSelector('.monaco-workbench', { timeout: 60000 });
  await wait(3000);

  // command labels move between VS Code versions; --commands <query> prints
  // what this version offers, to fix up the ones the layouts run
  const commandQuery = option('commands');
  if (commandQuery !== undefined) {
    await openQuickInput(page, 'command');
    await page.locator('.quick-input-widget input').fill(`>${commandQuery}`);
    await wait(1500);
    console.log(
      (await page.locator('.quick-input-list .monaco-list-row').allInnerTexts())
        .map((row) => row.replace(/\n/g, ' '))
        .join('\n'),
    );
    await browser.close();
    stopServer(server);
    process.exit(0);
  }

  let currentSettings: string | undefined;

  for (const shot of shots) {
    const layout = layouts[shot.layout];
    const settings = `${shot.theme}/${shot.ui}`;

    if (settings !== currentSettings) {
      await page.setViewportSize(viewport);
      await writeSettings(page, {
        theme: themes[shot.theme],
        modernUI: uis[shot.ui],
      });
      // workspace trust and the modern ui shell are both decided at startup, so
      // they only take once the window reloads with the settings in place
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.monaco-workbench', { timeout: 60000 });
      await wait(3000);
      await runCommand(page, 'View: Close All Editors');
      currentSettings = settings;
    }

    await page.setViewportSize(viewport);
    await applyLayout({ page, layout });
    await openFile(page, files[shot.file]);
    if (layout.capture === 'editor')
      await fitWindowToFile(page, files[shot.file]);

    // a stray pointer leaves hover tooltips and highlights in the shot
    await page.mouse.move(0, 0);
    await wait(1000);

    const name = shotName(shot);
    const target = await page.waitForSelector(
      layout.capture === 'editor' ? '.part.editor' : '.monaco-workbench',
      { timeout: 15000 },
    );
    await target.screenshot({ path: path.join(outDir, name) });
    console.log(`${settings}/${shot.layout}/${shot.file} -> ${name}`);

    await runCommand(page, 'View: Close All Editors');
  }
} finally {
  await browser.close();
  stopServer(server);
}

process.exit(0);
