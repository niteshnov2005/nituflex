import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface props{
    placeholder:string;
    onPress:() => void;
    value:string;
    onChangeText:(text:string) => void;
}

const SearchBar = ({placeholder,onPress,value,onChangeText}:props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
        <Image source={icons.search} className='size-5 resizeMode-contain tintcolor-"#ab8bff' />
        <TextInput
            placeholder={placeholder}
            onPress={onPress}
            onChangeText={onChangeText}
            value={value}
            placeholderTextColor='#ab8bff'
            className='flex-1 ml-2 text-white'
        />
    </View>
  )
}

export default SearchBar