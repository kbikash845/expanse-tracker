import { createSlice } from "@reduxjs/toolkit"
const initialAuthState={
    isAuthentication:false,
    ispremium:false,
    // userEmail: null,
    
};

const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
      login(state,action) {
        state.isAuthentication=true;
        // state.userEmail = action.payload.email;
        localStorage.setItem("token",action.payload)
      } ,
      lonout(state){
        state.isAuthentication=false;
        // state.userEmail = null;
        localStorage.removeItem("token")
      },
      ispremium(state,action){
        if(action.payload>10000){
            state.ispremium=true
        }else{
            state.ispremium=false
        }
    },
    }
   

});

export const authAction=authSlice.actions;
export default authSlice.reducer;