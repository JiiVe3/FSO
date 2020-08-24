let lastTimer

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'NOTIFY':
            return action.data
        case 'CLEAR':
            return ''
        default:
            return state
    }
}

export const notify = (notification, time = 5) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIFY',
            data: notification
        })
        clearTimeout(lastTimer)
        lastTimer = setTimeout(() => dispatch({type: 'CLEAR'}), time * 1000)
    }
}

export default notificationReducer