import { Alert } from "react-native";
export const RegisterUsers = async ({ firstname, lastname, username, email, password }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try{
        const payload = {
            tenant: {
                name: "orgination46",
                subdomain: "subdomainn46",
                address: "5432 Test Ave, Test City, TC",
                latitude: "42.0536",
                longitude: "-328.1226"
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

           const responseData = await response.json();
           console.log(responseData);

    }
    catch (error) {
        console.log('Error signing up:', error);
        Alert.alert('Oops', error.message);
    }
   
}