import {  fetchAuthSession } from 'aws-amplify/auth';
import { handleAssetFileUpload } from './AssetUploads';
    
   export const CreateNewAsset = async ( {name, checkedStatus, checkedCondition,selectedAsset,tenantId,location,fileName,fileType,image}) => {
        // console.log(name,checkedCondition,checkedStatus,selectedAsset.asset_category.id)
        const tenantid = tenantId;
        console.log(tenantid);
        

        try{
           
                const session = await fetchAuthSession({ forceRefresh: true });
                const accessToken = session.tokens.accessToken.toString();
                
          
              const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${accessToken}`);

const formdata = new FormData();




formdata.append("name", name);
formdata.append("description", "\"\"");
formdata.append("asset_type_id", selectedAsset.id);
formdata.append("status", checkedStatus);
formdata.append("location", `{\"latitude\": ${location.latitude}, \"longitude\": ${location.longitude}, \"comment\": \"Local Test\"}`);
formdata.append("condition", checkedCondition);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};

const response= await fetch(`https://api.dev.nonprod.civic.ly/assets/${tenantid}/asset/`, requestOptions) // tenant id
const json = await response.json();

const assetId = json.id;

await handleAssetFileUpload({
  // assetId: assetId,
  // fileName: fileName,
  // fileType: fileType,
  // tenantId: tenantId,
  // image: image

  assetId: assetId,
  fileName: fileName ,
  fileType: image.mime,
  tenantId: tenantId,
  image: {
    path: image.path,
    filename: fileName,
    mime: image.mime
  }
  
});
  
        }
  
    
    catch (error) {
        console.log("Error you have is: ", error);
      } 
}