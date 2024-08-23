

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
