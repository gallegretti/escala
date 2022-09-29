import React from 'react';
import { useTranslation } from 'react-i18next';

export default function HelpBasics() {
  const { t } = useTranslation(undefined, { keyPrefix: 'help.basic' });
  return (
    <>
      <p>
        {t('mouse_select')}
      </p>
      <p>
        {t('arrow_keys')}
      </p>
      <p>
        {t('delete')}
      </p>
    </>
  );
}
