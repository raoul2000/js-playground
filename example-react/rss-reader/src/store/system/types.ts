import { Action } from 'redux';

export const UPDATE_SESSION = '@system/UPDATE_SESSION'
export interface SystemState {
    loggedIn: boolean
    session: string
    userName: string
}
interface UpdateSessionAction extends Action {
    type: typeof UPDATE_SESSION
    payload: SystemState
}

export type SystemActionTypes = UpdateSessionAction