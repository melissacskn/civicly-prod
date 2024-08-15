

// import styled from 'styled-components';
// import { StyleSheet } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// export const Colors = {
//   primary: "#ffffff",
//   secondary: "#E5E7EB",
//   tertiary: "#1F2937",
//   darkLight: "#9CA3AF",
//   brand: "#6D28D9",
//   green: "#10B981",
//   red: "#EF4444",
//   black: "#000000",
// };

// const { primary, secondary, tertiary, darkLight, brand, green, red, black } = Colors;

// export const StyledContainer = styled.View`
//   flex: 1;
//   padding: ${hp('2.5%')}px;
//   padding-top: ${hp('1.5%')}px;
//   background-color: ${primary};
// `;

// export const InnerContainer = styled.View`
//   flex: 1;
//   width: 100%;
//   align-items: center;
//   background-color: ${primary};
// `;

// export const WelcomeContainer = styled(InnerContainer)`
//   padding: ${hp('2%')}px;
//   padding-top: ${hp('1%')}px;
//   background-color: ${primary}; 
// `;

// export const PageLogo = styled.Image`
//   width: ${wp('60%')}px;
//   height: ${hp('7%')}px;
//   margin-top: ${hp('8%')}px;
// `;

// export const PageTitle = styled.Text`
//   font-size: ${wp('6.5%')}px;
//   letter-spacing: 0.25px;
//   text-align: center;
//   font-weight: bold;
//   color: ${tertiary};
//   padding: ${hp('1%')}px;
//   font-family: 'PublicSans-SemiBold';
//   ${(props) => props.welcome && `
//     font-size: ${wp('8%')}px;
//   `}
// `;

// export const SubTitle = styled.Text`
//   font-size: ${wp('4%')}px;
//   margin-bottom: ${hp('2%')}px;
//   letter-spacing: 1px;
//   font-weight: bold;
//   color: ${tertiary};
//   text-align: left;
//   font-family: 'PublicSans-Regular';
//   ${(props) => props.welcome && `
//     margin-bottom: ${hp('1%')}px;
//     font-weight: normal;
//   `}
// `;

// export const StyledFormArea = styled.View`
//   width: 100%;
//   border-radius: 5px;
//   margin-vertical: ${hp('0.5%')}px;
//   background-color: ${primary};
//   padding: ${hp('1.5%')}px;
// `;

// export const StyledTextInput = styled.TextInput`
//   background-color: ${secondary};
//   padding: ${hp('1.5%')}px;
//   padding-left: ${wp('14%')}px;
//   padding-right: ${wp('14%')}px;
//   border-radius: 5px;
//   font-size: ${wp('4%')}px;
//   height: ${hp('8%')}px;
//   margin-vertical: ${hp('0.3%')}px;
//   margin-bottom: ${hp('1%')}px;
//   color: ${tertiary};
// `;

// export const StyledInputLabel = styled.Text`
//   color: ${tertiary};
//   font-size: ${wp('3.5%')}px;
//   text-align: left;
// `;

// export const LeftIcon = styled.View`
//   left: ${wp('4%')}px;
//   top: ${hp('4.8%')}px;
//   position: absolute;
//   z-index: 1;
// `;

// export const RightIcon = styled.TouchableOpacity`
//   right: ${wp('4%')}px;
//   top: ${hp('4.8%')}px;
//   position: absolute;
//   z-index: 1;
// `;

// export const StyledButton = styled.TouchableOpacity`
//   padding: ${hp('1.5%')}px;
//   background-color: ${green};
//   justify-content: center;
//   align-items: center;
//   border-radius: 5px;
//   margin-vertical: ${hp('0.5%')}px;
//   height: ${hp('7%')}px;
// `;

// export const ButtonText = styled.Text`
//   color: ${primary};
//   font-size: ${wp('4%')}px;
//   font-family: 'PublicSans-Regular';
// `;

// export const MsgBox = styled.Text`
//   text-align: center;
//   font-size: ${wp('3.5%')}px;
// `;

// export const ExtraView = styled.View`
//   justify-content: center;
//   flex-direction: row;
//   margin-top: ${hp('1%')}px;
// `;

// export const ExtraText = styled.Text`
//   justify-content: center;
//   align-content: center; 
//   color: ${tertiary};
//   font-size: ${wp('4%')}px;
// `;

// export const TextLink = styled.TouchableOpacity`
//   justify-content: center;
// `;

// export const TextLinkContent = styled.Text`
//   color: ${green};
//   font-size: ${wp('4%')}px;
// `;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     opacity: 0.7,
//   },
// });

// export default styles;



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
    padding: wp('5%'),
    paddingTop: hp('2%'),
    backgroundColor: primary,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: primary,
  },
  welcomeContainer: {
    paddingHorizontal: wp('5%'), // Added horizontal padding
    paddingTop: hp('2%'),
    backgroundColor: primary,
    width: '100%', // Ensure full width
  },
  pageLogo: {
    width: wp('60%'),
    height: hp('7%'),
    marginTop: hp('5%'),
    alignSelf: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  profileIconContainer: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('7.5%'),
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },
  profileIcon: {
    fontSize: wp('7%'),
    color: '#10B981',
  },
  profileImage: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('7.5%'),
  },
  profileName: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: tertiary,
  },
  subTitle: {
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
    letterSpacing: 0.25,
    fontWeight: 'bold',
    color: tertiary,
    fontFamily: 'PublicSans-Regular',
    marginLeft: wp('4%'), // Align with the start of the items
  },
  itemContainer: {
    padding: wp('3%'),
    marginVertical: hp('0.6%'),
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: wp('2%'),
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  iconContainer: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },
  iconText: {
    fontSize: wp('5%'),
    color: '#10B981',
  },
  itemTitle: {
    fontSize: wp('4%'),
    textAlign: 'left',
    flex: 1,
  },
  styledButton: {
    padding: hp('1.5%'),
    backgroundColor: green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('2%'),
    height: hp('7%'),
    marginBottom: hp('35%'),
    width: '90%',
    alignSelf: 'center',
    marginTop: hp('2%'),
  },
  buttonText: {
    color: primary,
    fontSize: wp('4%'),
    fontFamily: 'PublicSans-Regular',
  },
  containerForLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    backgroundColor: 'white',
  },
});

export default styles;
