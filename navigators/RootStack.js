import React, { createContext, useEffect, useState } from 'react';
import { ImageBackground,StyleSheet,View,Image } from "react-native";
// screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import ConfirmEmail from '../screens/ConfirmEmail';
import ForgotPassword from '../screens/ForgotPassword';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import AssetsPage from '../screens/AssetsPage';
import CreateAsset2 from '../screens/CreatAsset2';
import AssetTypeSearch from '../screens/AssetTypeSearch';
import MapMap from '../screens/MapMap';
import LocationServiceCheck from '../screens/LocationServiceCheck';
import AssetUploads from '../components/AssetUploads';
import { LocationProvider } from '../components/LocationContext';

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
        <LocationProvider>
        <LogInContext.Provider value={setIsUser}>
        <NavigationContainer>
        <Stack.Navigator
        // initialRouteName='LocationServiceCheck'
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
                
            
               
                
              }} >
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
                <Stack.Screen name="MapMap" component={MapMap}></Stack.Screen>
            
              
                </>}

            
            
        
        </Stack.Navigator>
        </NavigationContainer>
        </LogInContext.Provider>
        </LocationProvider>
    );
}

   
  

    


export default RootStack;