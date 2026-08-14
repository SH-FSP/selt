import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';

import Sizer from '../../../helpers/Sizer';
import { BASEOPACITY, COLORS } from '../../../globalStyle/Theme';
import { Flex, Typography } from '../../../atomComponents';
import Icon from '../../../helpers/Icon';

const StarFilter = ({
  onFilterChange = () => {},
  selectedFilter = 'all',
  containerStyle = {},
}) => {
  const [activeFilter, setActiveFilter] = useState(selectedFilter);

  const filterOptions = [
    { id: 'all', label: 'All', value: 'all' },
    { id: '5', label: '5', value: 5 },
    { id: '4', label: '4', value: 4 },
    { id: '3', label: '3', value: 3 },
    { id: '2', label: '2', value: 2 },
    { id: '1', label: '1', value: 1 },
  ];

  const handleFilterPress = filter => {
    setActiveFilter(filter.value);
    onFilterChange(filter.value);
  };

  const renderFilterButton = filter => {
    const isActive = activeFilter === filter.value;
    const isAll = filter.id === 'all';

    return (
      <TouchableOpacity
        key={filter.id}
        style={{
          backgroundColor: isActive ? COLORS.primary : 'transparent',
          borderWidth: 2,
          borderColor: isActive ? COLORS.primary : COLORS.grey100,
          borderRadius: Sizer.hSize(25),
          paddingVertical: Sizer.hSize(3),
          //   paddingVer: Sizer.hSize(3),
          marginRight: Sizer.vSize(12),
          minWidth: Sizer.hSize(60),
          boxSizing: 'content-box',
        }}
        onPress={() => handleFilterPress(filter)}
        activeOpacity={BASEOPACITY}
      >
        <Flex algItems="center" jusContent="center" gap={6}>
          <Icon
            name="star"
            size={Sizer.fS(16)}
            color={isActive ? COLORS.white100 : COLORS.grey100}
          />
          <Typography
            size={14}
            color={isActive ? COLORS.white100 : COLORS.grey100}
            fFamily="poppinsSemiBold600"
          >
            {filter.label}
          </Typography>
        </Flex>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        {
          paddingVertical: Sizer.hSize(15),
        },
        containerStyle,
      ]}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Flex direction="row" algItems="center">
          {filterOptions.map(renderFilterButton)}
        </Flex>
      </ScrollView>
    </View>
  );
};

export default StarFilter;
