import cn from 'clsx'
import { Controller } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'
import {IField} from "./filed.interface";


const Field = <T extends Record<string, any>>({
                                                  control,
                                                  rules,
                                                  name,
                                                  ...rest
                                              }: IField<T>): JSX.Element => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({
                         field: { value, onChange, onBlur },
                         fieldState: { error }
                     }) => (
                <>
                    <View
                        className={cn(
                            'bg-silver w-full border rounded pb-4 pt-2.5 px-4 my-1.5',
                            error ? 'border-red-500' : 'border-transparent'
                        )}
                    >
                        <TextInput
                            autoCapitalize={'none'}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={(value || '').toString()}
                            className='text-black text-base'
                            {...rest}
                        />
                    </View>
                    {error && <Text className='text-red-500'>{error.message}</Text>}
                </>
            )}
        />
    )
}

export default Field
