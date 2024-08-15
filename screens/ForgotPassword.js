import React, { useState } from "react";
import { Alert, StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { resetPassword } from 'aws-amplify/auth';
import { Colors } from "../components/stylesSignUp"; // Assuming you still have Colors defined globally


const { darkLight, primary, green } = Colors;

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  async function handleForgotPassword({ username }) {
    try {
      await resetPassword({ username });
      Alert.alert("Success", 'Code is resent to your email');
    } catch (error) {
      Alert.alert('Oops', error.message);
    }
  }

  const handleForgotPasswordSubmit = () => {
    handleForgotPassword({ username: email });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' translucent={true} barStyle={'dark-content'} />
      
      <View style={styles.innerContainer}>
        <View style={styles.pageLogoContainer}>
           
        </View>

        <Text style={styles.title}>Forgot Password?</Text>
        
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor={darkLight}
          onChangeText={setEmail}
          value={email}
        />

        <TouchableOpacity style={styles.styledButton} onPress={() => {
          handleForgotPasswordSubmit();
          navigation.navigate("EnterCodeScreen",{email:email});
        }}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // No background image, just plain white
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageLogoContainer: {
    marginBottom: 50,
  },
  pageLogo: {
    fontSize: 32,
    fontFamily: 'PublicSans-SemiBold',
    fontWeight: 'bold',
    color: '#1F2937', // The same as the "Civicly" logo
  },
  title: {
    fontSize: 24,
    fontFamily: 'PublicSans-SemiBold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'left',
    width: '100%',
  },
  textInput: {
    backgroundColor: '#E5E7EB',
    width: '100%', // Full width of the container
    padding: 15,
    borderRadius: 5,
    fontSize: 16,
    height: 50,
    marginVertical: 10,
    color: '#1F2937',
    fontFamily: 'PublicSans-Regular',
  },
  styledButton: {
    padding: 15,
    backgroundColor: green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
  },
  buttonText: {
    color: primary,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'PublicSans-SemiBold',
  },
});

export default ForgotPassword;
