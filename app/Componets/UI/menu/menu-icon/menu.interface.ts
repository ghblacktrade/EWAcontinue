import { TypeRootStackParamList } from "app/navigation/navigation.types"
import { TypeFeatherIconNames } from "shared/types/icon.types"

export interface IMenu  {
    iconName: TypeFeatherIconNames
    path: keyof TypeRootStackParamList
}

export type TypeNavigate = (screenName: keyof TypeRootStackParamList) => void