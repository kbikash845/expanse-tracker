import React, { useState } from "react"

const AuthContext=React.createContext({
    token:'',
    isLonggedIn:false,
    login:(token)=>{},
    lonout:()=>{}

})

  export const AuthContextProvider=(props)=>{
    const [token,SetToken]=useState(null)

    const userIsLoggedn=!!token;

    const logingHandler=(token)=>{
        localStorage.setItem("token",token)
        SetToken(token)
    }

    const longoutHandler=()=>{
        SetToken(null)
        localStorage.removeItem('token')
    }

    const ContextValue={
        token:token, 
        isLonggedIn:userIsLoggedn,
        login:logingHandler,
        lonout:longoutHandler
    }
    return <AuthContext.Provider value={ContextValue}>{props.children}</AuthContext.Provider>
}


export default AuthContext;