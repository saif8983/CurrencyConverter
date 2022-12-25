import {createSlice} from '@reduxjs/toolkit'

const formDataSlice= createSlice({
    name:'formData',
    initialState:[],
    reducers:{
        addObject:(state,action)=>{
          return  [...state,action.payload]
            
        },
       removeObject:(state,action)=>{
      return  state.filter((item)=>item.name!==action.payload)
       },
       updateObject:(state,action)=>{
        const index=state.findIndex(item=>item.name===action.payload.name)
        console.log(index)
        return state.slice(0, index).concat(action.payload).concat(state.slice(index + 1))
       }
    }
});

export const {addObject,removeObject,updateObject}=formDataSlice.actions
export default formDataSlice.reducer