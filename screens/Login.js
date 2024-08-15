
// import React, {useState,useContext} from "react";
// import { StatusBar,Alert } from "react-native";

// // formik
// import { Formik } from "formik";

// // icons
// import AntDesign from "react-native-vector-icons/AntDesign"
// import Entypo from "react-native-vector-icons/Entypo"

// import { ImageBackground,Text,StyleSheet } from "react-native";

// import { signIn, signOut,} from 'aws-amplify/auth';



// import { useNavigation } from '@react-navigation/native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



// import LocationServiceCheck from "./LocationServiceCheck";

// import{
//     StyledContainer,
//     InnerContainer,
//     PageLogo,
//     PageTitle,
//     SubTitle,
//     StyledFormArea,
//     LeftIcon,
//     StyledInputLabel,
//     StyledTextInput,
//     RightIcon,
//     StyledButton,
//     ButtonText,
//     Colors,
//     MsgBox,
//     Line,
//     ExtraView,
//     ExtraText,
//     TextLink,
//     TextLinkContent,
//     BackgroundImage
// } from '../components/stylesLogin';
// import {View} from 'react-native';

// import {
//     withAuthenticator,
//     useAuthenticator
//   } from '@aws-amplify/ui-react-native';
// import Welcome from "./Welcome";

// import { LogInContext } from "../navigators/RootStack";

// //Colors
// const{brand,darkLight,primary,green}= Colors;



// const Login= ()=>{

//   const setIsUser =useContext(LogInContext)
  
//   signOut()
//     const [hidePassword,setHidePassword]= useState(true);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigation=useNavigation()
//     const [data, setData] = useState(null);


 
  
//     async function sign({ username, password }) {
//       try {
        
//         const user =  await signIn({ username, password });
//         //console.log(user.signInUser)
       
//         console.log('Successfully signed in:', user);
//         setIsUser(true)
//         console.log("navigating to welcome")
       



      
// setTimeout(()=>navigation.navigate("Welcome",{email},10))
        
//       } catch (error) {
//         Alert.alert('Oops', error.message)
//         //console.log('Error signing in:', error);
//         setIsUser(false)
//         // Handle errors like incorrect username/password, user not confirmed, etc.
//       //   if (error === 'NotAuthorizedException') {
//       //     console.error('Incorrect username or password.');
//       //     setIsUser(false)
//       // }

//     }
    
//     }
   
//   const handleLogin = () => {
      
      
//       sign({ username: email, password });

      

//     };
  
//     return(
        
//         <ImageBackground source={require('./../assets/Pulse-mobile.png')} resizeMode='cover' style={styles.container} imageStyle= {styles.image}>
//         <StyledContainer>
//           <LocationServiceCheck/>
        
//         <StatusBar backgroundColor='transparent'
//             translucent={true}
//             />
            
//             <InnerContainer>
            
                
//                 <PageLogo resizeMode="cover" source={require('./../assets/images/civicly-remove.png')}/>
//                 <PageTitle >Smart Assets for Sustainable Communities</PageTitle>
                
//                 <Formik
//                     initialValues={{email:'', password: ''}}
//                     onSubmit={(values)=>{
//                         console.log(values);
//                         navigation.navigate("Welcome");
                        
//                     }}
//                     >
//                         {({handleBlur,handleSubmit}) =>(
//                         <StyledFormArea>
//                             <SubTitle>Login</SubTitle>
//                             <MyTextInput 
//                             label="Email Address"
//                             icon="mail"
//                             placeholder="richbur@gmail.com"
//                             placeholderTextColor={darkLight}
//                             onChangeText={setEmail}
//                             onBlur={handleBlur('email')}
//                             value={email}
//                             keyboardType="email-address"
                            
//                             />
                        
                    
//                             <MyTextInput 
//                             label="Password"
//                             icon="lock"
//                             placeholder="* * * * * * * *"
//                             placeholderTextColor={darkLight}
//                             onChangeText={setPassword}
//                             onBlur={handleBlur('password')}
//                             value={password}
//                             secureTextEntry={hidePassword}
//                             isPassword={true}
//                             hidePassword={hidePassword}
//                             setHidePassword={setHidePassword}
//                             />
//                              <StyledButton onPress={()=>{
                            
//                             handleLogin()
                           

//                              }}
                             
//                           >   
                          
//                                 <ButtonText>
//                                     Login
//                                 </ButtonText>
//                             </StyledButton>
//                             <TextLink onPress={()=> navigation.navigate("ForgotPassword",{email})}>
//                                     <TextLinkContent >
                                    

//                                     Forgot password?
//                                     </TextLinkContent>
//                                 </TextLink>
                            

//                              <ExtraView>
//                                 <ExtraText>Don't have an account already? </ExtraText>
//                                 <TextLink onPress={()=> navigation.navigate("Signup")} >
//                                     <TextLinkContent>
//                                         Signup
//                                     </TextLinkContent>
//                                 </TextLink>
//                              </ExtraView>


//                         </StyledFormArea>)}

//                 </Formik>
                
//             </InnerContainer>
           
//         </StyledContainer>
//         </ImageBackground>
        
//     );
// };

