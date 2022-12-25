import { configureStore } from '@reduxjs/toolkit';
import formDataSlice from './slice'
import objSlice from './objSlice';
export const store= configureStore({ 
    reducer:{ 
        form:formDataSlice,
        obj:objSlice
    }
});

