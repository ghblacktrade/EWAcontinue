import Home from "../Componets/Screens/Home/Home";
import Auth from '../Componets/Screens/auth/Auth'
import {IRoute} from "./navigation.types";
import { adminRoutes } from "./admin.routes";
import Classification from "../Componets/Screens/classification/Classification";
import Glossary from "../Componets/Screens/glossary/Glossary";
import Profile from "../Componets/Screens/notation/Profile";

export const userRoutes: IRoute[] = [
    {
        name: 'Home',
        component: Home
    },
    {
        name: 'Auth',
        component: Auth

    },
    {
        name: 'Classification',
        component: Classification
    },
    {
        name: 'Profile',
        component: Profile
    },
    {
        name: 'GlossaryOfTerms',
        component: Glossary
    }
 ]

export const routes = [
    ...userRoutes, ...adminRoutes
]