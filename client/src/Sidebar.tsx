import {
    Box,
    Typography,
    Tabs,
    Tab,
    Card,
    CardContent,
    CardActionArea,
    Chip,
} from '@mui/material';
import { useState } from 'react';
import { Message } from './Message';
import * as timeago from 'timeago.js';
import { ReadModal } from './ReadModal';

type sidebarParams = {
    name: string;
    messageList: Message[];
};

type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
};

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function MessageCard({
    message,
    direction,
    selectMessage,
    setOpen,
}: {
    message: Message;
    direction: 'to' | 'from';
    selectMessage: Function;
    setOpen: Function;
}) {
    return (
        <Card>
            <CardActionArea
                onClick={() => {
                    selectMessage(message);
                    setOpen(true);
                }}>
                <CardContent>
                    <Chip
                        label={`${direction}: ${
                            direction === 'to'
                                ? message.recipient
                                : message.sender
                        }`}></Chip>
                    {message.new && <Chip label="NEW!"></Chip>}
                    <Typography variant="h5" noWrap={true}>
                        {message.title}
                    </Typography>
                    <Typography variant="body2" noWrap={true}>
                        {message.content}
                    </Typography>
                    <Typography color="text.secondary">
                        {timeago.format(new Date(parseInt(message.date)))}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export function Sidebar({ name, messageList }: sidebarParams) {
    const [state, setState] = useState(0);
    const [open, setOpen] = useState(false);
    const [selectedMessage, selectMessage] = useState({} as Message);

    return (
        <>
            <ReadModal
                message={selectedMessage}
                setOpen={setOpen}
                open={open}
            />
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={state}
                        onChange={(_event, index) => {
                            setState(index);
                        }}
                        aria-label="basic tabs example">
                        <Tab label="Inbox" />
                        <Tab label="Outbox" />
                    </Tabs>
                </Box>
                <TabPanel value={state} index={0}>
                    {messageList.map((message, index) => {
                        if (message.recipient !== name) {
                            return undefined;
                        }
                        return (
                            <MessageCard
                                key={index}
                                message={message}
                                direction={'from'}
                                selectMessage={selectMessage}
                                setOpen={setOpen}
                            />
                        );
                    })}
                </TabPanel>
                <TabPanel value={state} index={1}>
                    {messageList.map((message, index) => {
                        if (message.sender !== name) {
                            return undefined;
                        }
                        return (
                            <MessageCard
                                key={index}
                                message={message}
                                direction={'to'}
                                selectMessage={selectMessage}
                                setOpen={setOpen}
                            />
                        );
                    })}
                </TabPanel>
            </Box>
        </>
    );
}
