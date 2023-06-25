const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    name: "",
    email: "",
    phoneNumber: ""
}
const userFormData = createSlice({
    name: "userFormData",
    initialState,
    reducers: {
        add: (state, action) => {
            state.name = action.payload.name
            state.email = action.payload.email
            state.phoneNumber = action.payload.phoneNumber
        },

        updateState: (state, action) => {
            state[action.payload.name] = action.payload.value
        },

        reset: (state) => {
            state.name = ""
            state.email = ""
            state.phoneNumber = ""
        }
    }
})
export const { add, updateState, reset } = userFormData.actions
export default userFormData.reducer;