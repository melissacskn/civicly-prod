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
// width: 90%;
// align-items: center;
// padding-top:15px;



// `;

// export const PageLogo= styled.Image`

// width: 200px;
// height: 55px;
// margin-top:55px;
// left:15px;



// `;


// export const PageTitle=styled.Text`

// font-size: 21px;

// letter-spacing: 0.25px;

// text-align: center;
// left:15px;
// right:15px;
// font-weight: bold;
// color: ${primary};
// padding:10px;

// ${(props)=> props.welcome && `



// `}





// `;
// export const SubTitle=styled.Text`
// font-size: 18px;
// margin-bottom: 20px;
// letter-spacing: 1px;
// font-weight: bold;
// color: ${tertiary};
// text-align: left;

// ${(props)=> props.welcome && `
// margin-bottom: 5px;
// font-weight: normal;


// `}



// `;

// export const StyledFormArea =styled.View`
// width:105%;


// border-radius: 5px;
// margin-vertical: 25px;
// background-color: ${primary};
// padding: 14px;
// left:15px;
// right:15px;


// `;

// export const WelcomeContainer=styled(InnerContainer)`
// padding: 25px;
// padding-top: 10px;
// justify-content: center;
// `;


// export const StyledTextInput= styled.TextInput`
// background-color: ${secondary};
// padding: 15px;
// padding-left: 55px;
// padding-right: 55px;
// border-radius: 5px;
// font-size: 16px;
// height: 50px;
// margin-vertical: 3px;
// margin-bottom: 10px;
// color: ${tertiary};


// `;

// export const StyledTextInput2= styled.TextInput`
// background-color: ${secondary};
// padding: 15px;

// padding-right: 55px;
// border-radius: 5px;
// font-size: 16px;
// height: 50px;
// margin-vertical: 3px;
// margin-bottom: 10px;
// color: ${tertiary};
// text-align: left;

// `;

// export const StyledInputLabel =styled.Text`
// color: ${tertiary};
// font-size: 13px;
// text-align: left;



// `;

// export const LeftIcon= styled.View`
// left: 10px;
// top: 32px;
// position: absolute;
// z-index: 1;

// `;

// export const RightIcon= styled.TouchableOpacity`
// right: 10px;
// top: 32px;
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

// const styles =StyleSheet.create({
//     container: {
//       flex:1,
//       backgroundColor: 'black',
//       alignItems: 'center',
//       justifyContent: 'center'
      
//     },
//     image: {
//       opacity: .7
//     }

//   });

import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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

const { primary, secondary, tertiary, darkLight, green } = Colors;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    innerContainer: {
        flex: 1,
        width: '100%',  // Ensure full width to center content
        alignItems: 'center',
        paddingTop: hp('8%'),
    },
    pageLogo: {
        width: wp('60%'),  // Slightly smaller logo size
        height: hp('7%'),
        marginBottom: hp('5%'),
    },
    // pageTitle: {
    //     fontSize: wp('5%'),  // Slightly smaller title
    //     letterSpacing: 0.25,
    //     textAlign: 'center',
    //     fontWeight: 'bold',
    //     color: tertiary,
    //     marginBottom: hp('1.5%'),
    //     fontFamily: 'PublicSans-SemiBold',
    // },
    subTitle: {
      fontSize: wp('4.5%'),
      marginBottom: hp('2%'),
     
      color: tertiary,
      textAlign: 'left',
      fontFamily: 'PublicSans-SemiBold'  // Add your custom font here
  },
    formArea: {
        width: wp('85%'),  // Center the form area
        borderRadius: wp('2%'),
        backgroundColor: primary,
        padding: hp('2%'),
        marginBottom: hp('2%'),
        elevation: 5,
        alignSelf: 'center',  // Ensure the form area is centered
    },
    textInput: {
        backgroundColor: secondary,
        paddingLeft: wp('12%'),
        paddingRight: wp('4%'),
        paddingTop: hp('1.5%'),
        paddingBottom: hp('1.5%'),
        borderRadius: wp('2%'),
        fontSize: wp('4%'),
        height: hp('6%'),  // Slightly smaller text input height
        marginVertical: hp('0.5%'),
        color: tertiary,
        width: '100%',
        overflow: 'hidden',
        fontFamily: 'PublicSans-Regular',
    },
    inputLabel: {
        color: tertiary,
        fontSize: wp('3.5%'),
        textAlign: 'left',
        marginBottom: hp('0.5%'),
        fontFamily: 'PublicSans-SemiBold',
    },
    leftIcon: {
        position: 'absolute',
        left: wp('3.5%'),  // Adjusted icon position
        top: hp('2%'),
        zIndex: 1,
    },
    rightIcon: {
        position: 'absolute',
        right: wp('3.5%'),  // Adjusted icon position
        top: hp('2%'),
        zIndex: 1,
    },
    styledButton: {
        padding: hp('1.5%'),  // Slightly smaller button padding
        backgroundColor: green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp('2%'),
        height: hp('7%'),  // Slightly smaller button height
        marginVertical: hp('1%'),
    },
    buttonText: {
        color: primary,
        fontSize: wp('4%'),
        fontFamily: 'PublicSans-SemiBold',
    },
    extraView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: hp('1.5%'),
    },
    extraText: {
        justifyContent: 'center',
        alignContent: 'center',
        color: tertiary,
        fontSize: wp('4%'),
        fontFamily: 'PublicSans-Regular',
    },
    textLink: {
        justifyContent: 'center',
        color: green,
        fontSize: wp('4%'),
        fontFamily: 'PublicSans-SemiBold',
    },
});

export default styles;
