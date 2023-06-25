import userSlice from "./userSlice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer: {
        user: userSlice
    }

})