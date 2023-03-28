import Home from "../Componets/Screens/Home/Home";
import Auth from '../Componets/Screens/auth/Auth'
import {IRoute} from "./navigation.types";
import { adminRoutes } from "./admin.routes";
import Classification from "../Componets/Screens/classification/Classification";
import Rules from "../Componets/Screens/rulesAndGuidelines/Rules";
import Notation from "../Componets/Screens/notation/Notation";
import Glossary from "../Componets/Screens/glossary/Glossary";

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
        name: 'RulesAndGuidelines',
        component: Rules
    },
    {
        name: 'Notation',
        component: Notation
    },
    {
        name: 'GlossaryOfTerms',
        component: Glossary
    }
 ]

export const routes = [
    ...userRoutes, ...adminRoutes
]