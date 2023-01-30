import Button from '@mui/material/Button/Button';
import Dialog from '@mui/material/Dialog/Dialog';
import DialogActions from '@mui/material/DialogActions/DialogActions';
import DialogContent from '@mui/material/DialogContent/DialogContent';
import DialogContentText from '@mui/material/DialogContentText/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle/DialogTitle';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography/Typography';
import { useState } from 'react';
import { Message } from './Message';

type modalParams = {
    message: Message;
    open: boolean;
    setOpen: Function;
};
export function ReadModal({ message, open, setOpen }: modalParams) {
    return (
        <Dialog open={open}>
            <DialogTitle>{message.title}</DialogTitle>
            <DialogContent>
                <Typography variant="body2">{message.content}</Typography>
                <Typography variant="subtitle2"> -{message.sender}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setOpen(false);
                    }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