// const MyTextInput=({label,icon,isPassword,hidePassword,setHidePassword, ...props}) =>{
//     return(
//         <View>
//             <LeftIcon>
//                 <AntDesign name={icon} size={wp('7%')} color={green}/>
//             </LeftIcon>
//             <StyledInputLabel>{label}</StyledInputLabel>
//             <StyledTextInput
//              {...props}
             
           
            
//             />
//             {isPassword && (
//                 <RightIcon onPress={() => setHidePassword(!hidePassword)}>
//                      <Entypo name={hidePassword ? 'eye' :'eye-with-line'} size={wp('7%')} color={darkLight}/>

//                 </RightIcon>
//             )}

//         </View>
//     )

// }
// const styles =StyleSheet.create({
//     container: {
//       flex:1,
//       backgroundColor: 'black',
//       alignItems: 'center',
//       justifyContent: 'center'
      
//     },
//     image: {
//       opacity: .7
//     }

//   });

// export default Login;

import React, { useState, useContext } from "react";
import { View, StatusBar, Alert, ImageBackground, Text, TextInput, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { signIn, signOut } from 'aws-amplify/auth';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import LocationServiceCheck from "./LocationServiceCheck";
import { LogInContext } from "../navigators/RootStack";
import styles, { Colors } from "../components/stylesLogin";

import Welcome from "./Welcome";

const { brand, darkLight, primary, green } = Colors;

const Login = () => {
    const setIsUser = useContext(LogInContext);
    signOut();

    const [hidePassword, setHidePassword] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    async function sign({ username, password }) {
        try {
            const user = await signIn({ username, password });
            setIsUser(true);
            setTimeout(() => navigation.navigate("Welcome", { email }, 10));
        } catch (error) {
            Alert.alert('Oops', error.message);
            setIsUser(false);
        }
    }

    const handleLogin = () => {
        sign({ username: email, password });
    };

    return (
        <ImageBackground source={require('./../assets/Pulse-mobile.png')} resizeMode='cover' style={styles.container} >
            <View style={styles.innerContainer}>
                <LocationServiceCheck />
                <StatusBar backgroundColor='transparent' translucent={true} barStyle={'dark-content'} />
                <ImageBackground resizeMode="cover" source={require('./../assets/images/civicly-remove.png')} style={styles.pageLogo} />
                <View style={styles.formArea}>
                    <Text style={styles.pageTitle}>Smart Assets for Sustainable Communities</Text>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => {
                            console.log(values);
                            navigation.navigate("Welcome");
                        }}
                    >
                        {({ handleBlur, handleSubmit }) => (
                            <View>
                                <Text style={styles.subTitle}>Login</Text>
                                <View style={{ marginBottom: hp('2%') }}>
                                    <Text style={styles.inputLabel}>Email Address</Text>
                                    <View style={{ position: 'relative' }}>
                                        <AntDesign name="mail" size={wp('7%')} color={green} style={styles.leftIcon} />
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="richbur@gmail.com"
                                            placeholderTextColor={darkLight}
                                            onChangeText={setEmail}
                                            onBlur={handleBlur('email')}
                                            value={email}
                                            keyboardType="email-address"
                                            multiline={false}               // Ensure it's a single line
                                            numberOfLines={1}               // Restrict to one line
                                            scrollEnabled={true}            // Allow horizontal scrolling
                                            textAlign="left"                // Align text to the left
                                            textAlignVertical="center"      // Center the text vertically
                                            underlineColorAndroid="transparent"  // Prevent underline on Android
                                            autoCapitalize="none"           // Disable auto-capitalization
                                        />
                                    </View>
                                </View>
                                <View style={{ marginBottom: hp('2%') }}>
                                    <Text style={styles.inputLabel}>Password</Text>
                                    <View style={{ position: 'relative' }}>
                                        <AntDesign name="lock" size={wp('7%')} color={green} style={styles.leftIcon} />
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="* * * * * * * *"
                                            placeholderTextColor={darkLight}
                                            onChangeText={setPassword}
                                            onBlur={handleBlur('password')}
                                            value={password}
                                            secureTextEntry={hidePassword}
                                            multiline={false}               // Ensure it's a single line
                                            numberOfLines={1}               // Restrict to one line
                                            scrollEnabled={true}            // Allow horizontal scrolling
                                            textAlign="left"                // Align text to the left
                                            textAlignVertical="center"      // Center the text vertically
                                            underlineColorAndroid="transparent"  // Prevent underline on Android
                                            autoCapitalize="none"           // Disable auto-capitalization
                                        />
                                        <TouchableOpacity style={styles.rightIcon} onPress={() => setHidePassword(!hidePassword)}>
                                            <Entypo name={hidePassword ? 'eye' : 'eye-with-line'} size={wp('7%')} color={darkLight} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.styledButton} onPress={handleLogin}>
                                    <Text style={styles.buttonText}>Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword', { email })}>
                                    <Text style={styles.textLink}>Forgot password?</Text>
                                </TouchableOpacity>
                                <View style={styles.extraView}>
                                    <Text style={styles.extraText}>Don't have an account already? </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                                        <Text style={styles.textLink}>Signup</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        </ImageBackground>
    );
};

export default Login;

