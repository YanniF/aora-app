import {View, Text, ScrollView, Image, Alert} from 'react-native';
import { useState } from 'react'
import {Link, router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

import {images} from '../../constants'
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import {createUser, getCurrentUser, signIn} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitForm = async () => {
    if(!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields.');
    }

    setIsSubmitting(true)

    try {
      const {email, password} = form

      await signIn(email, password)

      const result = await getCurrentUser()

      setUser(result);
      setIsLoggedIn(true);

      router.replace('/home')
    }
    catch (error) {
      Alert.alert('Error', error.message)
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center h-full px-4 mt-10 mb-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">Log in to Aora</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={e => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={e => setForm({...form, password: e})}
            otherStyles="mt-7"
            keyboardType="password"
            type="password"
          />
          <CustomButton
            title="Sign In"
            containerStyles="mt-7"
            handlePress={submitForm}
            isLoading={isSubmitting}
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular pb-2">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
