import { Message } from './Message';

export let client: WebSocket;

let checker: number | undefined;

let setMessageList: Function;
let messageList: Message[];

let setUserList: Function;

let triggerPopup: Function;

export function setTriggerPopup(setSnackbar: Function) {
    triggerPopup = setSnackbar;
}

export function setMessageListSetter(
    messagelist: Message[],
    setmessagelist: Function
) {
    messageList = messagelist;
    setMessageList = setmessagelist;

    if (checker === undefined) {
        checker = setInterval(() => {
            if (client) {
                client.send(
                    JSON.stringify({
                        action: 'getMessages',
                    })
                );
            }
        }, 5000);
    }
}

export function setUserListSetter(setuserlist: Function) {
    setUserList = setuserlist;
}

const normalMessageHandler = (event: MessageEvent) => {
    const req = JSON.parse(event.data);
    if (req.result === 'error' && triggerPopup) {
        triggerPopup(req.data);
    } else if (req.result === 'messageList' && messageList && setMessageList) {
        let messageList = req.data as Message[];
        messageList = messageList.sort((a, b) => {
            return parseInt(b.date) - parseInt(a.date);
        });
        setMessageList(messageList);
    } else if (req.result === 'userList' && setUserList) {
        let userList = req.data as string[];
        userList = userList.sort();
        setUserList(userList);
    }
};

export async function connect(
    name: string,
    setOpen: Function,
    setLoading: Function,
    setError: Function
) {
    client = new WebSocket('ws://localhost:8080');

    client.onopen = () => {
        client.send(
            JSON.stringify({
                action: 'setName',
                data: name,
            })
        );
    };

    client.onclose = () => {
        clearInterval(checker);
        setOpen(true);
        setLoading(false);
        setError('Disconnected');
    };

    client.onmessage = (event) => {
        const req = JSON.parse(event.data);
        if (req.result === 'success' && setOpen && setMessageList) {
            setOpen(false);
            let messageList = req.data as Message[];
            messageList = messageList.sort((a, b) => {
                return parseInt(b.date) - parseInt(a.date);
            });
            setMessageList(messageList);
            client.onmessage = normalMessageHandler;
        } else {
            setOpen(true);
            setError(req.data);
        }
        setLoading(false);
    };
}
