import Home from "../Componets/Screens/Home/Home";
import {IRoute} from "./navigation.types";
 import Auth from "../Componets/Screens/auth/Auth";
import { adminRoutes } from "./admin.routes";

export const userRoutes: IRoute[] = [
    {
        name: 'Home',
        component: Home
    },
    {
        name: 'Auth',
        component: Auth

    },
 ]

export const routes = [
    ...userRoutes, ...adminRoutes
]