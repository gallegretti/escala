import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function HelpBasics() {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant="h6">
        {t('Getting started')}
      </Typography>
      <p>
        {t('help.basic.mouse_select')}
      </p>
      <p>
        {t('help.basic.arrow_keys')}
      </p>
      <p>
        {t('help.basic.delete')}
      </p>
    </>
  );
}
