import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from 'app/Componets/Screens/auth/Auth';
import Err404 from 'app/Componets/Screens/system/err404';
import {useAuth} from 'app/hooks/useAuth';
import React, {FC, PropsWithChildren} from 'react';
import {TypeRootStackParamList} from './navigation.types';
import {routes, userRoutes} from './user.routes';
const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const PrivateNavigation: FC = () => {
    const { user } = useAuth()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: '#090909'
                }
            }}
        >
            {user ? (
                user.isAdmin ? (
                    routes.map(route => <Stack.Screen key={route.name} {...route} />)
                ) : (
                    userRoutes.map(route => <Stack.Screen key={route.name} {...route} />)
                )
            ) : (
                <Stack.Screen name='Auth' component={Auth} />
            )}
        </Stack.Navigator>
    )
}

export default PrivateNavigation;