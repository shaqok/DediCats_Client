import React from 'react';
import { inject, observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#edf1f5',
  },
  photoView: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  photo: {
    width: '75%',
    height: '85%',
    resizeMode: 'stretch',
    overflow: 'hidden',
    borderRadius: 30,
  },
  infoView: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nickName: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 5,
  },
  address: {
    fontSize: 15,
    color: '#444444',
    marginBottom: 10,
  },
  btn: {
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#6772f1',
  },
  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const MyProfile = ({
  navigation,
  userInfo,
  signOut,
  convertDateTime,
  myUri,
}) => {
  console.disableYellowBox = 'true';
  console.log('프로필 렌더할 때 uri', myUri);
  if (!userInfo) {
    return <View style={styles.container} />;
  }
  const { nickname, createAt } = userInfo;
  const DEFAULT_USER_URL =
    'https://ca.slack-edge.com/T5K7P28NN-U5NKFNELV-g3d11e3cb933-512';

  return (
    <View style={styles.container}>
      <View style={styles.profileView}>
        <View style={styles.photoView}>
          <Image
            style={styles.photo}
            source={{
              uri: myUri || DEFAULT_USER_URL,
            }}
          />
        </View>
        <View style={styles.infoView}>
          <Text style={styles.nickName}>{nickname}</Text>
          <Text style={styles.address}>
            {`가입일 : ${convertDateTime(createAt).slice(0, 8)}`}
          </Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate('EditMyProfile');
            }}
          >
            <Text style={styles.btnTxt}>회원정보 수정</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              const result = await signOut();
              if (result) navigation.navigate('AuthLoading');
            }}
          >
            <Text style={{ paddingTop: 5, color: '#677ef1' }}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default inject(({ auth, helper, user }) => ({
  userInfo: auth.userInfo,
  signOut: auth.signOut,
  convertDateTime: helper.convertDateTime,
  myUri: user.myUri,
}))(observer(withNavigation(MyProfile)));
