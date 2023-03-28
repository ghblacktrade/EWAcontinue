import React, {createContext, FC, PropsWithChildren, useEffect, useState} from 'react';
import {View} from "react-native";
import {IContext, TypeUserState} from "./auth-provider.interface";
import * as SplashScreen from 'expo-splash-screen'
import { IUser } from 'shared/types/user.interface';


export const AuthContext = createContext({} as IContext)

let ignore = SplashScreen.preventAutoHideAsync()

const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {

    const [user, setUser] = useState<TypeUserState>({} as IUser)

    useEffect(() => {

        let isMounted = true

        const checkAccessToken = async () => {
            try {

            } catch {
            } finally {
                await SplashScreen.hideAsync()
            }
        }
        let ignore = checkAccessToken()

        return () => {
            isMounted = false
        }
    }, [])


    return (
    <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>

        )
};

export default AuthProvider;