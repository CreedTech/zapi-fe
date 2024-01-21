import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AnalyticsLog, AnalyticsType } from "../../types";
// import { headers } from "./constant";
import Cookies from "universal-cookie"
const cookies = new Cookies()
const core_url = import.meta.env.VITE_CORE_URL
interface AnalyticState {
    analytics: AnalyticsType | any
    analyticsLog: Array<AnalyticsLog>
    isLoading: Boolean
    error?: any
}

const initialState: AnalyticState = {
    analytics: {},
    analyticsLog: [],
    isLoading: false,
    error: null
}

export const getAnalytics = createAsyncThunk('analytics/getAnalytics', async(apiId: any, thunkAPI) => {
    const headers = { 'X-Zapi-Auth-Token': `Bearer ${cookies.get('accessToken')}` }
    try {
        const response = await fetch(`${core_url}/analytics/api/${apiId}`, {headers})
        const data = await response.json()
        return data.data
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const getAnalyticsLog = createAsyncThunk('analyticsLog/getAnalyticsLog', async(id: any, thunkAPI) => {
    const headers = { 'X-Zapi-Auth-Token': `Bearer ${cookies.get('accessToken')}` }
    try {
        const response = await fetch(`${core_url}/analytics/logs?page=1&limit=5&filter.apiId=${id}`, {headers})
        const data = await response.json()
        return data.data
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

const analyticSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        clearError: state => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAnalytics.pending, state => {
            state.isLoading = true
        }),
        builder.addCase(getAnalytics.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.analytics = action.payload
        }),
        builder.addCase(getAnalytics.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.error = action.payload
        }),
        builder.addCase(getAnalyticsLog.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.analyticsLog = action.payload
        })
    }
})

export const { clearError } = analyticSlice.actions
export default analyticSlice.reducer