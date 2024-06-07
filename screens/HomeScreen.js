import React from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';

const DATA = [
  { id: '1', user: 'user1', imageUrl: 'https://via.placeholder.com/400', likes: 120, caption: 'Nice view!' },
  { id: '2', user: 'user2', imageUrl: 'https://via.placeholder.com/400', likes: 80, caption: 'Beautiful sunset!' },
  // More data
];

const Post = ({ post }) => (
  <View style={styles.post}>
    <Image source={{ uri: post.imageUrl }} style={styles.image} />
    <Text style={styles.likes}>{post.likes} likes</Text>
    <Text style={styles.caption}>
      <Text style={styles.user}>{post.user} </Text>
      {post.caption}
    </Text>
  </View>
);

const HomeScreen = () => (
  <FlatList
    data={DATA}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <Post post={item} />}
    contentContainerStyle={styles.container}
  />
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  post: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  likes: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  caption: {
    marginTop: 5,
  },
  user: {
    fontWeight: 'bold',
  },
});

export default HomeScreen;
