import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { headers } from "./constant";
import { EndpointsType } from "../../types";
import { mockEndpoint } from "../../components/mockdata";
import Cookies from "universal-cookie"
const cookies = new Cookies()
const core_url = import.meta.env.VITE_CORE_URL
const apiId = ''

interface Endpoints {
    endpoints: Array<EndpointsType | null>
}

const initialState = {
    endpoints: mockEndpoint
} as Endpoints

const getEndpoints = createAsyncThunk('/getendpoints', async(_, thunkAPI) => {
    const headers = { 'X-Zapi-Auth-Token': `Bearer ${cookies.get('accessToken')}` }
    try {
        const response = await fetch(`${core_url}/endpoints/${apiId}`, {headers})
        const data = await response.json()
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const endpointSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        addEndpoint: (state, action: PayloadAction<any>) => {
            state.endpoints.unshift(action.payload)
        },
        removeEndpoint: (state, action: PayloadAction<any>) => {
            const id = action.payload
            state.endpoints = state.endpoints.filter(endpoint => endpoint?.id !== id)
        },
        editEndpoint: (state, action: PayloadAction<any>) => {
            const { id, name, method, route } = action.payload
            const endpoint = state.endpoints.find(endpoint => endpoint?.id === id)
            if(endpoint) {
                endpoint.name = name
                endpoint.method = method
                endpoint.route = route
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getEndpoints.pending, () => {}),
        builder.addCase(getEndpoints.fulfilled, (state, action: PayloadAction<any>) => {
            state.endpoints = action.payload
        }),
        builder.addCase(getEndpoints.rejected, () => {})
    }
})

export const { addEndpoint, removeEndpoint, editEndpoint } = endpointSlice.actions
export default endpointSlice.reducer