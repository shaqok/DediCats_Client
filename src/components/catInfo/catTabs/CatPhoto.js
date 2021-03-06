import React from 'react';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  defaultPhoto: {
    width: 105,
    height: 105,
    resizeMode: 'stretch',
    overflow: 'hidden',
    borderRadius: 5,
    marginHorizontal: 1,
  },
});

const DEFAULT_CAT =
  'https://dedicatsimage.s3.ap-northeast-2.amazonaws.com/DEFAULT_CAT.png';

const CatPhoto = ({ navigation, path, photo, selectPhoto }) => (
  <TouchableHighlight
    onPress={async () => {
      await selectPhoto(photo);
      navigation.navigate('PhotoModal');
    }}
  >
    <Image style={styles.defaultPhoto} source={{ uri: path || DEFAULT_CAT }} />
  </TouchableHighlight>
);

export default withNavigation(CatPhoto);
