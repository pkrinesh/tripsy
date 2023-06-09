import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  FlatList,
} from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { AppBar, Scaffold } from '../src/components/base';
import { ASSETS } from '../src/common/constant';
import { useTrips } from '../src/zustand/trip-store';
import { EmptyState } from '../src/components/empty-state';

export default function Index() {
  const navigation = useNavigation();
  const trips = useTrips();

  return (
    <Scaffold>
      <AppBar title="Tripsy" showBackButton={false} titleStyle="text-2xl" />
      <View className="bg-brandLight justify-center items-center">
        <Image
          resizeMode="cover"
          className="w-screen h-[260px]"
          source={ASSETS.IMAGES.tripsyBanner2}
        />
      </View>
      <View className="flex-row justify-between items-center my-3 px-4">
        <Text className="font-[700] text-lg text-black">RECENT TRIPS</Text>
        <Link href="add-trip" asChild>
          <Pressable>
            <View className="bg-black py-3 px-6 rounded-full">
              <Text className="text-sm font-bold text-brandLight">
                Add New Trip
              </Text>
            </View>
          </Pressable>
        </Link>
      </View>
      <View className="flex-1 overflow-hidden">
        <FlatList
          className="self-center w-screen ml-7"
          data={trips}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'flex-start', marginTop: 10 }}
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState comment="Looks like you haven't had any trips yet!" />
          }
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('trip-expense', { item })}
              >
                <View className="bg-white mx-[6] p-2 rounded-2xl">
                  <Image
                    source={item.banner}
                    className="h-[130] w-[150]"
                    resizeMode="cover"
                  />
                  <View style={{ marginLeft: 10, marginTop: 5 }}>
                    <Text className="text-black font-semibold">
                      {item.place}
                    </Text>
                    <Text className="text-grey text-xs font-semibold">
                      {item.country}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Scaffold>
  );
}
