import { useContext, useState } from 'react';
import DialogContext from '../dialogs/dialog-context';

export default function useDialog() {
  const { setHasDialog } = useContext(DialogContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => {
    setHasDialog(true);
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setHasDialog(false);
    setIsDialogOpen(false);
  };
  return {
    openDialog,
    closeDialog,
    isDialogOpen,
  };
}
