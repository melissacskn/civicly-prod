import { signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
export const fetchData = async ({ route }) => {
    const { itemId, itemName } = route.params;

 
 //GETTING ASSETS OF AN INDIVUAL TENANT
  
    const session = await fetchAuthSession({ forceRefresh: true });
    const accessToken = session.tokens.accessToken.toString();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestOptionsss = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  const responseee = await fetch(`https://api.dev.nonprod.civic.ly/assets/${itemId}/asset/`,requestOptionsss)
  const jsonnn = await responseee.json();
  console.log("Response JSON:", jsonnn);
  setCount(jsonnn.count)
  
  
    
    

  const newData = jsonnn.results.map((item) => ({
    name: item.name,
    asset_uploads: item.asset_uploads,
    status: item.status,
  }));

  return newData;
}