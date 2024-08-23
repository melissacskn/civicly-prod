

import React, { useState, useContext } from "react";
import { View, StatusBar, Alert, ImageBackground, Text, TextInput, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { signIn ,signOut} from 'aws-amplify/auth';  // Correct import
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import LocationServiceCheck from "./LocationServiceCheck";
import { LogInContext } from "../navigators/RootStack";
import styles, { Colors } from "../components/stylesLogin";

const { brand, darkLight, primary, green } = Colors;

const Login = () => {
    const setIsUser = useContext(LogInContext);
    signOut();

    const [hidePassword, setHidePassword] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    // Corrected sign function
    async function sign({ username, password }) {
        try {
            const user = await signIn({username, password});  // Correct usage of signIn
            setIsUser(true);
            // Navigate to ListingTenants after successful login without passing any params
            setTimeout(() => navigation.navigate("ListingTenants",10));  
        } catch (error) {
            Alert.alert('Oops', error.message);
            setIsUser(false);
        }
    }

    const handleLogin = () => {
        sign({ username: email, password });
    };

    return (
        <ImageBackground source={require('./../assets/Pulse-mobile.png')} resizeMode='cover' style={styles.container} >
            <View style={styles.innerContainer}>
                <LocationServiceCheck />
                <StatusBar backgroundColor='transparent' translucent={true} barStyle={'dark-content'} />
                <ImageBackground resizeMode="cover" source={require('./../assets/images/civicly-remove.png')} style={styles.pageLogo} />
                <View style={styles.formArea}>
                    <Text style={styles.pageTitle}>Smart Assets for Sustainable Communities</Text>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => {
                            console.log(values);
                            handleLogin();  // Call handleLogin on form submission
                        }}
                    >
                        {({ handleBlur, handleSubmit }) => (
                            <View>
                                <Text style={styles.subTitle}>Login</Text>
                                <View style={{ marginBottom: hp('2%') }}>
                                    <Text style={styles.inputLabel}>Email Address</Text>
                                    <View style={{ position: 'relative' }}>
                                        <AntDesign name="mail" size={wp('7%')} color={green} style={styles.leftIcon} />
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="richbur@gmail.com"
                                            placeholderTextColor={darkLight}
                                            onChangeText={setEmail}
                                            onBlur={handleBlur('email')}
                                            value={email}
                                            keyboardType="email-address"
                                            multiline={false}
                                            numberOfLines={1}
                                            scrollEnabled={true}
                                            textAlign="left"
                                            textAlignVertical="center"
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>
                                <View style={{ marginBottom: hp('2%') }}>
                                    <Text style={styles.inputLabel}>Password</Text>
                                    <View style={{ position: 'relative' }}>
                                        <AntDesign name="lock" size={wp('7%')} color={green} style={styles.leftIcon} />
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="* * * * * * * *"
                                            placeholderTextColor={darkLight}
                                            onChangeText={setPassword}
                                            onBlur={handleBlur('password')}
                                            value={password}
                                            secureTextEntry={hidePassword}
                                            multiline={false}
                                            numberOfLines={1}
                                            scrollEnabled={true}
                                            textAlign="left"
                                            textAlignVertical="center"
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity style={styles.rightIcon} onPress={() => setHidePassword(!hidePassword)}>
                                            <Entypo name={hidePassword ? 'eye' : 'eye-with-line'} size={wp('7%')} color={darkLight} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.styledButton} onPress={handleLogin}>
                                    <Text style={styles.buttonText}>Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                                    <Text style={styles.textLink}>Forgot password?</Text>
                                </TouchableOpacity>
                                <View style={styles.extraView}>
                                    <Text style={styles.extraText}>Don't have an account already? </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                                        <Text style={styles.textLink}>Signup</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        </ImageBackground>
    );
};

export default Login;
