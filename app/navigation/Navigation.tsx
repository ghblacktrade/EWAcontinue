import react, {FC} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {TypeRootStackParamList} from "./navigation.types";
import {userRoutes} from "./user.routes";
import PrivateNavigator from './PrivateNavigator';



const Navigation: FC = () => {
    return (
        <NavigationContainer>
          <PrivateNavigator />
        </NavigationContainer>
    );
};

export default Navigation;