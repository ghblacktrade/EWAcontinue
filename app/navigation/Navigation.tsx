import React, {FC} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {TypeRootStackParamList} from "./navigation.types";
import {userRoutes} from "./user.routes";
import PrivateNavigation from './PrivateNavigation';



const Navigation: FC = () => {
    return (
        <NavigationContainer>
          <PrivateNavigation />
        </NavigationContainer>
    );
};

export default Navigation;