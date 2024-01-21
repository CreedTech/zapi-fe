import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { APIType } from "../../types";
import Cookies from "universal-cookie"

const cookies = new Cookies()
const core_url = import.meta.env.VITE_CORE_URL

interface FreeApiState {
    freeApis: APIType[]
    isLoading: Boolean
    error?: any
}

const initialState: FreeApiState = {
    freeApis: [],
    isLoading: false,
    error: null
}

export const getFreeApis = createAsyncThunk('freeApis/getFreeApis', async(_, thunkAPI) => {
    const headers = { 'X-Zapi-Auth-Token': `Bearer ${cookies.get('accessToken')}` }
    try {
        const response = await fetch(`${core_url}/api/free-request`, {headers})
        const data = await response.json()
        return data.data
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

const freeApiSlice = createSlice({
    name: 'freeApis',
    initialState,
    reducers: {
        clearError: state => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFreeApis.pending, state => {
            state.isLoading = true
        }),
        builder.addCase(getFreeApis.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.freeApis = action.payload
        }),
        builder.addCase(getFreeApis.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export const { clearError } = freeApiSlice.actions
export default freeApiSlice.reducer