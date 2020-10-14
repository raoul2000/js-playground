import { Action } from 'redux';

export interface Message {
    user: string
    message: string
    timestamp: number
}

export interface ChatState {
    messages: Message[]
}
export interface SystemState {
    loggedIn: boolean
    session: string
    userName: string
}

export const SEND_MESSAGE = '@chat/SEND_MESSAGE'
export const DELETE_MESSAGE = '@chat/DELETE_MESSAGE'

interface SendMessageAction extends Action {
    type: typeof SEND_MESSAGE
    payload: Message
}

interface DeleteMessageAction extends Action {
    type: typeof DELETE_MESSAGE
    meta: {
        timestamp: number
    }
}

export type ChatActionTypes = SendMessageAction | DeleteMessageAction