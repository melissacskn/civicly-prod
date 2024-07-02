import { FetchingAuthData } from "./FetchingAuthData";
export const SearchAssetType=async({searchParam})=>{
    try{
        const accessToken=await FetchingAuthData();
        const myHeaders = new Headers();
        
myHeaders.append("Authorization", `Bearer ${accessToken}`);

const raw = "";

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
const response = await fetch(`https://api.dev.nonprod.civic.ly/assets/asset-type/?search=${searchParam}`,requestOptions); // Fetch data from API with dynamic query
const responseJson = await response.json()
return responseJson

}
    catch(error){
        console.log("error",error)

    }

}