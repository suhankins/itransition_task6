import Button from '@mui/material/Button/Button';
import Dialog from '@mui/material/Dialog/Dialog';
import DialogActions from '@mui/material/DialogActions/DialogActions';
import DialogContent from '@mui/material/DialogContent/DialogContent';
import DialogContentText from '@mui/material/DialogContentText/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle/DialogTitle';
import TextField from '@mui/material/TextField/TextField';
import { FormEvent, useState } from 'react';
import { connect } from './WebsocketClient';

type modalParams = {
    name: string;
    setName: Function;
};
export function LoginModal({ name, setName }: modalParams) {
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        connect(name, setOpen, setLoading, setError);
    };

    return (
        <Dialog open={open}>
            <DialogTitle>Welcome</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your name to start chatting
                </DialogContentText>
                <TextField
                    error={error === '' ? undefined : true}
                    helperText={error}
                    autoFocus
                    label="Name"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={name}
                    onChange={(event) => {
                        setError('');
                        const target = event.target as HTMLInputElement;
                        setName(target.value);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button aria-busy={loading} onClick={handleSubmit}>
                    Connect
                </Button>
            </DialogActions>
        </Dialog>
    );
}
