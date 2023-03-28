import React, {FC} from 'react';
import {View, Text} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

const TestComponent :FC= () => {
    return (
        <View>
            <LinearGradient
                start={{ x: 0, y: 0.75 }}
                end={{ x: 1, y: 0.25 }}
                className='w-full py-3 px-8 rounded-2xl items-center'
                colors={['#DC3F41', '#a6282b']}
            >
                <Text> Какой-нибудь текст</Text>
            </LinearGradient>
        </View>
    );
};

export default TestComponent;