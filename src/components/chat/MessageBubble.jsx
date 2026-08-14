import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
//----
import { COLORS, FONTS } from '../../globalStyle/Theme';
import SlideInView from '../../animations/SlideView';
import { Typography } from '../../atomComponents';

const MessageBubble = ({ item, isMe = true }) => {
  const { user } = useSelector(state => state.app);
  const me = item?.user?.id == user?.id;

  return (
    <SlideInView slide={me ? 'right' : 'left'} slideDuration={800}>
      <View
        style={[
          styles.listContainer,
          {
            flexDirection: me ? 'row-reverse' : 'row',
            alignSelf: me ? 'flex-end' : 'flex-start',
          },
        ]}
      >
        <Avatar.Image
          style={{ backgroundColor: me ? COLORS.primary : COLORS.grey }}
          size={40}
          source={{ uri: item?.user?.image }}
        />
        <View
          style={[
            styles.messageContainer,
            me
              ? { backgroundColor: COLORS.primary }
              : { backgroundColor: COLORS.primary },
          ]}
        >
          <Typography fFamily="poppinsSemiBold600" color="white" size={14}>
            {me ? 'Me' : 'Admin'}
          </Typography>
          <Typography color="white" size={12}>
            {item?.body}
          </Typography>
        </View>
      </View>
    </SlideInView>
  );
};

export default React.memo(MessageBubble);

const styles = StyleSheet.create({
  listContainer: { gap: 10, marginBottom: 16 },
  messageContainer: {
    padding: 10,
    borderRadius: 8,
    maxWidth: 250,
    minWidth: 80,
  },

  msgTime: {
    fontSize: 10,
    marginTop: 8,
    alignSelf: 'flex-end',
    fontFamily: FONTS.regular,
  },
});
