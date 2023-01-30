import { FormEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { client, setUserListSetter } from './WebsocketClient';
import Box from '@mui/material/Box/Box';
import { FormControl, InputLabel, OutlinedInput, Button } from '@mui/material';

export function Compose() {
    const [recipient, setRecipient] = useState('');
    const [users, setUsers] = useState([] as string[]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    function sendMessage(event: FormEvent) {
        event.preventDefault();
        client.send(
            JSON.stringify({
                action: 'sendMessage',
                data: {
                    title: title,
                    content: content,
                    recipient: recipient,
                },
            })
        );
        setTitle('');
        setContent('');
        setRecipient('');
    }

    function getUsers() {
        setUserListSetter(setUsers);
        if (client)
            client.send(
                JSON.stringify({
                    action: 'getUsers',
                })
            );
    }

    return (
        <Box component="form" onSubmit={sendMessage}>
            <FormControl fullWidth sx={{ marginBottom: 1 }}>
                <Autocomplete
                    freeSolo
                    options={users}
                    value={recipient}
                    onInputChange={(event, value) => {
                        if (typeof value === 'number') {
                            setRecipient(users[value]);
                        } else {
                            setRecipient(value);
                        }
                    }}
                    getOptionLabel={(option) => {
                        if (typeof option === 'number') {
                            return users[option];
                        }
                        return option;
                    }}
                    renderInput={(params) => (
                        <TextField
                            required
                            onClick={getUsers}
                            {...params}
                            label="Recipient"
                        />
                    )}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 1 }}>
                <InputLabel htmlFor="title">Title</InputLabel>
                <OutlinedInput
                    required
                    id="title"
                    label="Title"
                    value={title}
                    onChange={(event) => {
                        const target = event.target as HTMLInputElement;
                        setTitle(target.value);
                    }}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 1 }}>
                <InputLabel htmlFor="content">Content</InputLabel>
                <OutlinedInput
                    required
                    multiline
                    minRows={10}
                    maxRows={Infinity}
                    value={content}
                    onChange={(event) => {
                        const target = event.target as HTMLInputElement;
                        setContent(target.value);
                    }}
                    id="content"
                    label="Content"
                />
            </FormControl>
            <Button variant="contained" type="submit">
                Send
            </Button>
        </Box>
    );
}
