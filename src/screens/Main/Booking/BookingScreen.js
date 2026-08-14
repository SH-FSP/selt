import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
//----
import {Container, Typography} from '../../../atomComponents';
import {Header} from '../../../components';
import {MyTabBar} from '../../../navigation/TopTabsNavigator';
import BookingItem from '../../../components/Cards/BookingItem';
import Sizer from '../../../helpers/Sizer';
import {useCustomQuery} from '../../../query/useCustomQuery';
import {getBookings} from '../../../api/bookingService';
import {ActivityIndicator} from 'react-native-paper';
import {WINDOW} from '../../../globalStyle/Theme';
import {nopreviousbookings, noupbookings} from '../../../assets/images';
import ListEmpty from '../../../atomComponents/ListEmpty';

const Tab = createMaterialTopTabNavigator();

const BookingScreen = ({navigation}) => {
  //Custom Query Hook:
  const {data: bookings, isLoading} = useCustomQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
  });

  return (
    <Container isPadding={false} isPaddingVertical={false} isTextureVisible>
      <Header type="app" title="My Bookings" />
      <View style={{width: '100%', height: '100%'}}>
        {isLoading ? (
          <View
            style={{
              height: WINDOW.height / 1.5,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={24} />
          </View>
        ) : (
          <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen
              name="Upcoming"
              children={() => (
                <Upcoming
                  upcomingBookings={bookings?.upcoming || []}
                  navigation={navigation}
                />
              )}
            />
            <Tab.Screen
              name="Previous"
              children={() => (
                <Previous
                  previousBookings={bookings?.past || []}
                  navigation={navigation}
                />
              )}
            />
          </Tab.Navigator>
        )}
      </View>
    </Container>
  );
};

const Upcoming = ({upcomingBookings, navigation}) => {
  // console.log('🚀 ~ upcomingBookings ~ route:', route.params?.upcomingBookings);

  return (
    <Container isTextureVisible isPaddingVertical={false}>
      <FlatList
        data={upcomingBookings}
        renderItem={({item}) => (
          <BookingItem
            item={item}
            onPressCard={() => {
              navigation.navigate('CheckoutScreen', {
                serviceDetail: item,
                selected: 'upcoming',
              });
            }}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <ListEmpty height={WINDOW.height / 2} vector={noupbookings} />
        }
      />
    </Container>
  );
};
const Previous = ({previousBookings, navigation}) => {
  // console.log('🚀 ~ previousBookings ~ route:', route.params?.previousBookings);

  return (
    <Container isTextureVisible isPaddingVertical={false}>
      <FlatList
        data={previousBookings}
        renderItem={({item}) => (
          <BookingItem
            item={item}
            onPressCard={() => {
              navigation.navigate('CheckoutScreen', {
                serviceDetail: item,
                selected: 'previous',
              });
            }}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <ListEmpty height={WINDOW.height / 2} vector={nopreviousbookings} />
        }
      />
    </Container>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  separator: {
    height: Sizer.vSize(15),
  },
  container: {
    paddingBottom: Sizer.vSize(300),
    flexGrow: 1,
  },
});
