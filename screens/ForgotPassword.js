import React,{useState} from "react";
import { Alert, StatusBar, TextInput, TouchableWithoutFeedbackBase, View } from "react-native";
import { ImageBackground ,StyleSheet,SafeAreaView,Image} from "react-native";

import { signIn, signOut,} from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';
import styled from 'styled-components';

import { confirmSignUp } from 'aws-amplify/auth';
import {resendSignUp} from 'aws-amplify/auth'

import { resetPassword } from 'aws-amplify/auth';



import{
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    BackgroundImage,
    WelcomeContainer,
    Colors,
    TextLinkContent,
    StyledTextInput,StyledInputLabel,StyledTextInput2
} from '../components/styles2';
import Login from "./Login";


//Colors
const{darkLight,primary,green,secondary,tertiary}= Colors;

const ForgotPassword = ({navigation,route})=>{
  const [email, setEmail] = useState('');


  async function handleForgotPassword({username}) {
    try {
        await resetPassword({
        username,})
      
    
        Alert.alert("Success",'Code is resent to your email')}
      
     catch (error) {
     
      Alert.alert('Oops', error.message)
    
    }
  }
  const handleforgotpassword = () => {
    handleForgotPassword({ username:email});
  };

    return(
        <>
        <ImageBackground source={require('./../assets/Pulse-mobile.png')} resizeMode='cover' style={styles.container} imageStyle= {styles.image}>
            <StatusBar backgroundColor='transparent'
            translucent={true}
            />
            
            <InnerContainer>
                <PageLogoo resizeMode="cover" source={require('./../assets/images/civicly-remove.png')}/>
    <SafeAreaView>
    <MyTextInput
                            
                            
                            placeholder="email"
                            placeholderTextColor={darkLight}
                            onChangeText={setEmail}
                            
                            value={email}
                           
                            />
  
       
                         <StyledButtonn onPress= {()=>{
                          handleforgotpassword()
                          navigation.navigate("NewPasswordScreen",{email})
                          
                         
                          }}>
                                 <ButtonText>
                                     Send
                                 </ButtonText>
                             </StyledButtonn>
 
                            
                                     
    </SafeAreaView>


          </InnerContainer>
            </ImageBackground>
            
        </>
    );
};
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

  
  export const PageLogoo= styled.Image`

width: 200px;
height: 55px;
margin-top:55px;
left:9px;




`;

export const StyledButtonn= styled.TouchableOpacity`
padding: 15px;
background-color: ${green};
justify-content: center;
align-items: center;
border-radius: 5px;
margin-vertical: 5px;
height: 50px;



`;
  

export const StyledButtonnn= styled.TouchableOpacity`
padding: 15px;
background-color: ${darkLight};
justify-content: center;
align-items: center;
border-radius: 5px;
margin-vertical: 5px;
height: 50px;



`;
const MyTextInput=({ ...props}) =>{
    return(
        <View>
            
              <StyledTextInput {...props}/>
        </View>
    )
  
  }
export default ForgotPassword;