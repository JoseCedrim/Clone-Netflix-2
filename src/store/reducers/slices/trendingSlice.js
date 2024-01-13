import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import axios from 'baseAxios'

export const trendingAdapter = createEntityAdapter()

export const fetchTrending = createAsyncThunk('trendingSlice/fetchTrending',
    async (_, { rejectWithValue }) => {
        try {
            const apiKey = 'ffb9cd11b4d0670af07fbe9d1b894317';

            const response = await axios.get(
              `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
            );
            return response.data.results
        } catch (error) {
            if (!error.response) {
                throw error
            }

            return rejectWithValue(error.response.data)
        }
    })

const trendingSlice = createSlice({
    name: 'trending',
    initialState: trendingAdapter.getInitialState({ error: null }),
    reducers: {},
    extraReducers: {
        [fetchTrending.fulfilled]: (state, action) => {
            trendingAdapter.upsertMany(state, action.payload)
        },

        [fetchTrending.rejected]: (state, action) => {
            if (action.payload) {
                state.error = action.payload.status_message
            } else {
                state.error = action.error
            }
        }
    }
})

export const {
    selectAll: selectAllTrendingVideos,
} = trendingAdapter.getSelectors(state => state.trending)

export const selectTrendingError = state => state.trending.error

export default trendingSlice.reducer
