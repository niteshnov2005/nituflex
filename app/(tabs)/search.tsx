import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { updateMovieCount } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const search = () => {


  const [searchQuery, setsearchQuery] = useState('');

  const{ data :movies,
    loading,
    error,refetch:loadmovies,reset}=useFetch(() => fetchMovies({query:searchQuery}),false);


  useEffect(() => {
  const timeoutId = setTimeout(() => {
    if (searchQuery.trim()) {
      loadmovies();
    } else {
      reset();
    }
  }, 500);

  return () => clearTimeout(timeoutId);
}, [searchQuery]);


useEffect(() => {
  if (movies && movies.length > 0 && searchQuery.trim()) {
    updateMovieCount(searchQuery, movies[0]);
  }
}, [movies]);
 
  return (
    <View className='flex-1 bg-black'>
       <Image source={images.bg} className="absolute w-full z-0" />
       <Image source={icons.logo} className='w-12 h-10 mt-20 mb-5 mx-auto'/>
       <View className='mt-5 px-5'>
          <SearchBar
            placeholder='Search for a movie'
            onPress={() => {}}
            value={searchQuery}
            onChangeText={(text:string) => setsearchQuery(text)}
          />
           {loading &&(<ActivityIndicator size="large" color="#ffffff" className="mt-20 "/>)}
          {error && (<Text className="text-red-500 text-center mt-20">{error.message}</Text>)}
          {!loading &&
              !error &&
              searchQuery.trim() && Array.isArray(movies) &&
              movies?.length > 0 && (
                <Text className="text-xl text-white font-semibold mb-5">
                  Search Results for {''}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}

        </View>
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
      
         ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-1 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
        className='mt-[5%] px-5'
      />
    </View>
  )
}

export default search