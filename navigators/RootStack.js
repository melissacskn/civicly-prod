import React, { createContext, useEffect, useState } from 'react';
import { ImageBackground,StyleSheet,View,Image } from "react-native";
// screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import ConfirmEmail from '../screens/ConfirmEmail';
import ForgotPassword from '../screens/ForgotPassword';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import InnerStack from './InnerStack';
import AssetsPage from '../screens/AssetsPage';
import CreateAsset from '../screens/CreateAsset';
import CreateAsset2 from '../screens/CreatAsset2';
import AssetTypeSearch from '../screens/AssetTypeSearch';
import { Auth } from 'aws-amplify';

import  {Colors} from './../components/styles';
const{primary,tertiary}=Colors

//React navigation 

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'


const Stack= createStackNavigator();

export const LogInContext =createContext()


const RootStack=()=>{
    const [isUser,setIsUser]=useState(false)

  
    return (
        <LogInContext.Provider value={setIsUser}>
        <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
            
                headerStyle:{
                    backgroundColor: "transparent"
                },
                headerTintColor: '#000000',
                headerTransparent: true,
                headerTitle:'',
                headerLeftContainerStyle:{
                    paddingLeft:10
                }
               
                
              }}>
                {!isUser &&   <>
                        <Stack.Screen 
                            name='Login' 
                            component={Login} 
                        />
                        <Stack.Screen name="Welcome" component={Welcome} />
                        <Stack.Screen 
                            name='Signup' 
                            component={Signup} 
                        />
                      
                        <Stack.Screen 
                            name='ConfirmEmail' 
                            component={ConfirmEmail} 
                        />
                        <Stack.Screen 
                            name='ForgotPassword' 
                            component={ForgotPassword} 
                        />
                        <Stack.Screen 
                            name='NewPasswordScreen' 
                            component={NewPasswordScreen} 
                        />
                    
                </> }
                {isUser &&
                <> 
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="AssetsPage" component={AssetsPage}></Stack.Screen>
                <Stack.Screen name="CreateAsset2" component={CreateAsset2}></Stack.Screen>
                <Stack.Screen name="AssetTypeSearch" component={AssetTypeSearch}></Stack.Screen>
                <Stack.Screen name="CreateAsset" component={CreateAsset}></Stack.Screen>
              
                </>}

            
            
        
        </Stack.Navigator>
        </NavigationContainer>
        </LogInContext.Provider>
    );
}

   
  

    


export default RootStack;