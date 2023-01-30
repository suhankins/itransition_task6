export type Message = {
    sender: string,
    recipient: string,
    title: string,
    content: string,
    date: string,
    new: boolean | undefined
}