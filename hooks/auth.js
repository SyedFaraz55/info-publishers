import React, { useEffect, useState } from "react";

export const UserAuth = React.createContext(null)


const UserContext = ({children})=> {
    const [user,setUser] = useState(null)
    const [local,setLocal] = useState(null)


    useEffect(()=> {
        setUser(JSON.parse(localStorage.getItem("@login")));
    },[]);

    const setLocalStorage = user => {
        localStorage.setItem('@login',JSON.stringify(user))
    }


    return <UserAuth.Provider value={{user,setUser,setLocalStorage}} >
        {children}
    </UserAuth.Provider>
}

export default UserContext;