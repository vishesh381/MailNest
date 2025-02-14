import { createSlice } from "@reduxjs/toolkit"

const appSlice = createSlice({
    name: "app",
    initialState: {
        open: false,
        user: null,
        emails: [],
        selectedEmail: null,
        searchText:"",
    },
    reducers: {
        // actions
        setOpen: (state, action) => {
            state.open = action.payload
        },
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },
        setEmails: (state, action) => {
            state.emails = action.payload;
        },
        setSelectedEmail: (state, action) => {
            state.selectedEmail = action.payload;
        },
        setSearchText:(state,action) => {
            state.searchText = action.payload;
        },
        // New action to set the theme
        setTheme: (state, action) => {
            state.theme = action.payload;  // Handle theme change
        }
    }
});
export const { setOpen, setAuthUser, setEmails, setSelectedEmail, setSearchText,setTheme } = appSlice.actions;
export default appSlice.reducer;