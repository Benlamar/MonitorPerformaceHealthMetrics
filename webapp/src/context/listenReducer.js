const initialState = {listening: false}

export default (state = initialState, action) => {
    switch(action.type) {
        case "listen":
            return {
                listening: action.payload
            }
        default:
            return state;
    }
}