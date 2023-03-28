import { TypeRootStackParamList } from 'app/navigation/navigation.types';
import React, { FC } from 'react';
import { View, Text} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TypeFeatherIconNames } from 'shared/types/icon.types';
import { menuItems } from './menu.data';
import { TypeNavigate } from './menu.interface';
import MenuItem from './MenuItem';

export interface IMenuSet {
    nav: TypeNavigate
    currentRoute?:  string
}



const Menu:FC<IMenuSet> = (props) => {
    const {bottom} = useSafeAreaInsets()
    return (
        <View className='pt-5 px-2 flex-row justify-betweenites-center w-full border-t border-t-solid
        border-t-[#959595] bg-red-600'
        style={{
            paddingBottom: bottom +5
        }}
        >
            {menuItems.map(item => (<MenuItem key={item.path} item={item} {...props}/>))}
        </View>
    );
};

export default Menu;