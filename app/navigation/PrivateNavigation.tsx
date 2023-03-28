import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from 'app/Componets/Screens/auth/Auth';
import Err404 from 'app/Componets/Screens/system/err404';
import { useAuth } from 'app/hooks/useAuth';
import React, {FC, PropsWithChildren} from 'react';
import {TypeRootStackParamList} from './navigation.types';
import {routes, userRoutes} from './user.routes';

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const PrivateNavigation: FC = () => {
    const {user}  = useAuth()

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            contentStyle: {
                backgroundColor: '#2f3c3d'
            }
        }}>
            {user ? routes.map(route => user.isAdmin || !route.isAdmin ? (
                <Stack.Screen key={route.name} {...route} />
            ) : <Stack.Screen key='Err404'
                              name='Err404'
                              component={Err404} />
            ) : (
                <Stack.Screen name='Auth' component={Auth} />
            )}
        </Stack.Navigator>
    );
};

export default PrivateNavigation;