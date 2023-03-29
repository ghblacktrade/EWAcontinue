import React, {FC, useEffect, useState} from 'react';
import {NavigationContainer, useNavigationContainerRef} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {TypeRootStackParamList} from "./navigation.types";
import {userRoutes} from "./user.routes";
import PrivateNavigator from './PrivateNavigator';
import {useAuth} from '../hooks/useAuth';
import Menu from '../Componets/UI/menu/menu-icon/Menu';


const Navigation: FC = () => {

    const {user} = useAuth()
    const [currentRoute, setCurrentRoute] = useState<string | undefined>(undefined)
    const navRef = useNavigationContainerRef()


    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentRoute(navRef.getCurrentRoute()?.name)
        })
    })

    useEffect(() => {
            const listener = navRef.addListener('state', () =>
                setCurrentRoute(navRef.getCurrentRoute()?.name)
            )
            return () => {
                navRef.removeListener('state', listener)
            }
        }, [])

    return (
        <>
            <NavigationContainer ref={navRef}>
                <PrivateNavigator/>
            </NavigationContainer>
            {user && currentRoute && (
                <Menu nav={navRef.navigate} currentRoute={currentRoute}/>
            )}
        </>
    );
};


export default Navigation;