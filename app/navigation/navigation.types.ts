import {ComponentType} from "react";

export type TypeRootStackParamList = {
    Auth: undefined
    Home: undefined

} & TypeRootStackParamAdmin

 type TypeRootStackParamAdmin = {
    Admin: undefined
}

export interface IRoute {
    name: keyof TypeRootStackParamList
    component: ComponentType
    isAdmin?: boolean
}