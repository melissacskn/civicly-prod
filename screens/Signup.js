
import React, { useState } from "react";
import { View, StatusBar, Alert, ImageBackground, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Formik } from "formik";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { signUp } from 'aws-amplify/auth';
import styles, { Colors } from '../components/stylesSignUp';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const { darkLight, green } = Colors;

const Signup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    async function handleSignUp({ firstname, lastname, username, email, password }) {
        try {
            const user = await signUp({
                username,
                password,
                attributes: {
                    email,
                    'custom:firstname': firstname,
                    'custom:lastname': lastname,
                }
            });
            navigation.navigate("ConfirmEmail", { email });
        } catch (error) {
            Alert.alert('Oops', error.message);
        }
    }

    const handleSignup = () => {
        handleSignUp({
            firstname,
            lastname,
            username: email,
            email,
            password
        });
    };

    return (
        <ImageBackground source={require('./../assets/Pulse-mobile.png')} resizeMode='cover' style={styles.container} >
            <ScrollView>
                <View style={styles.innerContainer}>
                    <StatusBar backgroundColor='transparent' translucent={true} />
                    <ImageBackground resizeMode="cover" source={require('./../assets/images/civicly-remove.png')} style={styles.pageLogo} />
                    
                    <View style={styles.formArea}>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={(values) => {
                                console.log(values);
                                navigation.navigate("Welcome");
                            }}
                        >
                            {({ handleBlur }) => (
                                <View>
                                    <Text style={styles.subTitle}>Signup</Text>

                                    <View style={{ marginBottom: hp('1%') }}>
                                        <Text style={styles.inputLabel}>First Name</Text>
                                        <View style={{ position: 'relative' }}>
                                            <AntDesign name="user" size={wp('7%')} color={green} style={styles.leftIcon} />
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="James"
                                                placeholderTextColor={darkLight}
                                                onChangeText={setFirstname}
                                                onBlur={handleBlur('firstname')}
                                                value={firstname}
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

                                    <View style={{ marginBottom: hp('1%') }}>
                                        <Text style={styles.inputLabel}>Last Name</Text>
                                        <View style={{ position: 'relative' }}>
                                            <AntDesign name="user" size={wp('7%')} color={green} style={styles.leftIcon} />
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="Quicksand"
                                                placeholderTextColor={darkLight}
                                                onChangeText={setLastname}
                                                onBlur={handleBlur('lastname')}
                                                value={lastname}
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

                                    <View style={{ marginBottom: hp('1%') }}>
                                        <Text style={styles.inputLabel}>Username</Text>
                                        <View style={{ position: 'relative' }}>
                                            <AntDesign name="user" size={wp('7%')} color={green} style={styles.leftIcon} />
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="quickjames"
                                                placeholderTextColor={darkLight}
                                                onChangeText={setUsername}
                                                onBlur={handleBlur('username')}
                                                value={username}
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

                                    <View style={{ marginBottom: hp('1%') }}>
                                        <Text style={styles.inputLabel}>Email Address</Text>
                                        <View style={{ position: 'relative' }}>
                                            <AntDesign name="mail" size={wp('7%')} color={green} style={styles.leftIcon} />
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="email"
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

                                    <View style={{ marginBottom: hp('1%') }}>
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

                                    <TouchableOpacity style={styles.styledButton} onPress={handleSignup}>
                                        <Text style={styles.buttonText}>
                                            Create Account
                                        </Text>
                                    </TouchableOpacity>

                                    <View style={styles.extraView}>
                                        <Text style={styles.extraText}>Already have an account?</Text>
                                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                            <Text style={styles.textLink}> Login</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default Signup;
