/* eslint-disable quote-props */
import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources: Resource = {
  en: {
    translation: {
    },
  },
  pt: {
    translation: {
      'Upstroke': 'Toca para cima',
      'Downstroke': 'Toca para baixo',
      'Accentuated Note': 'Nota acentuada',
      'Heavy Accentuated Note': 'Nota muito acentuada',
      'Chord': 'Acorde',
      'Document': 'Documento',
      'Effects': 'Efeitos',
      'Beat': 'Batida',
      'Duration': 'Duração',
      'Dynamics': 'Dinâmico',
      'New File': 'Novo arquivo',
      'Open File': 'Abrir arquivo',
      'Score Info': 'Informações da partitura',
      'Undo': 'Desfazer',
      'Redo': 'Refazer',
      'Print': 'Imprimir',
      'Download': 'Exportar',
      'Set text': 'Mudar texto',
      'Open Repeat': 'Iniciar Repetição',
      'Close Repeat': 'Terminar Repetição',
      'Whole': 'Semibreve',
      'Half': 'Mínima',
      'Quarter': 'Semínima',
      'Eighth': 'Colcheia',
      'Sixteenth': 'Semicolcheia',
      'Thirty-Second': 'Fusa',
      'Sixty-Fourth': 'Semifusa',
      'Tied Note': 'Nota Ligada',
      'Keyboard Shortcuts': 'Atalhos do teclado',
      'Dark mode': 'Modo escuro',
      'Language': 'Idioma',
      'Edit': 'Editar',
      'Delete': 'Deletar',
      'Shortcuts Information': 'Informações dos atalhos',
      'Set fret': 'Usar casa',
      'Remove note': 'Remover nota',
      'Move cursor up': 'Mover cursor para cima',
      'Move cursor down': 'Mover cursor para baixo',
      'Move cursor next bar': 'Mover cursor para o próximo compasso',
      'Move cursor previous bar': 'Mover cursor para o compasso anterior',
      'Metronome': 'Metrônomo',
      'Repeat': 'Repetir',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
