import { createContext, useContext, useState } from "react";
import { executeBasicAuthenticationService } from "../api/HelloWorldApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}){
    const [isAuthenticated,setAuthenticated] = useState(false)
    const [username,setUsername] = useState(null)
    const [token, setToken] = useState(null)

    async function login(username,password){
        const baToken = 'Basic ' + window.btoa(username + ":" + password)

        try{
            const response = await executeBasicAuthenticationService(username,password)
            if(response.status == 200){
                setAuthenticated(true)
                setUsername(username)
                setToken(baToken)
                
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = baToken
                        return config
                    }
                )
            }else{
               logout()
                return false
            }

        }catch(error){
            logout()
            return false
        }



      /*   if(username === "zakaria" && password === "123"){
            setAuthenticated(true)
            setUsername(username)
            return true
        }else{
            setAuthenticated(false)
            setUsername(null)
            return false
        } */
    }
    
    function logout(){
        setAuthenticated(false)
    
    }    

    return(
        <AuthContext.Provider value={{login,isAuthenticated,logout,username,token}}>
            {children}
        </AuthContext.Provider>
        )
}