import React, { useState } from 'react';
import {
  createTheme, ThemeProvider, PaletteMode, styled,
} from '@mui/material';
import { ColorModeContext } from './editor/color-mode-context';
import DialogContext from './dialogs/dialog-context';
import Editor from './editor-skeleton/editor';

const Body = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : 'inherit',
  height: '100vh',
}));

export default function App() {
  const [hasDialog, setHasDialog] = useState(false);

  const [paletteMode, setPaletteMode] = useState<PaletteMode>('dark');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setPaletteMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () => createTheme({
      palette: {
        mode: paletteMode,
      },
    }),
    [paletteMode],
  );

  const hasDialogContext = React.useMemo(
    () => ({
      hasDialog,
      setHasDialog,
    }),
    [],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <DialogContext.Provider value={hasDialogContext}>
        <ThemeProvider theme={theme}>
          <Body>
            <Editor hasDialog={hasDialog} />
          </Body>
        </ThemeProvider>
      </DialogContext.Provider>
    </ColorModeContext.Provider>
  );
}
