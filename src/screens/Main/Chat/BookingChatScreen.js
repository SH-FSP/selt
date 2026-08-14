import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Pusher} from '@pusher/pusher-websocket-react-native';
//----
import {WINDOW, COLORS, FONTS} from '../../../globalStyle/Theme';
import {Header} from '../../../components';
import Container from '../../../atomComponents/Container';
import {useKeyboard} from '../../../hooks/useKeyboard';
import Typography from '../../../atomComponents/Typography';
import MessageBubble from '../../../components/chat/MessageBubble';
import ChatInput from '../../../components/chat/ChatInput';
import {PUSHER} from '../../../constants';
import {onAuthorizer} from '../../../api/pusherService';
import {fetchAllMessages, sendMessage} from '../../../api/chatService';
import {useCustomMutation} from '../../../query/useCustomMutation';
import Sizer from '../../../helpers/Sizer';
import {useSelector} from 'react-redux';
import NoMessageSvg from '../../../assets/svgs/NoMessageSvg';

const BookingChatScreen = ({route}) => {
  const bookingId = route?.params?.booking_id;
  const bookingStatus = route?.params?.bookingStatus;

  const {keyboardOpen} = useKeyboard();
  const flatListRef = useRef(null);
  const subscriptionRef = useRef(null);
  const {user} = useSelector(state => state.app);

  const adminWithCustomer = {
    booking_id: bookingId,
    booking_type: 'appointment',
    to_id: '0', //admin
    is_customer: '1', //always customer
  };
  console.log('🚀 ~ BookingChatScreen ~ adminWithCustomer:', adminWithCustomer);

  const [messages, setMessages] = useState([]);

  const {mutateAsync: fetchMsgs, isPending} = useCustomMutation({
    mutationFn: fetchAllMessages,
  });

  //Custom Mutation Hook for Sending Messages:
  const {mutate: sendMsg, isPending: isSendMessagesPending} = useCustomMutation(
    {
      mutationFn: sendMessage,
      onSuccess: () => {
        // console.log('🚀 ~ BookingChatScreen ~  succes send message res:', res);
        setInputMessage('');
      },
    },
  );

  const [inputMessage, setInputMessage] = useState('');

  const initPusher = async () => {
    const pusher = Pusher.getInstance();

    await pusher.init({
      apiKey: PUSHER.API_KEY,
      cluster: PUSHER.CLUSTER,
      activityTimeout: 60000,
      onAuthorizer,
      onError: error => {
        console.error('🚨 ~ initPusher ~ subscription error:', error);
      },
      onSubscriptionError: error => {
        console.error('🚨 ~ initPusher ~ subscription error:', error);
      },
      onSubscriptionSucceeded: () => {
        console.log('✅ ~ initPusher ~ subscription succeeded!');
      },
    });

    await pusher.connect();

    subscriptionRef.current = await pusher.subscribe({
      channelName: PUSHER.CHANNEL_NAME,
      onEvent: event => {
        if (event.eventName === 'message') {
          const message = JSON.parse(event.data).message;
          const adminDetails = JSON.parse(event.data).adminDetails;

          const incomingMsg = {
            ...message,
            ...(adminDetails ? {user: adminDetails} : {}),
          };

          if (
            incomingMsg.booking_id === adminWithCustomer.booking_id &&
            incomingMsg.booking_type === adminWithCustomer?.booking_type
          ) {
            console.log('Incoming msg appended', incomingMsg);
            setMessages(prev => [incomingMsg, ...prev]);
          }
        }
      },
    });
  };

  const scrollToEnd = () => {
    flatListRef.current.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const fd = {
        ...adminWithCustomer,
        body: inputMessage,
      };

      sendMsg(fd);
    }
    scrollToEnd();
  };

  useEffect(() => {
    const fd = {
      ...adminWithCustomer,
    };
    initPusher();

    fetchMsgs(fd).then(allmessages => {
      setMessages(allmessages);
    });

    return () => {
      if (subscriptionRef.current) {
        const pusher = Pusher.getInstance();
        pusher.unsubscribe({channelName: PUSHER.CHANNEL_NAME});
        console.log('✅ ~ MyComponent ~ unsubscribed from channel');
        subscriptionRef.current = null;
      }
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      keyboardVerticalOffset={keyboardOpen ? -100 : null}
      behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}>
      <Container
        isPaddingVertical={false}
        isPadding={false}
        scrollable={false}
        conStyle={{
          paddingBottom: Platform.OS == 'ios' && !keyboardOpen ? 30 : 10,
        }}>
        <Header title="Admin" type="app" />

        <FlatList
          ref={flatListRef}
          scrollEnabled={!!messages?.length}
          data={messages}
          renderItem={({item}) => <MessageBubble item={item} />}
          ListEmptyComponent={({}) => (
            <View
              style={{
                height: WINDOW.height / 1.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {isPending ? (
                <ActivityIndicator
                  size="small"
                  color={COLORS?.primary}
                  // style={{marginTop: 10}}
                />
              ) : (
                <NoMessageSvg />
              )}
            </View>
          )}
          keyExtractor={item => item?.id?.toString()}
          inverted={messages?.length ? true : false}
          showsVerticalScrollIndicator={false}
          style={{marginTop: 15, paddingHorizontal: Sizer.hSize(8)}}
        />
        {/* Input and Send Button */}
        {bookingStatus !== 'previous' && (
          <ChatInput
            inputValue={inputMessage}
            setInputValue={setInputMessage}
            handleSend={handleSendMessage}
            isLoading={isSendMessagesPending}
          />
        )}
        {bookingStatus == 'previous' && (
          <View
            style={{
              alignItems: 'center',
              padding: 6,
              borderTopColor: 'lightsteelblue',
              borderTopWidth: 1,
            }}>
            <Typography
              style={{
                color: COLORS.grey300,
                fontSize: Sizer.vSize(15),
                fontFamily: FONTS.poppinsRegular400,
              }}>
              🔐 Booking Closed.
            </Typography>
          </View>
        )}
      </Container>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  chatMessageWrapper: {
    flex: 1,
  },
});

export default BookingChatScreen;
