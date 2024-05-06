import React,{useState} from "react";
import { Alert, StatusBar, TextInput, TouchableWithoutFeedbackBase, View } from "react-native";
import { ImageBackground ,StyleSheet,Text} from "react-native";

import { signIn, signOut,} from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';


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
    TextLinkContent
} from '../components/styles3';

//Colors
const{darkLight,primary,green}= Colors;

 
async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails,} = await getCurrentUser();
      
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



const Welcome = ({route,navigation})=>{
    
    const { email} = route.params;

    return(
        <>
        <ImageBackground source={require('./../assets/Pulse-mobile.png')} resizeMode='cover' style={styles.container} imageStyle= {styles.image}>
            <StatusBar backgroundColor='transparent'
            translucent={true}
            />
            
            <InnerContainer>
                
                <PageLogo resizeMode="cover" source={require('./../assets/images/civicly-remove.png')}/>
                
                <WelcomeContainer>
                    <StyledFormArea>
                <PageTitle welcome={true}>Welcome</PageTitle>
                <SubTitle welcome={true}>{JSON.stringify(email)}</SubTitle>
                <SubTitle welcome={true}></SubTitle>
               
               
                        
                           <StyledButton onPress= {()=>{
                            signOut()
                        navigation.navigate("Login")}}>
                                <ButtonText>
                                    Logout
                                </ButtonText>
                            </StyledButton>
                            </StyledFormArea>
                        
                </WelcomeContainer>
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



  

export default Welcome;