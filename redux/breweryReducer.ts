import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Brewery, BreweryState } from '../interfaces'

const initialState: BreweryState = {
    breweries: [],
    clickedBrewery: null,
    error: '',
    status: 'pending'
}

export const fetchBreweries = createAsyncThunk('breweries/fetchBreweries', () => {
    return axios
        .get('https://api.openbrewerydb.org/breweries')
        .then(response => response.data)
})

const brewerySlice = createSlice({
    name: 'brewery',
    initialState,
    reducers: {
        breweryClicked: (state, action: PayloadAction<Brewery>) => {
            state.clickedBrewery = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(
            fetchBreweries.pending, 
            state => {
                state.status = 'loading'
            }
        )
        builder.addCase(
            fetchBreweries.fulfilled,
            (state, action: PayloadAction<Brewery[]>) => {
                state.status = 'success'
                state.breweries = action.payload
                state.error = ''
            }
        )   
        builder.addCase(
            fetchBreweries.rejected,
            (state, action) => {
                state.status = 'success'
                state.breweries = []
                state.error = action.error.message
            }
        )
    } 
})

export default brewerySlice.reducer
export const { breweryClicked } = brewerySlice.actions