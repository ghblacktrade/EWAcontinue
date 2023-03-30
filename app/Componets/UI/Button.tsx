import {Feather} from '@expo/vector-icons'
import cn from 'clsx'
import { LinearGradient } from 'expo-linear-gradient'
import {FC, PropsWithChildren} from 'react'
import {Pressable, Text} from 'react-native'

import {IButton} from './button.interface'

const Button: FC<PropsWithChildren<IButton>> = ({
                                                    className, icon, children, ...rest
                                                }) => {
    return (
        <Pressable className={cn('self-center mt-3.5', className)} {...rest}>
                {icon && <Feather name={icon} size={18} color='black' />}
                <Text
                    className={cn('text-black text-center font-medium text-lg', {
                        'ml-2': !!icon
                    })}
                >
                    {children}
                </Text>
        </Pressable>
    )
}

export default Button