import React, {useState} from "react";
import { StatusBar,Alert } from "react-native";

// formik
import { Formik } from "formik";

// icons
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"

import { ImageBackground,Text,StyleSheet, ScrollView } from "react-native";
import { signUp } from 'aws-amplify/auth';



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
    BackgroundImage,
    StyledTextInput2,
    
   
} from './../components/styles2';
import {View,TouchableOpacity} from 'react-native';
import ConfirmEmail from "./ConfirmEmail";

//Colors
const{darkLight,primary,green}= Colors;



const Signup= ({navigation})=>{
    const [hidePassword,setHidePassword]= useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    async function handleSignUp({ username, password}) {
        try {
            await signUp({
            username,
            password,
           
          });
      
          //console.log(userId);
        } catch (error) {
          console.log('error signing up:', error);
          Alert.alert('Oops', error.message)
        
        }
      }
      
      const handlesignup = () => {
        handleSignUp({ username:email, password});
      };
    

    return(
        <ImageBackground source={require('./../assets/Pulse-mobile.png')} resizeMode='cover' style={styles.container} imageStyle= {styles.image}>
            <ScrollView>
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
                        {({handleChange,handleBlur,handleSubmit,values}) =>(
                        <StyledFormArea>
                            <SubTitle>Signup</SubTitle>
                           
                         

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

                            <MyTextInput 
                            label="Confirm Password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            />
                           

                        
                            <StyledButton onPress={()=>{
                            
                            handlesignup()
                            navigation.navigate("ConfirmEmail",{email})
                            
    
                             }}>
                                <ButtonText>
                                    Create Account
                                </ButtonText>
                            </StyledButton>
                           
                            

                             <ExtraView>
                                <ExtraText>Already have an account? </ExtraText>
                                <TextLink>
                                    <TextLinkContent onPress={()=> navigation.navigate('Login')} >
                                        Login
                                    </TextLinkContent>
                                </TextLink>
                             </ExtraView>


                        </StyledFormArea>)}

                </Formik>
                
            </InnerContainer>
           
        </StyledContainer>
        </ScrollView>

        </ImageBackground>
    );
};

const MyTextInput=({label,icon,isPassword,hidePassword,setHidePassword,...props}) =>{
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

    const MyText=({label,...props})=>{
        
        return(
           
                <View>
                  
                        
                    <StyledInputLabel>{label}</StyledInputLabel>
                    <StyledTextInput2 {...props}/>
                  
                        
        
                   
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


export default Signup;