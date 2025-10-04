import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const{ data : movies,
    loading:loadingMovies,
    error:errorMovies}=useFetch(() => fetchMovies({query:''}));

  return (
    <View className="flex-1 bg-black ">
        <Image source={images.bg} className="absolute w-full z-0"/>
        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:10,minHeight:'100%'}}>
          <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
           {loadingMovies?(<ActivityIndicator size="large" color="#ffffff" className="mt-20 "/>) 
            : errorMovies?(<Text className="text-red-500 text-center mt-20">{errorMovies.message}</Text>)
            : (
          <View className="flex-1 mt-5">
            <SearchBar
              placeholder="Search for a movie"
              onPress={() => {
                router.push("/search");
              }}
            />

           
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  data={movies}
                  
                  renderItem={({ item}) => (
                    <MovieCard 
                    {...item}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  scrollEnabled={false}
                  columnWrapperStyle={{ 
                    justifyContent: 'flex-start',
                    gap:20,
                    paddingRight:5,
                    marginBottom:10
                  }}
                   contentContainerStyle={{padding:1, paddingBottom:100}}
                />
              </View>
          </View>
            )
            }
        </ScrollView>
    </View>
  );
}
