import { FetchingAuthData } from "./FetchingAuthData";
export const DeleteAsset= async({itemId,assetId})=>{
    try{

    const accessToken = await FetchingAuthData();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    fetch(`https://api.dev.nonprod.civic.ly/assets/${itemId}/asset/${assetId}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
    }
    catch(error){
console.log('error', error)
    }
}