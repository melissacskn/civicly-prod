
import React, {useState,useContext} from "react";
import { StatusBar,Alert } from "react-native";

// formik
import { Formik } from "formik";

// icons
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"

import { ImageBackground,Text,StyleSheet } from "react-native";

import { getCurrentUser } from 'aws-amplify/auth';
import { signIn, signOut,} from 'aws-amplify/auth';
import {Auth} from "aws-amplify"

import { fetchAuthSession } from 'aws-amplify/auth';

import { useNavigation } from '@react-navigation/native';

import { useRoute } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationServiceCheck from "./LocationServiceCheck";

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
} from '../components/stylesLogin';
import {View} from 'react-native';

import {
    withAuthenticator,
    useAuthenticator
  } from '@aws-amplify/ui-react-native';
import Welcome from "./Welcome";

import { LogInContext } from "../navigators/RootStack";

//Colors
const{brand,darkLight,primary,green}= Colors;



const Login= ()=>{

  const setIsUser =useContext(LogInContext)
  
  signOut()
    const [hidePassword,setHidePassword]= useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation=useNavigation()
    const [data, setData] = useState(null);

    // const fetchAuthData = async () => {
    //   try {
    //     // Fetch current authenticated user
    //     const currentUser = await getCurrentUser();
    //     console.log("Current User:", currentUser);
  
    //     // Fetch current session
      

    //     const session = await fetchAuthSession({forceRefresh: true });
    //     const idToken= session.tokens.idToken.toString()
    //     const accessToken =session.tokens.accessToken.toString()
    //     console.log("id token", idToken)
    //     console.log("access token", accessToken)
    //   } catch (error) {
    //     console.error('Error fetching auth session', error);
    //   }
      
    // };
 
  
    async function sign({ username, password }) {
      try {
        
        const user =  await signIn({ username, password });
        //console.log(user.signInUser)
       
        console.log('Successfully signed in:', user);
        setIsUser(true)
        console.log("navigating to welcome")
       

      //  const currentUser = await getCurrentUser();
      //  console.log("Current User:", currentUser);
 

       // Fetch current session

       //const session = await fetchAuthSession({forceRefresh: true });
       //const idToken= session.tokens.idToken.toString()
      // const accessToken =session.tokens.accessToken.toString()
    //    console.log("id token", idToken)
      // console.log("access token", accessToken)
      // setTimeout(()=>navigation.navigate("Welcome",({email,accessToken,tenantname}),10))
      
       //console.log(`Access Token: ${accessToken}`);


//        const myHeaders = new Headers();
//        myHeaders.append("Authorization", `Bearer ${accessToken}`);
//     const requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow"
// };
       
//   fetch("https://api.dev.nonprod.civic.ly/core/user/tenant", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
// const response = await fetch("https://api.dev.nonprod.civic.ly/core/user/tenant", {
//     method: "GET",
//     headers: {
//       "Authorization": `Bearer ${accessToken}`
//     }
//   });
//   const json = await response.json();
//   console.log("Response JSON:", json);
//   const tenantid = json.results[0].id
//   const tenantname=json.results[0].name
// console.log(tenantid)
// console.log(tenantname)


      
setTimeout(()=>navigation.navigate("Welcome",{email},10))
        
      } catch (error) {
        Alert.alert('Oops', error.message)
        //console.log('Error signing in:', error);
        setIsUser(false)
        // Handle errors like incorrect username/password, user not confirmed, etc.
      //   if (error === 'NotAuthorizedException') {
      //     console.error('Incorrect username or password.');
      //     setIsUser(false)
      // }

    }
    
    }
   
  const handleLogin = () => {
      
      
      sign({ username: email, password });

      

    };
  
    return(
        
        <ImageBackground source={require('./../assets/Pulse-mobile.png')} resizeMode='cover' style={styles.container} imageStyle= {styles.image}>
        <StyledContainer>
          <LocationServiceCheck/>
        
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
                            // Assuming you are navigating from a component that is not part of InnerSta

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