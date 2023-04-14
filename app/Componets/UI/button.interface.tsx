import { PressableProps } from 'react-native'
import {TypeFeatherIconNames} from "../../../shared/types/icon.types";



export interface ButtonProps extends PressableProps {
    className?: string
    icon?: TypeFeatherIconNames
}
