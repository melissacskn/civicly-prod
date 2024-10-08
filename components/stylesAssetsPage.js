

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

const { primary, secondary, tertiary, darkLight, brand, green, red, black } = Colors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },

  innerContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: primary,
  },
  welcomeContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 0,
    // paddingVertical: hp('2%'), //// white space between the botto, of the device
  },
  pageLogo: {
    width: wp('60%'),
    height: hp('7%'),
    marginTop: hp('5%'),
    marginBottom: hp('2%'),
  },
  styledFormArea: {
    width: '100%',
    borderRadius: wp('2%'),
    backgroundColor: primary,
    paddingHorizontal: 0,
    // paddingVertical: hp('2%'),
    // marginBottom: hp('2%'),
  },
  containerForLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    backgroundColor: primary,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('7.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: 'rgb(0, 168, 84)', // Green background color
   
  },

  iconButton: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    marginTop: hp('1%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 0,
  },
  leftCornerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginBottom: hp('2%'),
  },
  assetTitle: {
    fontSize: wp('6%'),
   
    color: black,
    fontFamily: 'PublicSans-SemiBold',
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
});

export default styles;
