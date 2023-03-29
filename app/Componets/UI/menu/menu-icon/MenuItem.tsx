import {getColor} from '../../../../config/colors.config';
import {TypeRootStackParamList} from 'app/navigation/navigation.types';
import React, {FC} from 'react';
import {Pressable, Text} from 'react-native';
import {IMenu, TypeNavigate} from './menu.interface';
import { Feather } from '@expo/vector-icons'


interface IMenuItem {
    item: IMenu,
    nav: TypeNavigate
    currentRoute?: string
}

const MenuItem: FC<IMenuItem> = ({currentRoute, item, nav}) => {
    const isActive = currentRoute === item.path

    return (
        <Pressable className='items-center w-[20%]' onPress={() => nav(item.path)}>
            <Feather name={item.iconName} size={26} color={isActive ? getColor('green') : getColor('red')} />
        </Pressable>
    );
};

export default MenuItem;