import Alert from '@mui/material/Alert/Alert';
import AppBar from '@mui/material/AppBar/AppBar';
import Box from '@mui/material/Box/Box';
import Grid from '@mui/material/Grid/Grid';
import Snackbar from '@mui/material/Snackbar/Snackbar';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import Typography from '@mui/material/Typography/Typography';
import { useState } from 'react';
import { Compose } from './Compose';
import { LoginModal } from './LoginModal';
import { Message } from './Message';
import { Sidebar } from './Sidebar';
import { setMessageListSetter, setTriggerPopup } from './WebsocketClient';

export function App() {
    const [name, setName] = useState('');
    const [messageList, setMessageList] = useState([] as Message[]);
    const [snackbar, setSnackbar] = useState('');

    setMessageListSetter(messageList, setMessageList);
    setTriggerPopup(setSnackbar);

    return (
        <>
            <Snackbar
                open={snackbar !== ''}
                autoHideDuration={6000}
                onClose={() => setSnackbar('')}>
                <Alert
                    onClose={() => setSnackbar('')}
                    severity="error"
                    sx={{ width: '100%' }}>
                    {snackbar}
                </Alert>
            </Snackbar>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}>
                        Modern-looking Email Client
                    </Typography>
                </Toolbar>
            </AppBar>
            <LoginModal name={name} setName={setName} />
            <Box sx={{ marginTop: 2 }}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <Sidebar name={name} messageList={messageList} />
                    </Grid>
                    <Grid item xs={9}>
                        <Compose />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
