import React, { useState, useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';  // Use useFocusEffect for data refresh on focus
import AntDesign from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fetchAuthSession, signOut } from 'aws-amplify/auth';  
import { Colors } from '../components/stylesSignUp';  
import { TenantContext } from '../components/TenantContext';  
import { LogInContext } from '../navigators/RootStack';  
import config from '../src/config';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const { tenantName } = useContext(TenantContext);  
  const setIsUser = useContext(LogInContext);  

  // Fetch user data
  const fetchUserData = async () => {
    try {
      setLoading(true);  // Show loading indicator
      const session = await fetchAuthSession({ forceRefresh: true });
      if (!session || !session.tokens) throw new Error('Session tokens are undefined');

      const accessToken = session.tokens.accessToken.toString();
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const response = await fetch(`${config.CORE_BASE_URL_DEV}/user/`, {
        method: "GET",
        headers: myHeaders,
      });

      const result = await response.json();
      setFirstName(result.firstname || "User");
      setLastName(result.lastname || "Name");
      setProfileImage(result.profile_image?.image || 'https://via.placeholder.com/100');
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch profile data');
    } finally {
      setLoading(false);  // Hide loading indicator after fetching data
    }
  };

  const handleProfilePress = () => {
    navigation.navigate('EditProfile');  // Navigate to EditProfile screen
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();  // Sign out the user
      setIsUser(false);  // Update global state
      setTimeout(() => navigation.navigate('Login'), 500);  // Navigate to login screen
    } catch (error) {
      Alert.alert('Oops', error.message);
    }
  };

  // Use useFocusEffect to refetch data when the screen is focused (i.e., when user returns from EditProfile)
  useFocusEffect(
    useCallback(() => {
      fetchUserData();  // Refetch user data when ProfileScreen is focused
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <View style={styles.profileDetailsContainer}>
          <Text style={styles.profileName}>{firstName} {lastName}</Text>
          <Text style={styles.tenantName}>{tenantName || "No Tenant Selected"}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.menuItem} onPress={handleProfilePress}>
        <Text style={styles.menuText}>Your Profile</Text>
        <AntDesign name="right" size={20} color="#333" />
      </TouchableOpacity>

      {/* Add other menu items here (Settings, etc.) */}
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Settings</Text>
        <AntDesign name="right" size={20} color="#333" />
      </TouchableOpacity>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Text style={styles.menuText}>Log Out</Text>
        <AntDesign name="right" size={20} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: hp('5%'),
  },
  profileDetailsContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('12.5%'),
    marginBottom: hp('2%'),
  },
  profileName: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'PublicSans-SemiBold',
  },
  tenantName: {
    fontSize: wp('4%'),
    color: '#666',
    marginTop: hp('0.5%'),
    fontFamily: 'PublicSans-Regular',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp('4%'),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: wp('4.5%'),
    color: '#333',
    fontFamily: 'PublicSans-Regular',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
