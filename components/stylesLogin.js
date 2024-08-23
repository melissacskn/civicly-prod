

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
