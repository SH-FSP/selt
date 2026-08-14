import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
//----
import {Flex} from '../../atomComponents';
import Sizer from '../../helpers/Sizer';
import {BASEOPACITY, IMAGEONLOADCOLOR} from '../../globalStyle/Theme';
import {play} from '../../assets/images';

const ImageGrid = ({images = [], onPressImage = () => {}}) => {
  // Separate images into two columns
  const leftColumn = [];
  const rightColumn = [];

  images.forEach((img, i) => {
    const type = img?.type;
    const imageComponent = (
      <TouchableOpacity
        key={i}
        disabled={!img?.video_id}
        style={styles.imageCont}
        activeOpacity={BASEOPACITY}
        onPress={() => {
          onPressImage(img?.video_id);
        }}>
        <Image
          source={{
            uri:
              type == 'image'
                ? img?.url
                : type == 'video'
                ? img?.thumbnail
                : img,
          }}
          style={styles.image}
          resizeMode="cover"
        />
        {img?.thumbnail && (
          <Image source={play} style={styles.playImg} resizeMode="contain" />
        )}
      </TouchableOpacity>
    );

    if (i % 2 === 0) {
      leftColumn.push(imageComponent);
    } else {
      rightColumn.push(imageComponent);
    }
  });

  return (
    <Flex
      direction="row"
      jusContent="space-between"
      mT={16}
      gap={Sizer.vSize(12)}>
      <Flex direction="column" extraStyle={{width: '48%', overflow: 'hidden'}}>
        {leftColumn}
      </Flex>
      <Flex direction="column" extraStyle={{width: '48%', overflow: 'hidden'}}>
        {rightColumn}
      </Flex>
    </Flex>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Sizer.hSize(150),
    height: Sizer.hSize(150),
    borderRadius: Sizer.hSize(12),
    ...IMAGEONLOADCOLOR,
  },
  playImg: {
    height: Sizer.vSize(40),
    width: Sizer.vSize(40),
    position: 'absolute',
  },
  imageCont: {
    borderRadius: Sizer.hSize(12),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Sizer.hSize(12),
  },
});

export default ImageGrid;
