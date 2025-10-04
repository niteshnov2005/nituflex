import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({id, title, poster_path,vote_average,release_date }:Movie) => {
  return (
    <Link href={`./movies/${id}`} asChild>
        <TouchableOpacity className="w-[30%]">
            {poster_path?(
            <Image 
                source={{uri:`https://image.tmdb.org/t/p/w500${poster_path}`}} className="w-full h-52 rounded-lg mb-2"/>
            )
          :(
          <Image
            source={{uri:'https://via.placeholder.com/600x400/1a1a1a/ffffff.png'}}
            className="w-full h-52 rounded-lg mb-2" resizeMode='cover'
          />
        )
            }
         <Text className="text-white" numberOfLines={1}>{title}</Text>
         <View className='flex-row items-center justify-start gap-1'>
            <Image source={icons.star} className='w-3 h-3'/>
            <Text className='text-[12px] text-gray-300'>{Math.round(vote_average/2)}</Text>
         </View>
         <View className="flex-row items-center justify-between mt-1">
            <Text className='text-[12px] text-gray-300'>{release_date.split('-')[0]}</Text>
            <Text className='text-[12px] text-gray-300'>Movie</Text>
         </View>
        </TouchableOpacity>
    </Link>
  )
}

export default MovieCard