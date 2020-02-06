import React from 'react';
import {
  withNavigation,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';

class AuthLoadingScreen extends React.Component {
  // lifecycle
  componentDidMount() {
    this.verifyToken();
  }

  async verifyToken() {
    const userToken = await AsyncStorage.getItem('userToken');
    // 토큰 붙으면 아래 지우고 옆의 내용으로 적용 return this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    return this.props.navigation.navigate(userToken ? 'App' : 'App');
  }

  render() {
    return (
      <View>
        <Text>Loading...</Text>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;