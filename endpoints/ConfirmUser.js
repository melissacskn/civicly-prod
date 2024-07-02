export const ConfirmUser = async ({ username, confirmationCode }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try{
        const raw = JSON.stringify({
            "email": username,
            "confirmation_code": confirmationCode
        });

    
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
      
        const responsee = await fetch('https://api.dev.nonprod.civic.ly/core/user/confirm/', requestOptions);
        const responseData = await responsee.json();
        console.log(responseData);
    

    }
    catch (error) {
        console.log('error confirming sign up', error);
      }
    

}