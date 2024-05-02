import React from 'react';
import { ImageBackground,StyleSheet,View,Image } from "react-native";
// screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import ConfirmEmail from '../screens/ConfirmEmail';
import ForgotPassword from '../screens/ForgotPassword';
import NewPasswordScreen from '../screens/NewPasswordScreen';

import  {Colors} from './../components/styles';
const{primary,tertiary}=Colors

//React navigation 

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'


const Stack= createStackNavigator();

const RootStack=()=>{
return(
    
 
    <NavigationContainer>
            
        <Stack.Navigator  
          screenOptions={{
            
            headerStyle:{
                backgroundColor: "transparent"
            },
            headerTintColor: primary,
            headerTransparent: true,
            headerTitle:'',
            headerLeftContainerStyle:{
                paddingLeft:20
            }
           
            
          }}
     
        initialRouteName='Login'>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='Signup' component={Signup}/>
            <Stack.Screen options={{headerTintColor: primary}} name='Welcome' component={Welcome}/>
            <Stack.Screen name='ConfirmEmail' component={ConfirmEmail}/>
            <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>
            <Stack.Screen name='NewPasswordScreen' component={NewPasswordScreen}/>
            
        </Stack.Navigator>
    </NavigationContainer>
  

    
);

};

export default RootStack;