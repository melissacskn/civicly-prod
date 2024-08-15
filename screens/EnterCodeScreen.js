// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
// import { useNavigation } from '@react-navigation/native';
// import { Colors } from "../components/stylesSignUp";  // Assuming Colors are already defined globally
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import AntDesign from "react-native-vector-icons/AntDesign";

// const { darkLight, primary, green,tertiary } = Colors;

// const EnterCodeScreen = ({ route }) => {
//   const [code, setCode] = useState('');
//   const { email } = route.params;
//   const navigation = useNavigation();

//   const handleContinue = () => {
//     if (code.length === 6) {
//       navigation.navigate('SetNewPasswordScreen', { email, code });
//     } else {
//       alert('Please enter the full 6-digit code');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.innerContainer}>
//         <Text style={styles.pageTitle}>Password Reset</Text>
//         <Text style={styles.instructionText}>We’ve sent you reset instructions.</Text>
        
//         <View style={styles.codeInputContainer}>
//           <TextInput
//             style={styles.codeInput}
//             maxLength={6}
//             keyboardType="numeric"
//             value={code}
//             onChangeText={setCode}
//             placeholder="Enter 6-digit code"
//             placeholderTextColor={darkLight}
//           />
//         </View>

//         <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
//           <Text style={styles.buttonText}>Continue</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => alert("Resend code logic here")}>
//           <Text style={styles.resendText}>Didn’t receive the email? Click to resend</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
//           <AntDesign name="arrowleft" size={wp('5%')} color={tertiary} style={styles.backIcon} />
//           <Text style={styles.backText}>Back to login</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       justifyContent: 'center',
//       padding: wp('5%'), // Responsive padding
//     },
//     innerContainer: {
//       alignItems: 'center',
//     },
//     pageTitle: {
//       fontSize: wp('6%'), // Responsive font size
//       fontWeight: 'bold',
//       color: '#1F2937',
//       marginBottom: hp('2%'), // Responsive margin
//       fontFamily: 'PublicSans-SemiBold',
//     },
//     instructionText: {
//       fontSize: wp('4%'), // Responsive font size
//       color: '#1F2937',
//       marginBottom: hp('2.5%'), // Responsive margin
//       fontFamily: 'PublicSans-Regular',
//     },
//     codeInputContainer: {
//       width: '100%',
//       marginBottom: hp('2%'), // Responsive margin
//     },
//     codeInput: {
//       backgroundColor: '#E5E7EB',
//       width: '100%', // Full width
//       padding: wp('4%'), // Responsive padding
//       borderRadius: wp('2%'), // Responsive border radius
//       fontSize: wp('4%'), // Responsive font size
//       color: '#1F2937',
//       textAlign: 'center',
//       fontFamily: 'PublicSans-Regular',
//     },
//     continueButton: {
//       width: '100%',
//       backgroundColor: green,
//       padding: wp('4%'), // Responsive padding
//       borderRadius: wp('2%'), // Responsive border radius
//       alignItems: 'center',
//       marginBottom: hp('2%'), // Responsive margin
//     },
//     buttonText: {
//       color: primary,
//       fontSize: wp('4%'), // Responsive font size
//       fontWeight: 'bold',
//       fontFamily: 'PublicSans-SemiBold',
//     },
//     resendText: {
//       color: '#1F2937',
//       fontSize: wp('3.5%'), // Responsive font size
//       marginBottom: hp('2.5%'), // Responsive margin
//       fontFamily: 'PublicSans-Regular',
//     },
//     backButton: {
//       flexDirection: 'row', // Align icon and text in a row
//       alignItems: 'center', // Center items vertically
//       marginTop: hp('2%'), // Responsive margin
//     },
//     backText: {
//       color: tertiary,
//       fontSize: wp('3.5%'), // Responsive font size
//       fontFamily: 'PublicSans-Regular',
//       lineHeight: wp('4%'), // Adjusted for alignment
//     },
//     backIcon: {
//       marginRight: wp('2%'), // Space between icon and text
//     },
//   });
// export default EnterCodeScreen;


import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Colors } from "../components/stylesSignUp";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from "react-native-vector-icons/AntDesign";

const { darkLight, primary, green, tertiary } = Colors;

const EnterCodeScreen = ({ route }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']); // Array to store each digit
  const navigation = useNavigation();
  const inputs = useRef([]);
  const {email}=route.params ||{}
 
  const handleChangeText = (text, index) => {
    if (text.length === 1 && index < 5) {
      inputs.current[index + 1].focus(); // Move to the next input
    }
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') {
      inputs.current[index - 1].focus(); // Move to the previous input
    }
  };

  const handleContinue = () => {
    if (code.join('').length === 6) {
      const enteredCode = code.join('');
      navigation.navigate('SetNewPasswordScreen', {email:email, code: enteredCode });
    } else {
      alert('Please enter the full 6-digit code');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.pageTitle}>Password Reset</Text>
        <Text style={styles.instructionText}>We’ve sent you reset instructions.</Text>
        
        <View style={styles.codeInputContainer}>
          {/* Render 6 individual TextInputs */}
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(input) => inputs.current[index] = input}
              style={styles.codeBox}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              placeholder="-"
              placeholderTextColor={darkLight}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert("Resend code logic here")}>
          <Text style={styles.resendText}>Didn’t receive the email? Click to resend</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
          <AntDesign name="arrowleft" size={wp('5%')} color={tertiary} style={styles.backIcon} />
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
    padding: wp('5%'), // Responsive padding
  },
  innerContainer: {
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: wp('6%'), // Responsive font size
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: hp('2%'), // Responsive margin
    fontFamily: 'PublicSans-SemiBold',
  },
  instructionText: {
    fontSize: wp('4%'), // Responsive font size
    color: '#1F2937',
    marginBottom: hp('2.5%'), // Responsive margin
    fontFamily: 'PublicSans-Regular',
  },
  codeInputContainer: {
    flexDirection: 'row', // Display input boxes in a row
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: hp('2%'), // Responsive margin
  },
  codeBox: {
    backgroundColor: '#E5E7EB',
    width: wp('12%'), // Each box has a responsive width
    height: hp('7%'), // Responsive height for the box
    textAlign: 'center', // Center the text
    fontSize: wp('5%'), // Responsive font size
    borderRadius: wp('2%'), // Rounded corners
    color: '#1F2937',
    fontFamily: 'PublicSans-Regular',
  },
  continueButton: {
    width: '100%',
    backgroundColor: green,
    padding: wp('4%'), // Responsive padding
    borderRadius: wp('2%'), // Responsive border radius
    alignItems: 'center',
    marginBottom: hp('2%'), // Responsive margin
  },
  buttonText: {
    color: primary,
    fontSize: wp('4%'), // Responsive font size
    fontWeight: 'bold',
    fontFamily: 'PublicSans-SemiBold',
  },
  resendText: {
    color: '#1F2937',
    fontSize: wp('3.5%'), // Responsive font size
    marginBottom: hp('1.5%'), // Responsive margin
    fontFamily: 'PublicSans-Regular',
  },
  backButton: {
    flexDirection: 'row', // Align icon and text in a row
    alignItems: 'center', // Center items vertically
    marginTop: hp('2%'), // Responsive margin
  },
  backText: {
    color: '#1F2937',
    fontSize: wp('3.5%'), // Responsive font size
    fontFamily: 'PublicSans-Regular',
    lineHeight: wp('4%'), // Adjusted for alignment
  },
  backIcon: {
    marginRight: wp('2%'), // Space between icon and text
  },
});

export default EnterCodeScreen;
