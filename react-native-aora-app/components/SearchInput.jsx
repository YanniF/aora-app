import {View, TextInput, TouchableOpacity, Image} from "react-native";

import {icons} from "../constants";

const SearchInput = ({ value, handleChangeText, placeholder = 'Search...' }) => {
  return (
    <View
      className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center space-x-4">
      <TextInput
        className="text-base mt-.5 text-white flex-1 font-pregular"
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        value={value}
        onChangeText={handleChangeText}
      />
      <TouchableOpacity>
        <Image
          source={icons.search}
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput
