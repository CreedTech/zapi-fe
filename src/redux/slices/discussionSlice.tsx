import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

import { DiscussionType } from "../../types";

const core_url = import.meta.env.VITE_CORE_URL
const cookies = new Cookies()

interface DiscussionState {
    discussion: Array<DiscussionType | null>
    loading: "idle" | "pending" | "fulfilled" | "rejected"
    error?: any
}

const initialState: DiscussionState = {
    discussion: [],
    loading: "idle",
    error: null,
}

export const getDiscussions = createAsyncThunk("/getapidiscussions", async (apiId: any, thunkAPI) => {
    const headers = { 'X-Zapi-Auth-Token': `Bearer ${cookies.get('accessToken')}` }
    try {
        const response = await fetch(`${core_url}/dev-platform-data/discussion/api/${apiId}`, { headers })//sendRequest() function needs to replace this
        const data = await response.json()
        const discussions = data?.data.discussions
        return discussions
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message)
    }
})


const discussionSlice = createSlice({
    name: "discussion",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getDiscussions.pending, state => {
            state.loading = "pending"
        }),
            builder.addCase(getDiscussions.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = "fulfilled"
                state.discussion = action.payload
            }),
            builder.addCase(getDiscussions.rejected, (state, action: PayloadAction<any>) => {
                state.loading = "rejected"
                state.error = action.payload
            })
    },
    reducers: {
        clearError: state => {
            state.error = null
        },
        addDiscussion: (state, action: PayloadAction<any>) => {
            state.discussion.unshift(action.payload)
        },
        removeDiscussion: (state, action: PayloadAction<any>) => {
            const id = action.payload
            state.discussion = state.discussion.filter(discussion => discussion?.id !== id)

        },
        editDiscussion: (state, action: PayloadAction<any>) => {
            const { id, title, body, createdOn } = action.payload
            const discussion = state.discussion.find(discussion => discussion?.id === id)
            if (discussion) {
                discussion.title = title
                discussion.body = body
                discussion.createdOn = createdOn
            }
        },

    },
})

export const { clearError, addDiscussion, removeDiscussion, editDiscussion } = discussionSlice.actions
export default discussionSlice.reducer
