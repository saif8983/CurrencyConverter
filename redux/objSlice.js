import {createSlice} from '@reduxjs/toolkit'

const objDataSlice= createSlice({
    name:'objData', 
    initialState:{},
    reducers:{
        
       editObject:(state,action)=>{
        return state=action.payload
      
       },
       emtyToObject:(state,action)=>{
        return state=action.payload
       }
    }
});

export const {editObject,emtyToObject}=objDataSlice.actions
export default objDataSlice.reducer