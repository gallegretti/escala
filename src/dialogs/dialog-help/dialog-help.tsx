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

interface DialogHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

const DialogHelpContent = styled(DialogContent)({
  display: 'flex',
});

const ContentWrapper = styled('div')({
  width: '500px',
  height: '600px',
  overflowY: 'auto',
  padding: '12px',
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
        </ContentWrapper>
      </DialogHelpContent>
    </Dialog>
  );
}

export default DialogHelp;
