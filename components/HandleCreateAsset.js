import {  fetchAuthSession } from 'aws-amplify/auth';
    
   export const CreateNewAsset = async ( {name,checkedStatus, checkedCondition,selectedAsset}) => {
        console.log(name,checkedCondition,checkedStatus,selectedAsset.asset_category.id)
        

        try{
           
                const session = await fetchAuthSession({ forceRefresh: true });
                const accessToken = session.tokens.accessToken.toString();
                
          
              const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${accessToken}`);

const formdata = new FormData();


// formdata.append("name", name);
// formdata.append("description", "\"\"");
// formdata.append("asset_type_id", selectedAsset.asset_category.id);
// formdata.append("status", checkedStatus);
// formdata.append("location",  "{\"latitude\": 52.6798, \"longitude\": 1.280531, \"comment\": \"Local Test\"}");
// formdata.append("condition", checkedCondition);

formdata.append("name", name);
formdata.append("description", "\"\"");
formdata.append("asset_type_id", selectedAsset.id);
formdata.append("status", "ACTIVE");
formdata.append("location", "{\"latitude\": 52.6798, \"longitude\": 1.280531, \"comment\": \"Local Test\"}");
formdata.append("condition", "GOOD");

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};


fetch("https://api.dev.nonprod.civic.ly/assets/e5bd087d-3f8a-413c-b3d6-84011a7ff644/asset/", requestOptions) // tenant id
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
    }
  
    
    catch (error) {
        console.log("Error you have is: ", error);
      } 
}

