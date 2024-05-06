import React, {useState} from "react";
import { StatusBar,Alert } from "react-native";

// formik
import { Formik } from "formik";

// icons
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"

import { ImageBackground,Text,StyleSheet } from "react-native";

import { getCurrentUser } from 'aws-amplify/auth';
import { signIn, signOut,} from 'aws-amplify/auth';

import { useRoute } from '@react-navigation/native';

import{
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    BackgroundImage
} from './../components/styles';
import {View} from 'react-native';

import {
    withAuthenticator,
    useAuthenticator
  } from '@aws-amplify/ui-react-native';
import Welcome from "./Welcome";

//Colors
const{brand,darkLight,primary,green}= Colors;



const Login= ({navigation})=>{
    const [hidePassword,setHidePassword]= useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

/*
    async function mysignIn({ username, password }) {
    
      try {
        const { isSignedIn, nextStep } = await signIn({ username, password });
      } catch (error) {
        console.log('error signing in', error);
      }
    }
    const handleLog=()=>{
      mysignIn({ username: email, password })

    }
  */
  /*
    async function currentAuthenticatedUser() {
      try {
        const { username, userId, signInDetails,} = await getCurrentUser();
        const userr= await getCurrentUser();
        console.log(`The username: ${username}`);
        console.log(`The userId: ${userId}`);
        console.log(`The signInDetails: ${signInDetails}`);
      } catch (err) {
        console.log(err);
      }
    }

    const getuser=()=>{
      currentAuthenticatedUser()
    }

  */
  
    async function sign({ username, password }) {
      try {
        const user =  await signIn({ username, password });
        console.log('Successfully signed in:', user);
        // You can now route the user to the appropriate screen or perform additional checks
      } catch (error) {
        Alert.alert('Oops', error.message)
        //console.error('Error signing in:', error);
        // Handle errors like incorrect username/password, user not confirmed, etc.
      }
    }
  
  const handleLogin = () => {
      sign({ username: email, password });
    };
  
    return(
        
        <ImageBackground source={require('./../assets/Pulse-mobile.png')} resizeMode='cover' style={styles.container} imageStyle= {styles.image}>
        <StyledContainer>
        <StatusBar backgroundColor='transparent'
            translucent={true}
            />
            
            <InnerContainer>
                
                <PageLogo resizeMode="cover" source={require('./../assets/images/civicly-remove.png')}/>
                <PageTitle >Smart Assets for Sustainable Communities</PageTitle>
                
                <Formik
                    initialValues={{email:'', password: ''}}
                    onSubmit={(values)=>{
                        console.log(values);
                        navigation.navigate("Welcome");
                        
                    }}
                    >
                        {({handleBlur,handleSubmit}) =>(
                        <StyledFormArea>
                            <SubTitle>Login</SubTitle>
                            <MyTextInput 
                            label="Email Address"
                            icon="mail"
                            placeholder="richbur@gmail.com"
                            placeholderTextColor={darkLight}
                            onChangeText={setEmail}
                            onBlur={handleBlur('email')}
                            value={email}
                            keyboardType="email-address"
                            
                            />
                        
                    
                            <MyTextInput 
                            label="Password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={setPassword}
                            onBlur={handleBlur('password')}
                            value={password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            />
                             <StyledButton onPress={()=>{
                            
                            handleLogin()
                            navigation.navigate("Welcome",{email})
                          
                            
                            
                             }}
                             
                          >   
                          
                                <ButtonText>
                                    Login
                                </ButtonText>
                            </StyledButton>
                            <TextLink onPress={()=> navigation.navigate("ForgotPassword",{email})}>
                                    <TextLinkContent >
                                    

                                    Forgot password?
                                    </TextLinkContent>
                                </TextLink>
                            

                             <ExtraView>
                                <ExtraText>Don't have an account already? </ExtraText>
                                <TextLink onPress={()=> navigation.navigate("Signup")} >
                                    <TextLinkContent>
                                        Signup
                                    </TextLinkContent>
                                </TextLink>
                             </ExtraView>


                        </StyledFormArea>)}

                </Formik>
                
            </InnerContainer>
           
        </StyledContainer>
        </ImageBackground>
        
    );
};

const MyTextInput=({label,icon,isPassword,hidePassword,setHidePassword, ...props}) =>{
    return(
        <View>
            <LeftIcon>
                <AntDesign name={icon} size={30} color={green}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                     <Entypo name={hidePassword ? 'eye' :'eye-with-line'} size={30} color={darkLight}/>

                </RightIcon>
            )}

        </View>
    )

}
const styles =StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center'
      
    },
    image: {
      opacity: .7
    }

  });

export default Login;