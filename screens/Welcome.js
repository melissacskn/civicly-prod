import React, { useContext, useEffect,useState } from "react";
import { Alert, StatusBar, ImageBackground, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { LogInContext } from "../navigators/RootStack";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  WelcomeContainer,
  Colors
} from '../components/styles3';

// Colors
const { darkLight, primary, green } = Colors;

const Welcome = ({ route }) => {
  const setIsUser = useContext(LogInContext);
  const navigation = useNavigation();
  const email = route.params?.email;


  

  const handleLogout = async () => {
    try {
      await signOut();
      setIsUser(false);
      setTimeout(() => navigation.navigate('Login'), 500);
    } catch (error) {
      Alert.alert('Oops', error.message);
    }
  };

  const fetchAuthData = async () => {
    try {

      // Fetch current authenticated user
      const currentUser = await getCurrentUser();
     // console.log("Current User:", currentUser);

      ////////////// Fetch current session////////////////////
      const session = await fetchAuthSession({ forceRefresh: true });
      if (!session) {
        throw new Error('Session is undefined');
      }

      //console.log("Session:", session);

      if (!session.tokens) {
        throw new Error('Session tokens are undefined');
      }

      //console.log("Session Tokens:", session.tokens);

      const idToken = session.tokens.idToken.toString();
      const accessToken = session.tokens.accessToken.toString();
     
      console.log(`Access Token: ${accessToken}`);

      if (!idToken) {
        throw new Error('ID token is undefined');
      }

      if (!accessToken) {
        throw new Error('Access token is undefined');
      }
       

  //   const response = await fetch("https://api.dev.nonprod.civic.ly/core/user/tenant", {
  //   method: "GET",
  //   headers: {
  //     "Authorization": `Bearer ${accessToken}`
  //   }
  // });

  // const json = await response.json();
  // console.log("Response JSON:", json);
  // const tenantid = json.results[0].id
  // const tenantname=json.results[0].name

  // console.log(tenantid)
  // console.log(tenantname)
  await getTenants(accessToken)

    }
  catch (error) {
    Alert.alert('Oops', error.message)
    console.error('Error fetching auth session', error);
  }}


  ///////////////Getting all the tenants//////////////////
  const getTenants =async (x)=>{
  const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${x}`);
const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};
const response = await fetch("https://api.dev.nonprod.civic.ly/core/user/tenant",requestOptions)
const json = await response.json();
const count = json.count
  console.log("Response JSON:", json);
  // const tenantid1 = json.results[0].id
  // const tenantname1=json.results[0].name
  // const tenantid2 = json.results[1].id
  // const tenantname2=json.results[1].name


  // console.log(tenantid1)
  // console.log(tenantname1)
  // console.log(tenantid2)
  // console.log(tenantname2)
  
  console.log(count)
  for(let i=0; i<count;i++){
    console.log("Tenant Id: ",json.results[i].id)
    console.log("Tenant Name: ",json.results[i].name)
  


  }
    const tenantid1 = json.results[0].id
  const tenantname1=json.results[0].name
  const tenantid2 = json.results[1].id
  const tenantname2=json.results[1].name
  const tenantid3 = json.results[2].id

 

//   const myHeaderss = new Headers();
//   myHeaderss.append("Authorization", `Bearer ${x}`);


// const formdata = new FormData();
// formdata.append("name", "Trademark");
// formdata.append("description", "\"\"");
// formdata.append("asset_type_id", "002097e2-4f65-481a-adfd-7ab1d98a5573");
// formdata.append("status", "ACTIVE");
// formdata.append("location", "{\"latitude\": 52.67566641051758, \"longitude\": 1.2828212154745984, \"comment\":\"Local Test\"}");
// formdata.append("condition", "FAIR");

// const requestOptionss = {
//   method: "POST",
//   headers: myHeaderss,
//   body: formdata,
//   redirect: "follow"
// };


//   const responsee = await fetch(`https://api.dev.nonprod.civic.ly/assets/${tenantid3}/asset/`,requestOptionss)
//   const jsonn = await responsee.json();
//    console.log("Response JSON:", jsonn);
  


    
    const myHeadersss = new Headers();
    myHeadersss.append("Authorization", `Bearer ${x}`);
   
const requestOptionsss = {
  method: "GET",
  headers: myHeadersss,
  redirect: "follow"
};
const responseee = await fetch(`https://api.dev.nonprod.civic.ly/assets/${tenantid3}/asset/`,requestOptionsss)
const jsonnn = await responseee.json();
 console.log("Response JSON:", jsonnn);
 const count2 = jsonnn.count

 for(let i=0; i<count2;i++){

  console.log("Asset Name: ",jsonnn.results[i].name)



}



  }

   
     
  

  /////////// Creating a tenant/////////////
  const createTenant =async ()=>{
    try{
      const session = await fetchAuthSession({ forceRefresh: true });
      const accessToken = session.tokens.accessToken.toString();

      const myHeaders = new Headers();

      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "subdomain": "hogwarts",
  "name": "Hogwarts tenant ",
  "address": "Accra",
  "longitude": "11.3232",
  "latitude": "53.343"
  
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

const responsee =fetch("https://api.dev.nonprod.civic.ly/core/user/tenant/", requestOptions)


  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

    }
    catch(error){
      Alert.alert('Oops', error.message)

    }
  }

 fetchAuthData()
//  getTenants()

 


  return (
    <>
      <ImageBackground
        source={require('./../assets/Pulse-mobile.png')}
        resizeMode='cover'
        style={styles.container}
        imageStyle={styles.image}
      >
        <StatusBar backgroundColor='transparent' translucent={true} />
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require('./../assets/images/civicly-remove.png')}
          />
          <WelcomeContainer>
            <StyledFormArea>
              <PageTitle welcome={true}>Welcome</PageTitle>
              <SubTitle welcome={true}>{JSON.stringify(email)}</SubTitle>
              <SubTitle welcome={true}>Tenants List</SubTitle>
              

             
              <StyledButton onPress={createTenant}>
                <ButtonText>Create tenant</ButtonText>
              </StyledButton>
              
              <StyledButton onPress={handleLogout}>
                <ButtonText>Logout</ButtonText>
              </StyledButton>
            </StyledFormArea>
          </WelcomeContainer>
        </InnerContainer>
      </ImageBackground>
    </>
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
    opacity: 0.7
  }
});

export default Welcome;
