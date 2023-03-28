import React, {FC, useState} from 'react';
import {Pressable, Text, View} from "react-native";
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuthFormData} from "../../../../shared/types/auth.interface";
import Loader from "../../UI/Loader";
import Button from "../../UI/Button";
import TestComponent from "../admin/home/TestComponent";
import AuthFields from "./AuthFields";
import DismissKeyboard from "../../UI/form-elements/fields/DismissKeyboard";

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
        <View className='mx-10 items-center justify-center h-full '>
            <View className='w-9/12'>
                <Text className='text-center text-black text-4xl font-bold mb-2.5'>
                    {isReg ? 'Register' : 'Login'}
                </Text>
                {isLoading ? (
                    <Loader/>
                ) : (
                    <>
                        <AuthFields control={control} isPassRequired  />
                        <Button className='rounded-lg border-2 p-2 left-0.5' onPress={handleSubmit(onSubmit)}>
                            Go to watch
                        </Button>
                        <Pressable onPress={() => setIsReg(!isReg)}>
                            <Text className='text-black opacity-30 text-right text-base mt-3'>
                                {isReg ? 'Login' : 'Register'}
                            </Text>
                        </Pressable>
                    </>
                )}
            </View>
        </View>
            </DismissKeyboard>

    )
}

export default Auth;