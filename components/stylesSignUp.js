import styled from 'styled-components';
import {View,Text, Image,TextInput, TouchableOpacity,StyleSheet} from 'react-native';




// colors
export const Colors ={
    primary: "#ffffff",
    secondary: "#E5E7EB",
    tertiary: "#1F2937",
    darkLight: "#9CA3AF",

    brand: "#6D28D9",
    green: "#10B981",
    red: "#EF4444",
    black: "#000000",

}; 

const{ primary,secondary,tertiary,darkLight,brand,green,red,black}=Colors;

export const StyledContainer=styled.View`
flex: 1;
padding: 25px;
padding-top: 15px;
background-color:'transparent';

`

export const InnerContainer= styled.View`
flex: 1 ;
width: 90%;
align-items: center;
padding-top:15px;



`;

export const PageLogo= styled.Image`

width: 200px;
height: 55px;
margin-top:55px;
left:15px;



`;


export const PageTitle=styled.Text`

font-size: 21px;

letter-spacing: 0.25px;

text-align: center;
left:15px;
right:15px;
font-weight: bold;
color: ${primary};
padding:10px;

${(props)=> props.welcome && `



`}





`;
export const SubTitle=styled.Text`
font-size: 18px;
margin-bottom: 20px;
letter-spacing: 1px;
font-weight: bold;
color: ${tertiary};
text-align: left;

${(props)=> props.welcome && `
margin-bottom: 5px;
font-weight: normal;


`}



`;

export const StyledFormArea =styled.View`
width:105%;


border-radius: 5px;
margin-vertical: 25px;
background-color: ${primary};
padding: 14px;
left:15px;
right:15px;


`;

export const WelcomeContainer=styled(InnerContainer)`
padding: 25px;
padding-top: 10px;
justify-content: center;
`;


export const StyledTextInput= styled.TextInput`
background-color: ${secondary};
padding: 15px;
padding-left: 55px;
padding-right: 55px;
border-radius: 5px;
font-size: 16px;
height: 50px;
margin-vertical: 3px;
margin-bottom: 10px;
color: ${tertiary};


`;

export const StyledTextInput2= styled.TextInput`
background-color: ${secondary};
padding: 15px;

padding-right: 55px;
border-radius: 5px;
font-size: 16px;
height: 50px;
margin-vertical: 3px;
margin-bottom: 10px;
color: ${tertiary};
text-align: left;

`;

export const StyledInputLabel =styled.Text`
color: ${tertiary};
font-size: 13px;
text-align: left;



`;

export const LeftIcon= styled.View`
left: 10px;
top: 32px;
position: absolute;
z-index: 1;

`;

export const RightIcon= styled.TouchableOpacity`
right: 10px;
top: 32px;
position: absolute;
z-index: 1;

`;
export const StyledButton= styled.TouchableOpacity`
padding: 15px;
background-color: ${green};
justify-content: center;
align-items: center;
border-radius: 5px;
margin-vertical: 5px;
height: 60px;



`;
export const ButtonText= styled.Text`
color: ${primary};
font-size: 15px;



`;

export const MsgBox= styled.Text`
text-align: center;
font-size: 13px;
`;



export const ExtraView = styled.View`

justify-content:center;
flex-direction: row;

margin-top: 10px;

`;

export const ExtraText= styled.Text`
justify-content: center;
align-content:center; 
color: ${tertiary};
font-size: 15px;




`;

export const TextLink = styled.TouchableOpacity`
justify-content: center;


`;

export const TextLinkContent= styled.Text`
color:${green};
font-size: 15px;



`;

const styles =StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center'
      
    },
    image: {
      opacity: .7
    }

  });