// import styled from 'styled-components';
// import {View,Text, Image,TextInput, TouchableOpacity,StyleSheet} from 'react-native';




// // colors
// export const Colors ={
//     primary: "#ffffff",
//     secondary: "#E5E7EB",
//     tertiary: "#1F2937",
//     darkLight: "#9CA3AF",
//     brand: "#6D28D9",
//     green: "#10B981",
//     red: "#EF4444",
//     black: "#000000",

// }; 

// const{ primary,secondary,tertiary,darkLight,brand,green,red,black}=Colors;

// export const StyledContainer=styled.View`
// flex: 1;
// padding: 25px;
// padding-top: 15px;
// background-color:'transparent';

// `

// export const InnerContainer= styled.View`
// flex: 1 ;
// width: 100%;
// align-items: center;


// `;

// export const PageLogo= styled.Image`

// width: 200px;
// height: 55px;
// margin-top:55px;



// `;


// export const PageTitle=styled.Text`

// font-size: 25px;

// letter-spacing: 0.25px;

// text-align: center;

// font-weight: bold;
// color: ${primary};
// padding: 10px;






// `;
// export const SubTitle=styled.Text`
// font-size: 18px;
// margin-bottom: 20px;
// letter-spacing: 1px;
// font-weight: bold;
// color: ${tertiary};
// text-align: left;





// `;

// export const StyledFormArea =styled.View`
// width:100%;

// border-radius: 5px;
// margin-vertical: 25px;
// background-color: ${primary};
// padding: 14px;


// `;


// export const StyledTextInput= styled.TextInput`
// background-color: ${secondary};
// padding: 15px;
// padding-left: 55px;
// padding-right: 55px;
// border-radius: 5px;
// font-size: 16px;
// height: 60px;
// margin-vertical: 3px;
// margin-bottom: 10px;
// color: ${tertiary};

// `;

// export const StyledInputLabel =styled.Text`
// color: ${tertiary};
// font-size: 13px;
// text-align: left;



// `;

// export const LeftIcon= styled.View`
// left: 15px;
// top: 38px;
// position: absolute;
// z-index: 1;

// `;

// export const RightIcon= styled.TouchableOpacity`
// right: 15px;
// top: 38px;
// position: absolute;
// z-index: 1;

// `;
// export const StyledButton= styled.TouchableOpacity`
// padding: 15px;
// background-color: ${green};
// justify-content: center;
// align-items: center;
// border-radius: 5px;
// margin-vertical: 5px;
// height: 60px;



// `;
// export const ButtonText= styled.Text`
// color: ${primary};
// font-size: 15px;



// `;

// export const MsgBox= styled.Text`
// text-align: center;
// font-size: 13px;
// `;



// export const ExtraView = styled.View`

// justify-content:center;
// flex-direction: row;

// margin-top: 10px;

// `;

// export const ExtraText= styled.Text`
// justify-content: center;
// align-content:center; 
// color: ${tertiary};
// font-size: 15px;




// `;

// export const TextLink = styled.TouchableOpacity`
// justify-content: center;


// `;

// export const TextLinkContent= styled.Text`
// color:${green};
// font-size: 15px;



// `;

// import styled from 'styled-components';
// import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// // colors
// export const Colors = {
//     primary: "#ffffff",
//     secondary: "#E5E7EB",
//     tertiary: "#1F2937",
//     darkLight: "#9CA3AF",
//     brand: "#6D28D9",
//     green: "#10B981",
//     red: "#EF4444",
//     black: "#000000",
// };

// const { primary, secondary, tertiary, darkLight, brand, green, red, black } = Colors;

// export const StyledContainer = styled.View`
//     flex: 1;
//     padding: ${wp('6%')}px;
//     padding-top: ${hp('4%')}px;
//     background-color: transparent;
// `;

// export const InnerContainer = styled.View`
//     flex: 1;
//     width: 100%;
//     align-items: center;
// `;

// export const PageLogo = styled.Image`
//     width: ${wp('50%')}px;
//     height: ${hp('8%')}px;
//     margin-top: ${hp('7%')}px;
// `;

// export const PageTitle = styled.Text`
//     font-size: ${wp('6%')}px;
//     letter-spacing: 0.25px;
//     text-align: center;
//     font-weight: bold;
//     color: ${primary};
//     padding: ${hp('2%')}px;
// `;

// export const SubTitle = styled.Text`
//     font-size: ${wp('4.5%')}px;
//     margin-bottom: ${hp('2%')}px;
//     letter-spacing: 1px;
//     font-weight: bold;
//     color: ${tertiary};
//     text-align: left;
// `;

