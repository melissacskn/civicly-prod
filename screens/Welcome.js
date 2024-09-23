import React, { useContext, useState, useEffect, useCallback } from "react";
import { Alert, StatusBar, Text, View, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import { signOut, fetchAuthSession } from 'aws-amplify/auth';
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import { LogInContext } from "../navigators/RootStack";
import styles, { Colors } from '../components/stylesWelcome';  
import { TenantContext } from "../components/TenantContext";
import config from "../src/config";

const Welcome = ({ route }) => {
  const setIsUser = useContext(LogInContext);
  const navigation = useNavigation();

  const { tenantName } = useContext(TenantContext);  // Get the tenantName from context
  

  const [loading, setLoading] = useState(true);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleLogout = async () => {
    try {
      await signOut();
      setIsUser(false);
      setTimeout(() => navigation.navigate('Login'), 500);
    } catch (error) {
      Alert.alert('Oops', error.message);
    }
  };

  const fetchAuthData = async () => {
    try {
      setLoading(true); 
      const session = await fetchAuthSession({ forceRefresh: true });
      if (!session || !session.tokens) throw new Error('Session tokens are undefined');

      const accessToken = session.tokens.accessToken.toString();
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${config.CORE_BASE_URL_DEV}/user/`, requestOptions);
      const result = await response.json();

      setFirstname(result.firstname || "User");
      setLastname(result.lastname || "Name");
      setImageUrl(result.profile_image?.image || null);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch profile data');
    } finally {
      setLoading(false); 
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAuthData();
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
      <StatusBar backgroundColor="white" barStyle="dark-content" translucent={true} />
      
      <View style={styles.innerContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.profileDetails}>
            <View style={styles.profileImageContainer}>
              {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.profileImage} />
              ) : (
                <Text style={styles.profileIcon}>
                  {firstname ? firstname.charAt(0).toUpperCase() : 'U'}
                </Text>
              )}
            </View>
            <View style={styles.profileNameContainer}>
              <Text style={styles.profileName}>{firstname} {lastname}</Text>
              <Text style={styles.profileSubtitle}>Senior Designer</Text>
            </View>
          </View>

          <AntDesign name="edit" size={24} color={Colors.tertiary} onPress={() => navigation.navigate('EditProfile')} />
        </View>

        {/* Select Organisation Section */}
        <View style={styles.dashboardContainer}>
          <Text style={styles.dashboardTitle}>Dashboard</Text>
          <TouchableOpacity style={styles.selectOrganisationCard} onPress={() => navigation.navigate('ListingTenants')}>
            <View style={styles.dashboardCardContent}>
              {/* Display selected organization name or prompt to select */}
              <Text style={styles.dashboardCardTitle}>
                {tenantName ? `Organisation: ${tenantName}` : 'Select Organisation'}
              </Text>
              <AntDesign name="right" size={20} color={Colors.tertiary} />
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Welcome;
