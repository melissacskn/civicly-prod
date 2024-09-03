import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from 'react-native-vector-icons';

const TopNavigationBar = ({ title }) => {
  const navigation = useNavigation();

  const openKebabMenu = () => {
    // Logic to open kebab menu
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <AntDesign name="menu-fold" size={28} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={openKebabMenu}>
        <MaterialIcons name="more-vert" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TopNavigationBar;
