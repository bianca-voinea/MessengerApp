import { combineReducers } from 'redux'
import constants from './constants'

const userName = (state = [], action: any) => {
    if (action.type === constants.SAVE_USERNAME) {
        return action.payload
    } else {
        return state
    }
}


export default combineReducers({
    userName,
})