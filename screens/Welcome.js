import React,{useState,useContext} from "react";
import { Alert, StatusBar, TextInput, TouchableWithoutFeedbackBase, View } from "react-native";
import { ImageBackground ,StyleSheet,Text} from "react-native";

import { signIn, signOut,} from 'aws-amplify/auth';
import { getCurrentUser,fetchAuthSession } from 'aws-amplify/auth';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

import { LogInContext } from "../navigators/RootStack";

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
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

//Colors
const{darkLight,primary,green}= Colors;

 

  



const Welcome = ({route})=>{
  const setIsUser =useContext(LogInContext)
  signOut()
  const navigation=useNavigation()


  

  const handleLogout= async () => {
    try {
      await signOut();
      //navigation.navigate("Login"); // Ensure this only runs if login is successful
     
    

    } catch (error) {
      Alert.alert('Oops', error.message)
    }
  };



  //  const email = route.params 
  //  const accessToken= route.params
   const { email, accessToken } = route.params;
     console.log("accces token: ",accessToken)
 
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
                            handleLogout()
                            setIsUser(false)
                            setTimeout(()=>navigation.navigate('Login'))
                          }}
                            >
                        
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