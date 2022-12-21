import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import HelpBasics from './help-basics';
import HelpDocument from './help-document';
import HelpDynamics from './help-dynamics';
import HelpDuration from './help-duration';
import HelpBeat from './help-beat';
import HelpEffects from './help-effects';

interface DialogHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

const DialogHelpContent = styled(DialogContent)({
  display: 'flex',
  overflowY: 'hidden',
  height: '600px',
  width: '600px',
});

const ContentWrapper = styled('div')({
  overflowY: 'auto',
  padding: '12px',
  width: '100%',
});

export function DialogHelp(props: DialogHelpProps) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState('Basics');

  const menuOptions = [
    'Basics',
    'Document',
    'Effects',
    'Beat',
    'Duration',
    'Dynamics',
  ]

  return (
    <Dialog
      className="score-info"
      maxWidth={false}
      open={props.isOpen}
      onClose={props.onClose}
    >
      <DialogTitle>{t('Help')}</DialogTitle>
      <DialogHelpContent>
        <List>
          {menuOptions.map((option) => (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setCurrentPage(option)}
                selected={option === currentPage}
              >
                <ListItemText primary={t(option)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <ContentWrapper>
          {currentPage === 'Basics' && <HelpBasics />}
          {currentPage === 'Document' && <HelpDocument />}
          {currentPage === 'Dynamics' && <HelpDynamics />}
          {currentPage === 'Duration' && <HelpDuration />}
          {currentPage === 'Beat' && <HelpBeat />}
          {currentPage === 'Effects' && <HelpEffects />}
        </ContentWrapper>
      </DialogHelpContent>
    </Dialog>
  );
}

export default DialogHelp;
