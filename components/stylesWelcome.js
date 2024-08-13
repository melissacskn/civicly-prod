// import styled from 'styled-components';
// import {View,Text, Image,TextInput, TouchableOpacity,StyleSheet} from 'react-native';


// import { StatusBar, Dimensions } from 'react-native';



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

// export const WelcomeContainer=styled(InnerContainer)`
// padding: 20px;
// padding-top: 10px;

// `;


// export const PageLogo= styled.Image`

// width: 230px;
// height: 45px;
// margin-top:68px;



// `;


// export const PageTitle=styled.Text`

// font-size: 25px;

// letter-spacing: 0.25px;

// text-align: center;

// font-weight: bold;
// color: ${tertiary};
// padding: 10px;
// ${(props)=> props.welcome && `

// font-size: 33px;


// `}


// `;


// export const SubTitle=styled.Text`
// font-size: 15px;
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
// width:100%;

// border-radius: 5px;
// margin-vertical: 5px;
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

import styled from 'styled-components';
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

export const StyledContainer = styled.View`
  flex: 1;
  padding: ${hp('2.5%')}px;
  padding-top: ${hp('1.5%')}px;
  background-color: ${primary};
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background-color: ${primary};
`;

export const WelcomeContainer = styled(InnerContainer)`
  padding: ${hp('2%')}px;
  padding-top: ${hp('1%')}px;
  background-color: ${primary}; 
`;

export const PageLogo = styled.Image`
  width: ${wp('60%')}px;
  height: ${hp('6%')}px;
  margin-top: ${hp('8%')}px;
`;

export const PageTitle = styled.Text`
  font-size: ${wp('6.5%')}px;
  letter-spacing: 0.25px;
  text-align: center;
  font-weight: bold;
  color: ${tertiary};
  padding: ${hp('1%')}px;
  font-family: 'PublicSans-SemiBold';
  ${(props) => props.welcome && `
    font-size: ${wp('8%')}px;
  `}
`;

export const SubTitle = styled.Text`
  font-size: ${wp('4%')}px;
  margin-bottom: ${hp('2%')}px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};
  text-align: left;
  font-family: 'PublicSans-Regular';
  ${(props) => props.welcome && `
    margin-bottom: ${hp('1%')}px;
    font-weight: normal;
  `}
`;

export const StyledFormArea = styled.View`
  width: 100%;
  border-radius: 5px;
  margin-vertical: ${hp('0.5%')}px;
  background-color: ${primary};
  padding: ${hp('1.5%')}px;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: ${hp('1.5%')}px;
  padding-left: ${wp('14%')}px;
  padding-right: ${wp('14%')}px;
  border-radius: 5px;
  font-size: ${wp('4%')}px;
  height: ${hp('8%')}px;
  margin-vertical: ${hp('0.3%')}px;
  margin-bottom: ${hp('1%')}px;
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: ${wp('3.5%')}px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: ${wp('4%')}px;
  top: ${hp('4.8%')}px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: ${wp('4%')}px;
  top: ${hp('4.8%')}px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: ${hp('1.5%')}px;
  background-color: ${green};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-vertical: ${hp('0.5%')}px;
  height: ${hp('7%')}px;
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: ${wp('4%')}px;
  font-family: 'PublicSans-Regular';
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: ${wp('3.5%')}px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  margin-top: ${hp('1%')}px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center; 
  color: ${tertiary};
  font-size: ${wp('4%')}px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
`;

export const TextLinkContent = styled.Text`
  color: ${green};
  font-size: ${wp('4%')}px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    opacity: 0.7,
  },
});

export default styles;
