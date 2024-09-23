import React, { useState } from "react";
import { Alert, StatusBar, View, Text, TextInput, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../components/stylesSignUp"; // Assuming you're still importing Colors from a shared location
import config from "../src/config";

const { darkLight, primary, green } = Colors;

const ConfirmEmail = ({ route, navigation }) => {
  const [code, setCode] = useState('');
  const { email } = route.params;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  async function handleSignUpConfirmation({ username, confirmationCode }) {
    try {
      const raw = JSON.stringify({
        email: email,
        confirmation_code: confirmationCode,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const responsee = await fetch(`${config.CORE_BASE_URL_DEV}/user/confirm/`, requestOptions);
      const responseData = await responsee.json();
      console.log(responseData);
      navigation.navigate("Login");
    } catch (error) {
      console.log('Error confirming sign up:', error);
    }
  }

  const handlesignupconfirmation = () => {
    handleSignUpConfirmation({ username: email, confirmationCode: code });
  };

  const handleResendCode = async ({ username }) => {
    try {
      await resendSignUpCode({ username });
      Alert.alert("Success", 'Code is resent to your email');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  const handleresendcode = () => {
    handleResendCode({ username: email });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      
      <View style={styles.innerContainer}>
        <View style={styles.pageLogoContainer}>
          <Text style={styles.pageLogo}>Civicly</Text>
        </View>

        <SafeAreaView>
          <TextInput
            style={styles.textInput}
            value={email}
            editable={false} // Non-editable email field
            placeholderTextColor={darkLight}
          />

          <TextInput
            style={styles.textInput}
            placeholder="Enter your confirmation code"
            placeholderTextColor={darkLight}
            onChangeText={setCode}
            value={code}
          />

          <TouchableOpacity style={styles.styledButton} onPress={() => {
            handlesignupconfirmation();
            navigation.navigate("Login");
          }}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={handleresendcode}>
            <Text style={styles.buttonText}>Resend Code</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background (no image)
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
    fontWeight: 'bold',
    color: '#1F2937', // Adjust color to match logo
  },
  textInput: {
    backgroundColor: '#E5E7EB',
    width: '100%', // Full width for input
    padding: 15,
    borderRadius: 5,
    fontSize: 16,
    height: 50,
    marginVertical: 10,
    color: '#1F2937',
  },
  styledButton: {
    padding: 15,
    backgroundColor: green, // Green button for Confirm
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
  },
  backButton: {
    padding: 15,
    backgroundColor: darkLight, // Grey button for Resend Code
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
  },
});

export default ConfirmEmail;
