import React,{useState} from "react";
import { Alert, StatusBar, TextInput, TouchableWithoutFeedbackBase, View } from "react-native";
import { ImageBackground ,StyleSheet,SafeAreaView,Image} from "react-native";

import { signIn, signOut,} from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';
import styled from 'styled-components';

import { confirmSignUp } from 'aws-amplify/auth';
import {resendSignUp} from 'aws-amplify/auth'



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

import { resendSignUpCode } from 'aws-amplify/auth';


//Colors
const{darkLight,primary,green,secondary,tertiary}= Colors;

const ConfirmEmail = ({route,navigation})=>{


  const [code, setCode] = useState('');
  
 const {email}=route.params
 const myHeaders = new Headers();
 myHeaders.append("Content-Type", "application/json");
   

  async function handleSignUpConfirmation({ username, confirmationCode }) {
    try {
      // const response= await confirmSignUp({
      //   username,
      //   confirmationCode
        
      // });
      // console.log(response)
      const raw = JSON.stringify({
        "email": email,
        "confirmation_code": confirmationCode
    });
    console.log("melissa raw" , raw)

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };


    const responsee = await fetch('https://api.dev.nonprod.civic.ly/core/user/confirm/', requestOptions);
    const responseData = await responsee.json();
    console.log(responseData);
    navigation.navigate("Login")
      
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }
  const handlesignupconfirmation = () => {
    handleSignUpConfirmation({ username:email,confirmationCode:code});
  };

  const handleResendCode = async ({ username }) => {
    try{
    await resendSignUpCode({ username });
    Alert.alert("Success",'Code is resent to your email')
  }
  catch(e){
    Alert.alert('Oops',e.message)
  }
  }

  const handleresendcode = () => {
    handleResendCode({ username:email});
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
                           
                           
                      
                        
                          value={email}
                          
                           />
      
                            <MyTextInput 
                           
                           
                            placeholder="Enter your confirmation code"
                            placeholderTextColor={darkLight}
                            onChangeText={setCode}
                            
                            value={code}
                           
                            />
                        <StyledButtonn onPress= {()=>{
                          handlesignupconfirmation()
                            
                        navigation.navigate("Login")}}>
                                <ButtonText>
                                    Confirm
                                </ButtonText>
                            </StyledButtonn>

                            <StyledButtonnn  onPress= {()=>{
                              handleresendcode()
                              
                              
                            
                            }} 
                           >
                                    <ButtonText>
                                        Resend code
                                    </ButtonText>
                                </StyledButtonnn>
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
  export const StyledTextInputt= styled.TextInput`
  background-color: ${secondary};
  padding: 20px;
  padding-left: 150px;
  padding-right: 100px;
  border-radius: 5px;
  font-size: 16px;
  height: 30px;
  margin-vertical: 30px;
  margin-bottom: 15px;
  color: ${tertiary};
  
  
  `;
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
export default ConfirmEmail;