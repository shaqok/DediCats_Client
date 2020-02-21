import React from 'react';
import { inject, observer } from 'mobx-react';
import * as Font from 'expo-font';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import CatPost from './CatPost';
import CatPostInput from './CatPostInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6772f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radiusView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 25,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
  },
  keyboard: { width: '95%' },
  safeArea: {
    flex: 3,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
});

class CatPostList extends React.Component {
  state = { loading: true };

  componentDidMount() {
    console.log('CatPostList mount');
    this.props.getPostList();
  }

  loadFont = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
    });
    this.setState({ loading: false });
  };

  _renderItem = ({ item }) => (
    <CatPost
      catId={this.props.catId}
      item={item}
      setCatPost={this.props.setCatPost}
      convertDateTime={this.props.convertDateTime}
    />
  );

  renderFooter = () =>
    this.props.isLoadingPost ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <View />
    );

  render() {
    const {
      postList,
      _handleLoadMorePosts,
      isRefreshingPost,
      _handleRefresh,
    } = this.props;
    if (this.state.loading) {
      this.loadFont();
      return <View />;
    }
    return (
      <View style={styles.container}>
        <View style={styles.radiusView}>
          <KeyboardAvoidingView style={styles.keyboard}>
            <CatPostInput />
          </KeyboardAvoidingView>
          <SafeAreaView style={styles.safeArea}>
            <FlatList
              data={postList}
              renderItem={this._renderItem}
              keyExtractor={(item, idx) => `post_${item.id}_${idx}`}
              showsVerticalScrollIndicator={false}
              onEndReached={_handleLoadMorePosts}
              onEndReachedThreshold={0.3}
              ListFooterComponent={this.renderFooter}
              refreshing={isRefreshingPost}
              onRefresh={_handleRefresh}
              initialNumToRender={3}
            />
          </SafeAreaView>
        </View>
      </View>
    );
  }
}

export default inject(({ cat, post, helper }) => ({
  catId: cat.selectedCatBio[0].id,
  setCatPost: cat.setCatPost,
  postList: post.postList,
  getPostList: post.getPostList,
  _handleLoadMorePosts: post._handleLoadMorePosts,
  _handleRefresh: post._handleRefresh,
  isLoadingPost: post.isLoadingPost,
  isRefreshingPost: post.isRefreshingPost,
  convertDateTime: helper.convertDateTime,
}))(observer(CatPostList));
