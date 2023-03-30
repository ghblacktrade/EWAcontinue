import {ComponentType} from "react";

export type TypeRootStackParamList = {
    Auth: undefined
    Home: undefined
    Profile: undefined
    Search: undefined
    Classification: undefined
    RulesAndGuidelines: undefined
    GlossaryOfTerms: undefined
    Err404: undefined

} & TypeRootStackParamAdmin

 type TypeRootStackParamAdmin = {
    Admin: undefined
}

export interface IRoute {
    name: keyof TypeRootStackParamList
    component: ComponentType
    isAdmin?: boolean
}