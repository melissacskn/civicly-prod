
import React from 'react';
import { ImageBackground,StyleSheet,View } from "react-native";


// screens
import Login from './screens/Login';
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';
import ConfirmEmail from './screens/ConfirmEmail';


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

    <RootStack></RootStack>
    
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

