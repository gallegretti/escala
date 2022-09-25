import React from 'react';
import StyledPopper from '@editor-section-part/styled-popper';
import KeyboardGlyph from '@glyphs/document/keyboard';
import DarkModeGlyph from '@glyphs/settings/dark-mode';
import LanguageGlyph from '@glyphs/generic/language';
import useDialog from '@hooks/use-dialog';
import DialogShortcuts from '@dialogs/dialog-shortcuts/dialog-shortcuts';
import useAnchorElem from '@hooks/use-anchor-element';
import { MenuList } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ColorModeContext } from '../../editor/color-mode-context';
import EditorLanguageItem from './editor-language-item';

export default function EditorSettings() {
  const {
    openDialog: openShortcutsDialog,
    closeDialog: closeShortcutsDialog,
    isDialogOpen: isShortcutsDialogOpen,
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
      <KeyboardGlyph disabled={false} selected={false} onClick={() => { openShortcutsDialog(); }} />
      <DarkModeGlyph disabled={false} selected={false} onClick={() => { colorMode.toggleColorMode(); }} />
      <LanguageGlyph hideTooltip={anchorElem !== null} disabled={false} selected={false} onClick={onLanguageClick} />
      {anchorElem
        && (
          <StyledPopper open anchorEl={anchorElem} placement="bottom-end" disablePortal style={{ height: '100%' }}>
            <MenuList>
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
            </MenuList>
          </StyledPopper>
        )}
    </>
  );
}
