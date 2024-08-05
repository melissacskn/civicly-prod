import React, { useState } from "react";
import { StatusBar, Alert } from "react-native";
import { Formik } from "formik";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { ImageBackground, StyleSheet, ScrollView } from "react-native";
import { signUp } from 'aws-amplify/auth';

import {
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
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    StyledTextInput2,
} from '../components/stylesSignUp';
import { View } from 'react-native';

const { darkLight, primary, green } = Colors;

const Signup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  const randomSuffix = generateRandomString(5); // Generates a 5-character random string

    async function handleSignUp({ firstname, lastname, username, email, password }) {
        try {
            // const user = await signUp({
            //     username,
            //     password,
            //     attributes: {
            //         email,
            //         'custom:firstname': firstname,
            //         'custom:lastname': lastname,
            //     }
            // });

            const payload = {
                tenant: {
                    name: `tenant_${randomSuffix}`,
                    subdomain: `subdomain_${randomSuffix}`,
                    address: "5432 Test Ave, Test City, TC",
                    latitude: "34.0522",
                    longitude: "-118.2437"
                  },
                user: {
                    firstname,
                    lastname,
                    username,
                    email,
                    password
                }
            };
            const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: JSON.stringify(payload),
              redirect: "follow"
            };

            const response = await fetch('https://api.dev.nonprod.civic.ly/core/user/register/', 
            requestOptions
               );

            // if (!response.ok) {
            //     throw new Error('Network response was not ok ' + response.statusText);
            // }

            const responseData = await response.json();
            console.log(responseData);
            navigation.navigate("ConfirmEmail", { email });
        } catch (error) {
            console.log('Error signing up:', error);
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
        <ImageBackground source={require('./../assets/Pulse-mobile.png')} resizeMode='cover' style={styles.container} imageStyle={styles.image}>
            <ScrollView>
                <StyledContainer>
                    <StatusBar backgroundColor='transparent' translucent={true} />
                    <InnerContainer>
                        <PageLogo resizeMode="cover" source={require('./../assets/images/civicly-remove.png')} />
                        <PageTitle>Smart Assets for Sustainable Communities</PageTitle>

                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={(values) => {
                                console.log(values);
                                navigation.navigate("Welcome");
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <StyledFormArea>
                                    <SubTitle>Signup</SubTitle>

                                    <MyTextInput
                                        label="First Name"
                                        icon="user"
                                        placeholder="James"
                                        placeholderTextColor={darkLight}
                                        onChangeText={setFirstname}
                                        onBlur={handleBlur('firstname')}
                                        value={firstname}
                                    />

                                    <MyTextInput
                                        label="Last Name"
                                        icon="user"
                                        placeholder="Quicksand"
                                        placeholderTextColor={darkLight}
                                        onChangeText={setLastname}
                                        onBlur={handleBlur('lastname')}
                                        value={lastname}
                                    />

                                    <MyTextInput
                                        label="Username"
                                        icon="user"
                                        placeholder="quickjames"
                                        placeholderTextColor={darkLight}
                                        onChangeText={setUsername}
                                        onBlur={handleBlur('username')}
                                        value={username}
                                    />

                                    <MyTextInput
                                        label="Email Address"
                                        icon="mail"
                                        placeholder="email"
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

                                    <StyledButton onPress={handleSignup}>
                                        <ButtonText>
                                            Create Account
                                        </ButtonText>
                                    </StyledButton>

                                    <ExtraView>
                                        <ExtraText>Already have an account? </ExtraText>
                                        <TextLink>
                                            <TextLinkContent onPress={() => navigation.navigate('Login')}>
                                                Login
                                            </TextLinkContent>
                                        </TextLink>
                                    </ExtraView>
                                </StyledFormArea>
                            )}
                        </Formik>
                    </InnerContainer>
                </StyledContainer>
            </ScrollView>
        </ImageBackground>
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <AntDesign name={icon} size={30} color={green} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Entypo name={hidePassword ? 'eye' : 'eye-with-line'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );
}

const MyText = ({ label, ...props }) => {
    return (
        <View>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput2 {...props} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        opacity: .7
    }
});

export default Signup;