
import { FetchingAuthData } from "./FetchingAuthData";
export const GetUserTenats=async()=>{
    try{
        const accessToken=await FetchingAuthData();
        const myHeaders = new Headers();
    
        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        const response = await fetch("https://api.dev.nonprod.civic.ly/core/user/tenant", requestOptions)
        const json = await response.json();
        return json
        
    }
    catch(error){
        console.log("error",error)

    }
    
    
}