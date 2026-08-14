import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//--------
import Sizer from '../../../helpers/Sizer';
import {BASEOPACITY, COLORS, FONTS} from '../../../globalStyle/Theme';
import {Typography} from '../../../atomComponents';

const DocumentItem = ({item, index, onPress, onRemove = true}) => {
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => onPress && onPress(item)}
          activeOpacity={BASEOPACITY}>
          <View style={[styles.docContainer]}>
            <Image
              source={{uri: item.uri}}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>

        {onRemove && (
          <TouchableOpacity
            activeOpacity={BASEOPACITY}
            style={styles.removeButton}
            onPress={() => onRemove(index)}>
            <Icon name="close-circle" size={16} color={'white'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const HorizontalDocumentPreview = ({
  images = [],
  onDocumentPress,
  onDocumentRemove,
  onOpenGallery,
}) => {
  if (images.length === 0) {
    return (
      <TouchableOpacity
        activeOpacity={BASEOPACITY}
        onPress={onOpenGallery}
        style={{
          ...styles.docContainer,
          backgroundColor: '#F6F8FF',
          paddingVertical: 8,
          paddingHorizontal: 8,
        }}>
        <Icon name="plus-circle" size={24} color="#014220" />
        <Typography
          mT={6}
          color="#014220"
          numberOfLines={1}
          adjustsFontSizeToFit>
          Add Images
        </Typography>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container]}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => `doc-${index}`}
        renderItem={({item, index}) => (
          <DocumentItem
            item={item}
            onPress={onDocumentPress}
            onRemove={onDocumentRemove}
            index={index}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={<View style={{marginHorizontal: 2}} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Sizer.vSize(15),
  },
  listContent: {
    alignItems: 'flex-start',
  },
  itemWrapper: {
    marginHorizontal: 8,
    // width: Sizer.vSize(70),
    alignItems: 'center',
  },
  itemContainer: {
    position: 'relative',
  },
  docContainer: {
    width: Sizer.vSize(102),
    height: Sizer.vSize(76),
    borderRadius: Sizer.vSize(8),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'lightgrey',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  fileTypeLabel: {
    fontSize: 10,
    color: COLORS.black,
  },
  fileName: {
    fontSize: 12,
    color: COLORS.black,
    fontFamily: FONTS.text_meduim,
    width: '100%',

    textAlign: 'center',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: -5,
    zIndex: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
  },
});

export default HorizontalDocumentPreview;
