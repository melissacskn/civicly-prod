import React, { createContext, useState } from 'react';
import { ImageBackground,StyleSheet,View,Image } from "react-native";
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import ConfirmEmail from '../screens/ConfirmEmail';
import ForgotPassword from '../screens/ForgotPassword';
import SetNewPasswordScreen from '../screens/SetNewPasswordScreen';
import CreateAsset2 from '../screens/CreateAsset2';
import AssetTypeSearch from '../screens/AssetTypeSearch';
import MapMap from '../screens/MapMap';
import EditingAssets from '../screens/EditingAssets';
import { LocationProvider } from '../components/LocationContext';
import EnterCodeScreen from '../screens/EnterCodeScreen';
import EditProfile from '../screens/EditProfile';
import ListingTenants from '../screens/ListingTenants';
import MainDrawer from '../navigators/MainDrawer';  // Import MainDrawer
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TenantProvider } from '../components/TenantContext';
import { AssetProvider } from '../components/AssetContext';
import AssetsTable from '../screens/AssetTable';

const Stack = createStackNavigator();
export const LogInContext = createContext();

const RootStack = () => {
  const [isUser, setIsUser] = useState(false);  // Simulated login state

  return (
    <AssetProvider>
    <TenantProvider>
    <LocationProvider>
      <LogInContext.Provider value={setIsUser}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "transparent" },
              headerTintColor: '#000000',
              headerTransparent: true,
              headerTitle: '',
              headerLeftContainerStyle: { paddingLeft: 10 },
            }}
          >
            {!isUser ? (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="SetNewPasswordScreen" component={SetNewPasswordScreen} />
                <Stack.Screen name="EnterCodeScreen" component={EnterCodeScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="ListingTenants" component={ListingTenants} />
                <Stack.Screen name="MainDrawer" component={MainDrawer} options={{ headerShown: false }} />
                <Stack.Screen name="CreateAsset2" component={CreateAsset2} />
                <Stack.Screen name="AssetTypeSearch" component={AssetTypeSearch} />
                <Stack.Screen name="MapMap" component={MapMap} />
                <Stack.Screen name="EditingAssets" component={EditingAssets} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="AssetsTable" component={AssetsTable} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </LogInContext.Provider>
    </LocationProvider>
    </TenantProvider>
    </AssetProvider>
  );
};

export default RootStack;
