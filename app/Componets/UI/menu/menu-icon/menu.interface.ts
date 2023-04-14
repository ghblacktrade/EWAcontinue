import { TypeRootStackParamList } from "app/navigation/navigation.types"
import { TypeFeatherIconNames } from "shared/types/icon.types"

export interface MenuProps  {
    iconName: TypeFeatherIconNames
    path: keyof TypeRootStackParamList
}

export type TypeNavigate = (screenName: keyof TypeRootStackParamList) => void