export const startListening = {
    type: 'listen',
    payload: true
}

export const stopListening = {
    type: 'listen',
    payload: false
}

export const fetchData = {
    type: 'data',
    payload: []
}

export const pushData = (newdata)=> {
    return {
        type: 'pushdata',
        payload: newdata
    }
}
