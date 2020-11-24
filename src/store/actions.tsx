import constants from './constants'


export function storeUserName(username: string) {
    return { type: constants.SAVE_USERNAME, payload: username }
}
