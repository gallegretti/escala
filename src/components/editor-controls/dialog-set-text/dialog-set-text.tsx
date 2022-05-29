import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";

interface DialogSetTextProps {
    isOpen: boolean,
    currentText: string | null,
    onClose: () => void,
    onSave: (arg: string) => void,
}

export default function DialogSetText(props: DialogSetTextProps) {
    const [newTextValue, setNewTextValue] = useState(props.currentText);
    const updateNewText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewTextValue(event.target.value);
    }

    const cancel = () => {
        setNewTextValue(props.currentText);
        props.onClose();
    }

    const save = () => {
        props.onSave(newTextValue ?? "");
    }

    return (
        <Dialog
                open={props.isOpen}
                onClose={props.onClose}
            >
                <DialogTitle>Set text</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={newTextValue ?? props.currentText ?? ""}
                        onChange={(event) => updateNewText(event)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button title="Cancel" onClick={cancel}>Cancel</Button>
                    <Button title="Save" onClick={save}>Save</Button>
                </DialogActions>
            </Dialog>
    )
}
