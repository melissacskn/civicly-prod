import { FetchingAuthData } from "./FetchingAuthData"
export const GetAllAsset=async({itemId})=>{
    try {
      
        const accessToken = await FetchingAuthData();
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${accessToken}`);
  
      const requestOptionsss = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      const response = await fetch(`https://api.dev.nonprod.civic.ly/assets/${itemId}/asset/`,requestOptionsss)
      const json = await response.json();
      return json
    }
    catch (error) {
        console.error('Error fetching data:', error);
      }

}