import {FlatList, Image, TouchableOpacity, View} from "react-native";
import {icons} from "../../constants";
import {EmptyState, VideoCard} from "../../components";
import {SafeAreaView} from "react-native-safe-area-context";
import useAppwrite from "../../lib/useAppwrite";
import {getUserPosts, signOut} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";
import InfoBox from "../../components/InfoBox";
import {router} from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user?.$id))

  const logout = async () => {
    await signOut()

    router.replace('/sign-in')

    setUser(null)
    setIsLoggedIn(false)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            id={item.$id}
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator?.username}
            avatar={item.creator.avatar}
            likedBy={item.likedBy}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts.length}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.6k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Profile
