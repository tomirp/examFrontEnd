import { combineReducers } from 'redux'

const init = {
    id : '',
    username : '',
    error : '',
    success : ''
}

const Authreducer =(state = init, action)=> {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...state, id: action.payload.id, username: action.payload.username}

        case 'LOGOUT_SUCCESS':
            return {...state, ...init}
        
        case 'AUTH_ERROR' :
            return {...state, error: action.payload, success:''}
        
        case 'AUTH_SUCCESS' :
            return {...state, error:'', success: action.payload}
        
        case 'SET_TIMEOUT' :
            return {...state, error:'', success:''}

        case 'ADD_PRODUCT' :
            return {...state, error:'', success: action.payload}
    
        default :
            return state
    }
}

export default combineReducers(
    {
        Auth : Authreducer
    }
)