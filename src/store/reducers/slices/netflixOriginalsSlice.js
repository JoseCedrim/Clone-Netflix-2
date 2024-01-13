import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import axios from 'baseAxios'

export const netflixAdapter = createEntityAdapter()

export const fetchNetflixOriginals = createAsyncThunk('netflixOriginalsSlice/fetchNetflixOriginals',
    async (_, { rejectWithValue }) => {
        try {
            const apiKey = 'ffb9cd11b4d0670af07fbe9d1b894317';
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_networks=213&include_null_first_air_dates=false`
            )
            return response.data.results
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    })

const netflixOriginalsSlice = createSlice({
    name: 'netflixOriginals',
    initialState: netflixAdapter.getInitialState({ error: null }),
    extraReducers: {
        [fetchNetflixOriginals.fulfilled]: (state, action) => {
            netflixAdapter.upsertMany(state, action.payload)
        },

        [fetchNetflixOriginals.rejected]: (state, action) => {
            if (action.payload) {
                state.error = action.payload.status_message
            } else {
                state.error = action.error
            }
        }
    }
})

export const {
    selectAll: selectAllNetflixOriginals
} = netflixAdapter.getSelectors(state => state.netflixOriginals)
export const selectNetflixError = state => state.netflixOriginals.error

export default netflixOriginalsSlice.reducer 