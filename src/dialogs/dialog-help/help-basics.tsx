/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function DemostrationVideo({ src }: { src: string }) {
  return (
    <video autoPlay loop width="220">
      <source src={src} />
    </video>
  );
}

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
      <DemostrationVideo src="/videos/mouse-select.webm" />
      <p>
        {t('help.basic.arrow_keys')}
      </p>
      <DemostrationVideo src="/videos/arrow-keys.webm" />
      <p>
        {t('help.basic.create_note')}
      </p>
      <DemostrationVideo src="/videos/create-note.webm" />
      <p>
        {t('help.basic.delete')}
      </p>
      <DemostrationVideo src="/videos/delete-note.webm" />
    </>
  );
}
