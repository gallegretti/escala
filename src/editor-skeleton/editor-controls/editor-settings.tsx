import React from 'react';
import { useTranslation } from 'react-i18next';
import KeyboardGlyph from '@glyphs/document/keyboard';
import DarkModeGlyph from '@glyphs/settings/dark-mode';
import LanguageGlyph from '@glyphs/generic/language';
import useDialog from '@hooks/use-dialog';
import DialogShortcuts from '@dialogs/dialog-shortcuts/dialog-shortcuts';
import useAnchorElem from '@hooks/use-anchor-element';
import { Menu } from '@mui/material';
import HelpGlyph from '@glyphs/settings/help';
import DialogHelp from '@dialogs/dialog-help/dialog-help';
import { ColorModeContext } from '../../editor/color-mode-context';
import EditorLanguageItem from './editor-language-item';

export default function EditorSettings() {
  const {
    openDialog: openShortcutsDialog,
    closeDialog: closeShortcutsDialog,
    isDialogOpen: isShortcutsDialogOpen,
  } = useDialog();

  const {
    openDialog: openHelpDialog,
    closeDialog: closeHelpDialog,
    isDialogOpen: isHelpDialogOpen,
  } = useDialog();

  const { i18n } = useTranslation();

  const colorMode = React.useContext(ColorModeContext);

  const [anchorElem, setAnchorElem] = useAnchorElem();

  const onLanguageClick = (e: any) => {
    if (anchorElem) {
      setAnchorElem(null)
    } else {
      setAnchorElem(e);
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setAnchorElem(null);
  }

  return (
    <>
      <DialogShortcuts
        isOpen={isShortcutsDialogOpen}
        onClose={closeShortcutsDialog}
      />
      <DialogHelp
        isOpen={isHelpDialogOpen}
        onClose={closeHelpDialog}
      />
      <KeyboardGlyph disabled={false} selected={false} onClick={() => { openShortcutsDialog(); }} />
      <DarkModeGlyph disabled={false} selected={false} onClick={() => { colorMode.toggleColorMode(); }} />
      <LanguageGlyph hideTooltip={anchorElem !== null} disabled={false} selected={false} onClick={onLanguageClick} />
      <HelpGlyph disabled={false} selected={false} onClick={openHelpDialog} />
      {anchorElem
        && (
          <Menu open onClose={() => setAnchorElem(null)} anchorEl={anchorElem}>
            <EditorLanguageItem
              language="Português"
              isSelected={i18n.language === 'pt'}
              onClick={() => changeLanguage('pt')}
            />
            <EditorLanguageItem
              language="Inglês"
              isSelected={i18n.language === 'en'}
              onClick={() => changeLanguage('en')}
            />
          </Menu>
        )}
    </>
  );
}
