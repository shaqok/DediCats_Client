import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Image,
} from 'react-native';
import { Form, Textarea } from 'native-base';
import { SimpleLineIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '95%',
  },
  inputForm: {
    borderWidth: 2,
    width: '100%',
    borderRadius: 5,
    borderColor: '#edf1f5',
  },
  inputBottomView: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  imageView: {
    width: '80%',
    flexDirection: 'row',
  },
  removeBtn: {
    position: 'absolute',
    zIndex: 1,
    top: -5,
    right: -5,
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: '#f38847',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  removeBtnTxt: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'stretch',
    overflow: 'hidden',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#edf1f5',
  },
  addImageBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageIcon: { fontSize: 30, paddingLeft: 10, color: '#677ef1' },
  addImageTxt: { fontSize: 14, color: '#677ef1', paddingLeft: 5 },
  submitBtn: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 20,
    marginRight: 30,
    padding: 10,
    margin: 0,
    backgroundColor: '#677ef1',
    borderRadius: 10,
  },
  submitBtnTxt: {
    color: 'white',
    fontSize: 17,
  },
  paddingTop5: {
    paddingTop: 5,
  },
});

const CatPostInput = ({
  inputContent,
  uri,
  updateInput,
  getPermissionAsync,
  pickImage,
  removePhoto,
  validateAddInput,
  addPost,
}) => (
  <View style={styles.container}>
    <View style={styles.inputView}>
      <Form style={styles.inputForm}>
        <Textarea
          rowSpan={inputContent.length > 27 ? 4 : 2}
          placeholder="글을 입력해주세요."
          value={inputContent}
          onChangeText={text => updateInput('info', 'inputContent', text)}
        />
      </Form>
      <View>
        <View style={styles.inputBottomView}>
          <View style={styles.imageView}>
            {uri ? (
              <View>
                <TouchableHighlight
                  style={styles.removeBtn}
                  underlayColor="#ffece0"
                  onPress={removePhoto}
                >
                  <Text style={styles.removeBtnTxt}>X</Text>
                </TouchableHighlight>
                <Image style={styles.image} source={{ uri }} />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addImageBtn}
                onPress={async () => {
                  await getPermissionAsync();
                  pickImage('info');
                }}
              >
                <SimpleLineIcons style={styles.imageIcon} name="picture" />
                <Text style={styles.addImageTxt}>이미지 첨부(1장)</Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => {
                const validation = validateAddInput('inputContent');
                console.log(validation);
                if (validation) {
                  addPost();
                }
              }}
            >
              <Text style={styles.submitBtnTxt}>등록</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.paddingTop5} />
      </View>
    </View>
  </View>
);

export default inject(({ cat }) => ({
  inputContent: cat.info.inputContent,
  uri: cat.info.uri,
  updateInput: cat.updateInput,
  getPermissionAsync: cat.getPermissionAsync,
  pickImage: cat.pickImage,
  removePhoto: cat.removePhoto,
  validateAddInput: cat.validateAddInput,
  addPost: cat.addPost,
}))(observer(CatPostInput));
