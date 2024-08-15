import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AntDesign from "react-native-vector-icons/AntDesign"; // For arrow icon
import Entypo from 'react-native-vector-icons/Entypo'; // For eye icon
import { confirmResetPassword } from 'aws-amplify/auth'; // Import the function for resetting the password
import { Colors } from "../components/stylesSignUp";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { darkLight, primary, green, tertiary } = Colors;

const SetNewPasswordScreen = ({ route }) => {
  const { email, code } = route.params || {}; // Destructure and provide a fallback to avoid undefined issues
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hideNewPassword, setHideNewPassword] = useState(true); // For new password visibility toggle
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true); // For confirm password visibility toggle
  const [username, setUsername] = useState(email);
  const navigation = useNavigation();
  const [confirmationCode, setConfirmationCode] = useState(code);
 

  const handleNewPassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        // Call AWS Amplify's confirmResetPassword to reset the user's password
      
          await confirmResetPassword({
            username,confirmationCode,newPassword})
        Alert.alert('Success', 'Password reset successfully!');
        navigation.navigate('Login');
      } catch (error) {
        Alert.alert('Oops', error.message || 'Something went wrong, please try again.');
      }
    } else {
      Alert.alert('Error', 'Passwords do not match');
    }
  };
  // const handleResetPassword = () => {
  //   handleNewPassword({ username:email,code:code,password:newPassword});
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.pageTitle}>Set New Password</Text>

        {/* New Password Input with Eye Icon */}
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.textInput}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            secureTextEntry={hideNewPassword}
            placeholderTextColor={darkLight}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setHideNewPassword(!hideNewPassword)}>
            <Entypo name={hideNewPassword ? 'eye-with-line' : 'eye'} size={wp('5%')} color={darkLight} />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input with Eye Icon */}
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.textInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            secureTextEntry={hideConfirmPassword}
            placeholderTextColor={darkLight}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
            <Entypo name={hideConfirmPassword ? 'eye-with-line' : 'eye'} size={wp('5%')} color={darkLight} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={ handleNewPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
          <AntDesign name="arrowleft" size={16} color={tertiary} style={styles.backIcon} />
          <Text style={styles.backText}>Back to login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: wp('5%'),
  },
  innerContainer: {
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: hp('3%'),
    fontFamily: 'PublicSans-SemiBold',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#E5E7EB',
    borderRadius: wp('2%'),
    marginBottom: hp('2%'),
  },
  textInput: {
    flex: 1,
    padding: wp('4%'),
    fontSize: wp('4%'),
    fontFamily: 'PublicSans-Regular',
    color: '#1F2937',
  },
  eyeIcon: {
    paddingRight: wp('4%'),
  },
  resetButton: {
    width: '100%',
    backgroundColor: green,
    padding: wp('4%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  buttonText: {
    color: primary,
    fontSize: wp('4%'),
    fontWeight: 'bold',
    fontFamily: 'PublicSans-SemiBold',
  },
  backIcon: {
    marginRight: wp('2%'),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  backText: {
    color: tertiary,
    fontSize: wp('3.7%'),
    fontFamily: 'PublicSans-Regular',
    lineHeight: wp('4%'),
  },
});

export default SetNewPasswordScreen;
