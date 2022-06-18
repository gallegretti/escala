import React from 'react';

export const DialogContext = React.createContext({
  hasDialog: false,
  /**
     * Tracks if there's an open dialog in the app
     * @param v
     */
  setHasDialog: (v: boolean) => {},
});
