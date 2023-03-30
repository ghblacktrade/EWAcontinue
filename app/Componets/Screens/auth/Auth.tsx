import React, {FC, useState} from 'react';
import {Pressable, Text, View} from "react-native";
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuthFormData} from "../../../../shared/types/auth.interface";
import Loader from "../../UI/Loader";
import Button from "../../UI/Button";
import AuthFields from "./AuthFields";
import DismissKeyboard from "../../UI/form-elements/fields/DismissKeyboard";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TypeRootStackParamList } from 'app/navigation/navigation.types';

const Auth: FC = () => {
    const [isReg, setIsReg] = useState(false)

    const {handleSubmit, reset, control} = useForm<IAuthFormData>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<IAuthFormData> = ({email, password}) => {

    }
    const isLoading = false

    return (
        <DismissKeyboard>
        <View className='mx-10 items-center justify-center h-full'>
            <View className='w-9/12'>
                <Text className='text-center text-black text-4xl font-bold mb-2.5 text-blue-600'>
                    {isReg ? 'Sign Up' : 'Sign In'}
                </Text>
                {isLoading ? (
                    <Loader/>
                ) : (
                    <>
                        <AuthFields control={control} isPassRequired  />
                        <Button className='rounded-lg border-2 p-2 left-0.5 border-black-500 bg-white' onPress={handleSubmit(onSubmit)}>
                            <Text>
                                Sign In
                            </Text>
                        </Button>
                        {/*<Pressable onPress={() => setIsReg(!isReg)}>*/}
                        {/*    <Text className='text-white  text-right text-base mt-3 colors-#2563eb'>*/}
                        {/*        {isReg ? 'Sign In' : 'Sign Up'}*/}
                        {/*    </Text>*/}
                        {/*</Pressable>*/}
                    </>
                )}
            </View>
        </View>
            </DismissKeyboard>
    )
}

export default Auth;