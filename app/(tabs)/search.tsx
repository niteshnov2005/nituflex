import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const search = () => {
  const [searchQuery, setsearchQuery] = useState('');

  const{ data :movies,
    loading,
    error,refetch,reset}=useFetch(() => fetchMovies({query:searchQuery}),false);


    useEffect(() => {
      const timeout = setTimeout(async() => {
        if(searchQuery.trim()){
          await refetch();
        }
        else{
          reset();
        }
      },500);
      return () => {
        clearTimeout(timeout);
      }
    }, [searchQuery])
    

  return (
    <View className='flex-1 bg-black'>
       <Image source={images.bg} className="absolute w-full z-0" />
        <FlatList
          data={movies}
           renderItem={({item}) => (
          <MovieCard 
          {...item}
         />
       )}
        keyExtractor={(item) => item.id.toString()}
       numColumns={3}
       columnWrapperStyle={{
        justifyContent: 'flex-start',
        gap:20,
        paddingRight:5,
        marginBottom:10
      }}
      contentContainerStyle={{padding:18, paddingBottom:100}}
       ListHeaderComponent={() => (
       <>
        <View className='flex-1 item-center justify-center '>
          <Image source={icons.logo} className='w-12 h-10 mt-[52px] mb-5 mx-auto'/>
        </View>
        <View className='mt-5'>
          <SearchBar
            placeholder='Search for a movie ...'
            value={searchQuery}
            onChangeText={(text:string) => setsearchQuery(text)}
          />
        </View>
          {loading &&(<ActivityIndicator size="large" color="#ffffff" className="mt-20 "/>)}
          {error && (<Text className="text-red-500 text-center mt-20">{error.message}</Text>)}
          {!loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length !== 0 && (
                <Text className="text-xl text-white font-semibold">
                  Search Results for {''}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
        </>
      )}
         ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

export default search