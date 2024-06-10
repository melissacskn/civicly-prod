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
import EditingAssets from '../screens/EditingAssets';
import { Auth } from 'aws-amplify';

import  {Colors} from './../components/styles';
const{primary,tertiary}=Colors

//React navigation 

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    fetchAuthSession,
    getCurrentUser
  } from 'aws-amplify/auth';

const Stack= createStackNavigator();

export const LogInContext =createContext()

/*
function Welstack(){
    const wel= createStackNavigator();
    return(
        
        <wel.Navigator
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
     >
        <Stack.Screen options={{headerTintColor: primary}} name='Welcome' component={Welcome}/>

        </wel.Navigator>
       
    )
}

function Logstack(){
    const log= createStackNavigator();
    return(
        
        <log.Navigator
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
     >
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Signup' component={Signup}/>
        <Stack.Screen name='ConfirmEmail' component={ConfirmEmail}/>
        <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>
        <Stack.Screen name='NewPasswordScreen' component={NewPasswordScreen}/>
        </log.Navigator>
        
    )
}
*/
const RootStack=()=>{
    const [isUser,setIsUser]=useState(false)
    /*
    
    const checkUser = async () => {
        try {
            const session = await fetchAuthSession({ forceRefresh: true });
            //console.log('Session:', session);  // Log to see if the session is returned correctly
            const currentUser = await getCurrentUser();
            //console.log('CurrentUser:', currentUser);  // Check what is returned here
            Setuser(currentUser);
        } catch (err) {
            console.log('Error fetching user:', err);
            Setuser(null);
        }
    };
    */
  
    return (
        <LogInContext.Provider value={setIsUser}>
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
                <Stack.Screen name="EditingAssets" component={EditingAssets}></Stack.Screen>
              
                </>}
            

               
            
                        
                      

            
            
                      
           
        </Stack.Navigator>
        </NavigationContainer>
        </LogInContext.Provider>
    );
}

   
  

    


export default RootStack;