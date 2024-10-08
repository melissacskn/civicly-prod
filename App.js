

import React from 'react';
import { ImageBackground,StyleSheet,View } from "react-native";

import "react-native-devsettings";
// OR if you are using AsyncStorage
import "react-native-devsettings/withAsyncStorage";

import 'react-native-gesture-handler'

// screens
import Login from './screens/Login';
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';
import ConfirmEmail from './screens/ConfirmEmail';
import ForgotPassword from './screens/ForgotPassword';
import { LogInContext } from './navigators/RootStack';


// React navigation stack
import RootStack from './navigators/RootStack';

import { signIn, signOut,} from 'aws-amplify/auth';
import {
  withAuthenticator,
  useAuthenticator,Authenticator
} from '@aws-amplify/ui-react-native';

const App=()=> {
 // signOut()
  return (
    

<RootStack />
      

        

    
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

  export default App