// export const StyledFormArea = styled.View`
//     width: 100%;
//     border-radius: ${wp('2%')}px;
//     margin-vertical: ${hp('3%')}px;
//     background-color: ${primary};
//     padding: ${hp('2%')}px;
// `;

// export const StyledTextInput = styled.TextInput`
//     background-color: ${secondary};
//     padding: ${hp('2%')}px ${wp('14%')}px;
//     border-radius: ${wp('2%')}px;
//     font-size: ${wp('4%')}px;
//     height: ${hp('8%')}px;
//     margin-vertical: ${hp('0.5%')}px;
//     margin-bottom: ${hp('1.5%')}px;
//     color: ${tertiary};
   
      
    
// `;

// export const StyledInputLabel = styled.Text`
//     color: ${tertiary};
//     font-size: ${wp('3.5%')}px;
//     text-align: left;
// `;

// export const LeftIcon = styled.View`
//     left: ${wp('4%')}px;
//     top: ${hp('4.5%')}px;
//     position: absolute;
//     z-index: 1;
// `;

// export const RightIcon = styled.TouchableOpacity`
//     right: ${wp('4%')}px;
//     top: ${hp('4.5%')}px;
//     position: absolute;
//     z-index: 1;
// `;

// export const StyledButton = styled.TouchableOpacity`
//     padding: ${hp('2%')}px;
//     background-color: ${green};
//     justify-content: center;
//     align-items: center;
//     border-radius: ${wp('2%')}px;
//     margin-vertical: ${hp('0.5%')}px;
//     height: ${hp('8%')}px;
// `;

// export const ButtonText = styled.Text`
//     color: ${primary};
//     font-size: ${wp('4%')}px;
// `;

// export const ExtraView = styled.View`
//     justify-content: center;
//     flex-direction: row;
//     margin-top: ${hp('1.5%')}px;
// `;

// export const ExtraText = styled.Text`
//     justify-content: center;
//     align-content: center;
//     color: ${tertiary};
//     font-size: ${wp('4%')}px;
// `;

// export const TextLink = styled.TouchableOpacity`
//     justify-content: center;
// `;

// export const TextLinkContent = styled.Text`
//     color: ${green};
//     font-size: ${wp('4%')}px;
// `;

// import { StyleSheet } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// // Colors
// export const Colors = {
//     primary: "#ffffff",
//     secondary: "#E5E7EB",
//     tertiary: "#1F2937",
//     darkLight: "#9CA3AF",
//     brand: "#6D28D9",
//     green: "#10B981",
//     red: "#EF4444",
//     black: "#000000",
// };

// const { primary, secondary, tertiary, darkLight, brand, green, red, black } = Colors;

// export const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: wp('6%'),
//         paddingTop: hp('4%'),
//         backgroundColor: 'transparent',
//     },
//     innerContainer: {
//         flex: 1,
//         width: '100%',
//         alignItems: 'center',
//         justifyContent: 'center', // Ensure the content is centered vertically
        
//     },
//     pageLogo: {
//         width: wp('50%'),
//         height: hp('7.1%'),
//         marginTop: hp('5%'), // Add some margin to move the logo down
//         marginBottom: hp('1%'),
//     },
//     pageTitle: {
//         fontSize: wp('6%'),
//         letterSpacing: 0.25,
//         textAlign: 'center',
//         fontWeight: 'bold',
//         color: tertiary,
       
//         marginBottom: hp('1%'), // Space between title and form
//     },
//     subTitle: {
//         fontSize: wp('4.5%'),
//         marginBottom: hp('2%'),
//         letterSpacing: 1,
//         fontWeight: 'bold',
//         color: tertiary,
//         textAlign: 'left',
//     },
//     formArea: {
//         width: '95%',
//         borderRadius: wp('2%'),
//         marginVertical: hp('2%'),
//         backgroundColor: primary,
//         padding: hp('2%'),
//         overflow: 'hidden',
//         marginBottom: hp('3%'), // Reduce the top margin to dec
       
        
//     },
//     textInput: {
//         backgroundColor: secondary,
//         paddingLeft: wp('14%'),
//         paddingRight: wp('4%'),
//         paddingTop: hp('1.5%'),
//         paddingBottom: hp('1.5%'),
//         borderRadius: wp('2%'),
//         fontSize: wp('4%'),
//         height: hp('8%'),
//         marginVertical: hp('0.5%'),
//         marginBottom: hp('1.5%'),
//         color: tertiary,
//         width: '100%',
//         overflow: 'hidden',
//     },
//     inputLabel: {
//         color: tertiary,
//         fontSize: wp('3.5%'),
//         textAlign: 'left',
//         marginBottom: hp('1%'),
//     },
//     leftIcon: {
//         position: 'absolute',
//         left: wp('4%'),
//         top: hp('2.5%'),
//         zIndex: 1,
//     },
//     rightIcon: {
//         position: 'absolute',
//         right: wp('4%'),
//         top: hp('2.5%'),
//         zIndex: 1,
//     },
//     styledButton: {
//         padding: hp('2%'),
//         backgroundColor: green,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: wp('2%'),
//         height: hp('8%'),
//         marginVertical: hp('1%'),
//     },
//     buttonText: {
//         color: primary,
//         fontSize: wp('4%'),
//     },
//     extraView: {
//         justifyContent: 'center',
//         flexDirection: 'row',
//         marginTop: hp('1.5%'),
//     },
//     extraText: {
//         justifyContent: 'center',
//         alignContent: 'center',
//         color: tertiary,
//         fontSize: wp('4%'),
//     },
//     textLink: {
//         justifyContent: 'center',
//         color: green,
//         fontSize: wp('4%'),
//     },
// });

