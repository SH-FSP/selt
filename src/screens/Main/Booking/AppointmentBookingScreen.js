import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
//------.
import { Container, Flex, Typography } from '../../../atomComponents';
import { Button, Header } from '../../../components';
import { SubTitle } from '../../../components/Text/SubTitle';
import { COLORS, FONTS, GLOBALSTYLE } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import CartItemCard from '../../../components/Cards/CartItemCard';
import AppointmentSlotsComponent from '../../_partials/Booking/AppointmentSlotsComponent';
import ServiceSummary from '../../_partials/Booking/ServiceSummary';
import BookingTypeSelector from '../../_partials/Booking/BookingTypeSelector';
import { discountedPrice, isFeildEmpty, showMessage } from '../../../utils';
import { useCustomQuery } from '../../../query/useCustomQuery';
import {
  getBookingSlots,
  getServiceCategories,
  storeBooking,
} from '../../../api/bookingService';
import { useCustomMutation } from '../../../query/useCustomMutation';
import { queryClient } from '../../../api/api';
import { useQuery } from '@tanstack/react-query';
import AddOnsList from '../../_partials/Booking/AddOnsList';

const today = new Date().toISOString().split('T')[0];

const AppointmentBookingScreen = ({ navigation, route }) => {
  const serviceDetail = route.params?.serviceDetail;
  //Service categories Query Hook:
  const { data: serviceCategories } = useCustomQuery({
    queryKey: ['serviceCategories'],
    queryFn: getServiceCategories,
  });

  const [activeDate, setActiveDate] = useState(null);
  const [activeSlot, setActiveSlot] = useState(null);
  const [bookingTypeSelector, setBookingTypeSelector] = useState(
    serviceCategories?.[0]?.id,
  );
  const [selectedAddon, setSelectedAddon] = useState(null);

  //Custom Mutation Hook:
  const { mutate: requestStoreBooking, isPending: isStoreBookingLoading } =
    useCustomMutation({
      mutationFn: storeBooking,
      onSuccess: () => {
        navigation.replace('BookingSuccessScreen');
      },
    });

  //Custom Query Hook:
  const { data: bookingSlots, isLoading: isSlotLoading } = useQuery({
    queryKey: ['bookingSlots', serviceDetail?.id, activeDate],
    queryFn: ({ signal }) =>
      getBookingSlots(serviceDetail.id, activeDate, signal),
    enabled: !!activeDate,
  });

  const { salePrice, actualPrice, discountedAmount, discount } =
    discountedPrice(serviceDetail?.price, serviceDetail?.discount);

  const handleStoreBooking = () => {
    const data = {
      service_id: serviceDetail?.id,
      category_id: bookingTypeSelector,
      slot: activeSlot,
      booking_date: activeDate,
      ...(selectedAddon ? { addon: selectedAddon } : {}),
      // note: description,
    };
    // console.log("🚀 ~ handleStoreBooking ~ data:", data)

    if (!isFeildEmpty(data)) return;

    requestStoreBooking(data);
  };

  return (
    <Container isPaddingVertical={false} isPadding={false} isTextureVisible>
      <Header type="app" title="Book Appointment" />
      <ScrollView
        style={GLOBALSTYLE.paddingHor}
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        <SubTitle mTitle="Services" />
        <FlatList
          data={[0]}
          keyExtractor={() => Math.random()}
          style={{ marginTop: Sizer.vSize(15) }}
          renderItem={({ }) => (
            <CartItemCard isPressDisabled item={serviceDetail} />
          )}
          ItemSeparatorComponent={() => <View style={{ marginVertical: 4 }} />}
        />
        <SubTitle mTitle="Booking For" />
        <BookingTypeSelector
          onSetBookingType={setBookingTypeSelector}
          bookingTypeSelector={bookingTypeSelector}
          data={serviceCategories}
        />
        <SubTitle mTitle="Select Date" />
        <Calendar
          disableAllTouchEventsForDisabledDays
          disableAllTouchEventsForInactiveDays
          onMonthChange={() => {
            setActiveSlot(null);
            setActiveDate(null);
            queryClient.setQueryData(
              ['bookingSlots', serviceDetail?.id, activeDate],
              [],
            );
          }}
          minDate={new Date()}
          markedDates={{
            [today]: {
              customStyles: {
                text: {
                  color: COLORS.secondary,
                  fontFamily: FONTS.poppinsSemiBold600,
                },
              },
            },
            [activeDate]: {
              selected: true,
              selectedColor: COLORS.primary,
            },
          }}

          hideExtraDays
          style={{
            // backgroundColor: COLORS.black100,
            borderRadius: 10,
            paddingVertical: 8,
            marginTop: 16
          }}
          onDayPress={day => {
            setActiveDate(day.dateString);
            setActiveSlot(null);
          }}
          markingType={'custom'}
        />
        <SubTitle mTitle="Choose Start Time" />
        {isSlotLoading ? (
          <ActivityIndicator
            size="small"
            color={COLORS?.primary}
            style={{ marginTop: 10 }}
          />
        ) : (
          <FlatList
            // scrollEnabled={false}
            data={bookingSlots?.data || []}
            numColumns={2}
            bounces={false}
            style={{ marginTop: 20 }}
            contentContainerStyle={{
              gap: 10,
            }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (
              <AppointmentSlotsComponent
                item={item}
                setActiveSlot={setActiveSlot}
                activeSlot={activeSlot}
                newSlot={true}
              />
            )}
            ListEmptyComponent={
              <Typography size={14} color={COLORS.grey300}>
                No Slots Available
              </Typography>
            }
            ItemSeparatorComponent={<View style={{ marginHorizontal: 20 }} />}
            keyExtractor={(_, i) => i}
          />
        )}
        {serviceDetail?.addon?.length && (
          <>
            <SubTitle mTitle="Add-Ons" />
            <AddOnsList
              addonsData={serviceDetail?.addon || []}
              onSelectAdOn={setSelectedAddon}
              selectedAddon={selectedAddon}
            />
          </>
        )}
        <SubTitle mTitle="Price Details" />
        <ServiceSummary
          salePrice={salePrice}
          actualPrice={actualPrice}
          discountedAmount={discountedAmount}
          discount={discount}
          {...(activeSlot ? { dataTime: `${activeSlot}, ${activeDate}` } : {})}
        />
        <Button
          label="Proceed To Details"
          type={null}
          mb={20}
          mt={40}
          loader={isStoreBookingLoading}
          onPress={handleStoreBooking}
        />
      </ScrollView>
    </Container>
  );
};

export default AppointmentBookingScreen;

const styles = StyleSheet.create({
  bookingTypeItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white300,
    paddingVertical: Sizer.vSize(16),
    borderRadius: Sizer.vSize(10),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
