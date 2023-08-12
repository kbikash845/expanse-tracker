import { createSlice } from "@reduxjs/toolkit"
const initialAuthState={
    isAuthentication:!!localStorage.getItem("token"),
    ispremium:false,
    
};

const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
      login(state,action) {
        state.isAuthentication=true;
        localStorage.setItem("token",action.payload)
      } ,
      lonout(state){
        state.isAuthentication=false;
        localStorage.removeItem("token")
      },
      ispremium(state,action){
        if(action.payload>1000){
            state.ispremium=true
        }else{
            state.ispremium=false
        }
    },
    }
   

});

export const authAction=authSlice.actions;
export default authSlice.reducer;