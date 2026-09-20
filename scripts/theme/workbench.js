/**
 * The workbench `colors` map. Grouped by area, in the order the eye meets them:
 * chrome first, then the editor, then the panels below it.
 *
 * Values still read from `palette` directly where the token has no counterpart
 * in the semantic layer yet.
 */
export const createWorkbenchColors = (colors, palette, type) => {
  const isDark = type === 'dark';

  return {
    // -- Base --
    focusBorder: colors.focus,
    foreground: colors.foreground,
    errorForeground: colors.error,
    'selection.background': colors.selection.background,
    'icon.foreground': colors.foreground,

    // -- Scrollbar --
    'scrollbar.shadow': colors.scrollbar.shadow,
    'scrollbarSlider.background': colors.scrollbar.slider.background,
    'scrollbarSlider.activeBackground':
      colors.scrollbar.slider.activeBackground,
    'scrollbarSlider.hoverBackground': colors.scrollbar.slider.hoverBackground,

    // -- Quick input --
    'quickInput.background': colors.quickInput.background,
    'quickInput.foreground': colors.quickInput.foreground,
    'pickerGroup.foreground': palette.springbok.dark,

    // -- Workbench markdown --
    'textLink.foreground': colors.links.default,
    'textLink.activeForeground': colors.links.active,
    'editorLink.activeForeground': colors.links.editorActive,
    'textPreformat.foreground': colors.preformat.foreground,
    'textPreformat.background': colors.preformat.background,
    'textCodeBlock.background': colors.codeBlock.background,
    'textBlockQuote.background': colors.blockQuote.background,
    'textBlockQuote.border': colors.blockQuote.border,
    'textSeparator.foreground': colors.separator,

    // -- Buttons, checkboxes, progress --
    'button.background': colors.buttons.background,
    'button.hoverBackground': colors.buttons.hoverBackground,
    'button.foreground': colors.buttons.foreground,
    'checkbox.background': palette.springbok.darker,
    'progressBar.background': palette.springbok.dark,
    'badge.background': palette.springbok.dark,
    'badge.foreground': palette.white.light,

    // -- Inputs --
    'input.background': colors.input.background,
    'input.border': colors.input.border,
    'input.foreground': colors.input.foreground,
    // select boxes, kept in step with the inputs they sit next to
    'dropdown.background': colors.input.background,
    'dropdown.foreground': colors.input.foreground,
    'inputOption.activeBorder': colors.input.option.activeBorder,
    'inputOption.activeBackground': colors.input.option.activeBackground,
    'inputOption.activeForeground': colors.input.option.activeForeground,
    'inputOption.hoverBackground': colors.input.option.hoverBackground,
    'inputValidation.errorBorder': palette.red.dark,
    'inputValidation.errorBackground': palette.red.dark,
    'inputValidation.errorForeground': palette.white.light,
    'inputValidation.infoBorder': palette.blue.dark,
    'inputValidation.infoBackground': palette.blue.dark,
    'inputValidation.infoForeground': palette.white.light,
    'inputValidation.warningBorder': colors.warning,
    'inputValidation.warningBackground': colors.warning,
    'inputValidation.warningForeground': palette.white.light,

    // -- Toolbars --
    'toolbar.hoverBackground': colors.input.option.hoverBackground,
    'toolbar.activeBackground': colors.input.option.activeBackground,

    // -- Lists and trees --
    'list.activeSelectionForeground': colors.foreground,
    'list.activeSelectionBackground': isDark
      ? palette.springbok.darkest
      : palette.soil.xlight,
    'list.inactiveSelectionBackground': isDark
      ? palette.springbok.darkest
      : palette.soil.xlight,
    'list.dropBackground': palette.springbok.light,
    'list.focusBackground': isDark
      ? palette.springbok.darkest
      : palette.soil.xlight,
    'list.hoverBackground': isDark ? palette.soil.darkest : palette.soil.light,
    'list.inactiveFocusBackground': isDark
      ? palette.springbok.dark
      : palette.springbok.light,
    'list.filterMatchBackground': palette.springbok.dark,
    'list.highlightForeground': palette.springbok.dark,

    // -- Git decorations in the explorer --
    'gitDecoration.addedResourceForeground': isDark
      ? palette.green.light
      : palette.green.dark,
    'gitDecoration.modifiedResourceForeground': isDark
      ? palette.yellow.light
      : palette.yellow.dark,
    'gitDecoration.deletedResourceForeground': isDark
      ? palette.red.light
      : palette.red.dark,
    'gitDecoration.untrackedResourceForeground': isDark
      ? palette.green.dark
      : palette.green.darker,
    'gitDecoration.conflictingResourceForeground': isDark
      ? palette.red.dark
      : palette.red.darker,

    // -- Activity bar --
    'activityBar.background': colors.frame.background,
    'activityBar.foreground': colors.foreground,
    'activityBar.inactiveForeground': colors.inactiveForeground,
    'activityBar.border': colors.surface.border,
    'activityBar.activeBorder': palette.springbok.dark,
    'activityBar.dropBorder': palette.springbok.dark,
    'activityBarTop.background': colors.surface.background,
    'activityBarTop.foreground': colors.foreground,
    'activityBarTop.inactiveForeground': colors.inactiveForeground,
    'activityBarTop.activeBorder': palette.springbok.dark,
    'activityBarBadge.background': palette.springbok.dark,
    'activityBarBadge.foreground': palette.white.light,
    'activityErrorBadge.background': palette.red.dark,
    'activityErrorBadge.foreground': palette.white.light,
    'activityWarningBadge.background': colors.warning,
    'activityWarningBadge.foreground': palette.white.light,

    // -- Title bar --
    'titleBar.activeBackground': colors.frame.background,
    'titleBar.activeForeground': colors.surface.foreground,
    'titleBar.inactiveBackground': colors.inactiveBackground,
    'titleBar.inactiveForeground': colors.inactiveForeground,
    'titleBar.border': colors.surface.border,

    // -- Menus --
    'menu.background': colors.surface.background,
    'menu.foreground': colors.surface.foreground,
    'menu.selectionBackground': '#552407',
    'menu.selectionForeground': colors.foreground,
    'menu.separatorBackground': '#2f2f2f',

    // -- Command center --
    'commandCenter.foreground': colors.commandCenter.foreground,
    'commandCenter.activeForeground': colors.commandCenter.activeForeground,
    'commandCenter.background': colors.commandCenter.background,
    'commandCenter.activeBackground': colors.commandCenter.activeBackground,
    'commandCenter.activeBorder': colors.commandCenter.activeBorder,
    'commandCenter.border': colors.commandCenter.border,
    'commandCenter.inactiveForeground': colors.commandCenter.inactiveForeground,
    'commandCenter.inactiveBorder': colors.commandCenter.inactiveBorder,
    'commandCenter.debuggingBackground':
      colors.commandCenter.debuggingBackground,

    // -- Side bar --
    'sideBar.background': colors.surface.background,
    'sideBar.foreground': colors.foreground,
    'sideBar.border': colors.surface.border,
    'sideBarTitle.background': colors.surface.background,
    'sideBarTitle.foreground': colors.sideBar.titleForeground,
    'sideBarSectionHeader.background': colors.surface.background,
    'sideBarSectionHeader.foreground': colors.surface.foreground,

    // -- Bottom panel --
    'panel.background': colors.bottomPanel.background,
    'panel.border': colors.bottomPanel.border,
    'panelTitle.activeBorder': palette.springbok.dark,
    'panelTitle.activeForeground': colors.foreground,
    'panelTitle.inactiveForeground': colors.inactiveForeground,
    'panelSection.border': colors.surface.border,

    // -- `workbench.experimental.modernUI` --
    // Only the surfaces are set. The modern tab and activity bar item colors
    // inherit from `list.inactiveSelectionBackground` / `list.hoverBackground`,
    // which already carry the accent and the right hover ordering.
    // `surface.background` is applied with `!important`, so it wins over
    // `editorGroupHeader.tabsBackground` for the cards' tab strips.
    'surface.background': colors.surface.background,
    'surface.border': colors.surface.border,
    'modernUI.shellBackground': colors.frame.background,
    'agentsPanel.border': colors.surface.border,
    'agents.background': colors.surface.background,

    // -- Keybinding labels --
    'keybindingLabel.background': colors.keybinding.background,
    'keybindingLabel.foreground': colors.keybinding.foreground,
    'keybindingLabel.border': colors.keybinding.border,
    'keybindingLabel.bottomBorder': colors.keybinding.bottomBorder,

    // -- Breadcrumbs --
    'breadcrumb.background': colors.editor.background,
    'breadcrumb.foreground': colors.surface.foreground,
    'breadcrumb.focusForeground': colors.surface.focusForeground,
    'breadcrumb.activeSelectionForeground': colors.surface.focusForeground,
    'breadcrumbPicker.background': colors.surface.background,

    // -- Editor groups and tabs --
    'editorGroup.border': colors.editor.border,
    'sideBySideEditor.horizontalBorder': colors.editor.border,
    'sideBySideEditor.verticalBorder': colors.editor.border,
    'editorGroupHeader.tabsBackground': colors.tabs.background,
    'tab.activeBackground': colors.tabs.activeBackground,
    'tab.activeForeground': colors.foreground,
    'tab.inactiveBackground': colors.tabs.inactiveBackground,
    'tab.inactiveForeground': colors.inactiveForeground,

    // -- Editor --
    'editor.background': colors.editor.background,
    'editor.foreground': colors.editor.foreground,
    'outputView.background': colors.editor.background,
    'editor.selectionBackground': colors.selection.background,
    'editor.inactiveSelectionBackground': colors.selection.inactiveBackground,
    'editor.wordHighlightBackground': colors.editor.wordHighlightBase + '16',
    'editor.wordHighlightStrongBackground':
      colors.editor.wordHighlightBase + '32',
    'editor.hoverHighlightBackground':
      colors.selection.hoverHighlightBackground,
    'editor.findMatchBackground': isDark ? '#1d5042' : '#1d504241',
    'editor.findMatchHighlightBackground': isDark ? '#1e332d' : '#1e332d41',
    'editor.lineHighlightBackground': colors.editor.lineHighlightBackground,
    'editor.selectionHighlightBackground': isDark ? '#333837' : '#33383721',
    'editor.rangeHighlightBackground': isDark ? '#212423' : '#21242321',
    'editor.symbolHighlightBackground': isDark ? '#212423' : '#21242321',
    'editorUnnecessaryCode.opacity': '#000000c0',
    'editorCursor.foreground': colors.editor.cursor,
    'editorGhostText.foreground': colors.editor.ghostText,
    'editorWhitespace.foreground': isDark ? '#414141' : '#dfdfdf',
    'editorBracketMatch.border': isDark ? '#eee' : '#444',
    'editorIndentGuide.activeBackground1': colors.editor.activeIndentGuide,
    // deprecated alias, kept for the VS Code versions in `engines`
    'editorIndentGuide.activeBackground': colors.editor.activeIndentGuide,
    'editorInlayHint.background': palette.black.dark + '00', // 00 means 0% opacity (transparent)
    'editorInlayHint.foreground': palette.sky.light + 'a0',

    // -- Editor gutter and decorations --
    'editorGutter.background': colors.editorGutter.background,
    'editorGutter.modifiedBackground': palette.yellow.light,
    'editorGutter.addedBackground': palette.green.light,
    'editorGutter.deletedBackground': palette.red.light,
    'editorGutter.commentRangeForeground': isDark
      ? palette.dim.dark
      : palette.dim.light,
    'editorLineNumber.foreground': isDark
      ? palette.dim.dark
      : palette.dim.light,
    'editorLineNumber.activeForeground': isDark
      ? palette.white.light
      : palette.dark.dark,
    'git.blame.editorDecorationForeground': colors.editor.blameForeground,

    // -- Diagnostics --
    'editorError.foreground': colors.diagnostics.error,
    'editorWarning.foreground': colors.diagnostics.warning,
    'editorInfo.foreground': colors.diagnostics.info,

    // -- Diff --
    'diffEditor.insertedTextBackground': palette.green.light + '20',
    'diffEditor.removedTextBackground': palette.red.light + '20',

    // -- Peek view --
    'peekView.border': palette.springbok.darker,
    'peekViewTitle.background': '#531412',
    // same as the editor, a step darker
    'peekViewEditor.background': isDark ? '#030303' : '#F3F3F3',
    'peekViewEditor.matchHighlightBackground': isDark
      ? '#14221e'
      : palette.soil.light,
    'peekViewResult.background': isDark ? '#0F0F0F' : colors.surface.background,
    'peekViewResult.matchHighlightBackground': isDark ? '#1e332d' : '#1e332d31',
    'peekViewResult.selectionBackground': isDark
      ? palette.springbok.darker
      : palette.soil.light,

    // -- Merge conflicts --
    'merge.currentHeaderBackground': palette.cyan.dark + '90',
    'merge.currentContentBackground': palette.cyan.dark + '60',
    'merge.incomingHeaderBackground': palette.blue.dark + '90',
    'merge.incomingContentBackground': palette.blue.dark + '60',
    'merge.commonHeaderBackground': palette.yellow.dark + '90',
    'merge.commonContentBackground': palette.yellow.dark + '60',

    // -- Status bar --
    'statusBar.background': colors.statusBar.background,
    'statusBar.foreground': colors.statusBar.foreground,
    'statusBar.border': colors.statusBar.border,
    'statusBar.noFolderBackground': colors.statusBar.noFolderBackground,
    'statusBar.debuggingBackground': colors.statusBar.debuggingBackground,
    'statusBar.debuggingForeground': colors.statusBar.debuggingForeground,
    'statusBarItem.remoteBackground': palette.springbok.darker,
    'statusBarItem.remoteForeground': palette.yellow.light,

    // -- Settings editor --
    'settings.modifiedItemIndicator': palette.yellow.light,

    // -- Terminal --
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
    'terminal.inactiveSelectionBackground': colors.selection.inactiveBackground,
  };
};
