/* eslint-disable quote-props */
import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources: Resource = {
  en: {
    translation: {
      help: {
        basic: {
          'mouse_select': 'Use your mouse to select a note or a string',
          'arrow_keys': 'Use your arrow keys to move between beats and strings',
          'delete': 'Press \'delete\' to remove a selected note',
        },
        effects: {
          'palm_mute': 'Place the side of your picking hand over the string, creating a muffled sound',
          'bend_pre': 'Bend starting position, before the string is plucked',
          'bend': 'Main bend movement',
          'bend_release': 'How the bend should be released after the main bend',
        },
        beat: {
          'text': 'Sets a text above the beat. Can be used for lyrics or instructions on how to play',
          'fermata': 'Indicates a brief pause',
          'upstroke': 'The strumming should be from the bottom to the top',
          'downstroke': 'The strumming should be from the top to the bottom',
          'open_repeat': 'Start a repetition at the current bar',
          'close-repeat': 'Ends a repetition at the current bar',
        },
      },
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
      'Score Information': 'Informações da partitura',
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
      'Number of repetitions': 'Número de repetições',
      'Title': 'Título',
      'Subtitle': 'Subtítulo',
      'Artist': 'Artista',
      'Album': 'Álbum',
      'Tab Creator': 'Criador da partitura',
      'Comments': 'Comentários',
      'Composer': 'Compositor',
      'Save': 'Salvar',
      'Cancel': 'Cancelar',
      'Edit Track': 'Editar faixa',
      'New Track': 'Nova faixa',
      'Track name': 'Nome da faixa',
      'Tuning Preset': 'Afinação',
      'Capo': 'Capo',
      'Palm Mute': 'Nota Abafada',
      'P.M': 'N.A', // Nota Abafada
      'Let Ring': 'Deixar Soar',
      'L.R': 'D.S', // Deixe Soar
      'Text': 'Texto',
      'Help': 'Ajuda',
      'Basics': 'Básico',
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
