import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { COLORS, FONTS } from '../../globalStyle/Theme';
import Sizer from '../../helpers/Sizer';
import Icon from '../../helpers/Icon';
import { Flex } from '../../atomComponents';

const ChatInput = ({
  handleSend = () => {},
  inputValue = '',
  setInputValue = () => {},
  isLoading = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Flex
      algItems="center"
      extraStyle={{
        ...styles.contStyle,
        marginHorizontal: Sizer.vSize(18),
        borderColor: isFocused ? COLORS.primary : COLORS.grey300,
        backgroundColor: COLORS.whiteV1,
      }}
    >
      {/* <Icon
        name="plus-square"
        iconFamily="Feather"
        color={isFocused ? COLORS.primary : COLORS.grey300}
        size={18}
      /> */}
      <View style={styles.flex1}>
        <TextInput
          placeholder="Send your message"
          placeholderTextColor={COLORS.grey300}
          onChangeText={setInputValue}
          value={inputValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ ...styles.textInput, color: COLORS.black100 }}
        />
      </View>

      <TouchableOpacity
        activeOpacity={1}
        style={styles.sendBtn}
        disabled={!inputValue || isLoading}
        onPress={handleSend}
      >
        {isLoading ? (
          <ActivityIndicator size={20} color={COLORS.primary} />
        ) : (
          <Icon
            name="paper-plane"
            iconFamily="Entypo"
            size={24}
            color={inputValue ? COLORS.primary : COLORS.grey300}
          />
        )}
      </TouchableOpacity>
    </Flex>
  );
};

const styles = StyleSheet.create({
  contStyle: {
    borderWidth: Sizer.vSize(0.5),
    borderRadius: 12,
    paddingLeft: 12,
    paddingRight: 12,
    height: Sizer.hSize(45),
    marginBottom: 12,
    marginTop: 12,
  },
  flex1: {
    flex: 1,
  },
  textInput: {
    height: '100%',
    paddingHorizontal: 6,
    fontFamily: FONTS.latoRegular400,
  },
  sendBtn: {
    // Optional styling here if needed
  },
});

export default ChatInput;