// export default styles;

////////////////STYLE SHEET HALI///////////////////
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Colors
export const Colors = {
    primary: "#ffffff",
    secondary: "#E5E7EB",
    tertiary: "#1F2937",
    darkLight: "#9CA3AF",
    brand: "#6D28D9",
    green: "#10B981",
    red: "#EF4444",
    black: "#000000",
};

const { primary, secondary, tertiary, darkLight, brand, green, red, black } = Colors;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    innerContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align items to the top, can change to 'center' if needed
        paddingTop: hp('8%'), // Reduce padding to move logo up a bit
    },
    pageLogo: {
        width: wp('60%'),
        height: hp('7%'),
        marginBottom: hp('5%'), // Reduce space between logo and title
    },
    pageTitle: {
        fontSize: wp('6%'),
        textAlign: 'center',
        color: tertiary,
        marginBottom: hp('1.5%'), // Reduce space between title and form
        fontFamily: 'PublicSans-SemiBold',
    },
    subTitle: {
        fontSize: wp('4.5%'),
        marginBottom: hp('1.5%'), // Reduce space between subtitle and fields
        color: tertiary,
        textAlign: 'left',
        fontFamily: 'PublicSans-SemiBold',
    },
    formArea: {
        width: '90%',
        borderRadius: wp('2%'),
        backgroundColor: primary,
        padding: hp('2.5%'), // Slightly reduce padding
        marginBottom: hp('2%'),
        elevation: 5, // Add a slight shadow for better distinction from background
    },
    textInput: {
        backgroundColor: secondary,
        paddingLeft: wp('14%'),
        paddingRight: wp('4%'),
        paddingTop: hp('1%'),  // Reduce padding inside text inputs
        paddingBottom: hp('1%'), // Reduce padding inside text inputs
        borderRadius: wp('2%'),
        fontSize: wp('4%'),
        height: hp('7%'), // Slightly reduce the height of text inputs
        marginVertical: hp('0.4%'), // Reduce vertical margin between inputs
        color: tertiary,
        width: '100%',
        overflow: 'hidden',
        fontFamily: 'PublicSans-Regular',
    },
    inputLabel: {
        color: tertiary,
        fontSize: wp('3.5%'),
        textAlign: 'left',
        marginBottom: hp('0.5%'), // Reduce space between label and input
        fontFamily: 'PublicSans-SemiBold',
    },
    leftIcon: {
        position: 'absolute',
        left: wp('4%'),
        top: hp('2%'), // Adjust icon position relative to reduced text input height
        zIndex: 1,
    },
    rightIcon: {
        position: 'absolute',
        right: wp('4%'),
        top: hp('2%'), // Adjust icon position relative to reduced text input height
        zIndex: 1,
    },
    styledButton: {
        padding: hp('1.5%'), // Reduce padding inside button
        backgroundColor: green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp('2%'),
        height: hp('7.5%'), // Slightly reduce button height
        marginVertical: hp('0.8%'), // Reduce margin between button and other elements
    },
    buttonText: {
        color: primary,
        fontSize: wp('4%'),
        fontFamily: 'PublicSans-SemiBold',
    },
    extraView: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: hp('1%'), // Reduce space between button and extra options
    },
    extraText: {
        justifyContent: 'center',
        alignContent: 'center',
        color: tertiary,
        fontSize: wp('4%'),
        fontFamily: 'PublicSans-Regular',
    },
    textLink: {
        justifyContent: 'flex-start',
        color: green,
        fontSize: wp('4%'),
        fontFamily: 'PublicSans-Regular',
    },
});

export default styles;
