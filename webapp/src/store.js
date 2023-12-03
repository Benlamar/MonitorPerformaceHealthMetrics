import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import listenReducer from "./context/listenReducer";
import dataReducer from "./context/dataReducer";
import thunk from "redux-thunk";

const store = configureStore({
    reducer : {
        listenReducer: listenReducer,
        dataReducer: dataReducer
    },
    applyMiddleware : applyMiddleware(thunk)
})

export default store;