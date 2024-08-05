

import { fetchAuthSession } from 'aws-amplify/auth';
import axios from 'axios'

export const handleAssetFileUpload = async ({ assetId, fileName, fileType, tenantId, image }) => {


  try {
    console.log('Fetching auth session...');
    const session = await fetchAuthSession({ forceRefresh: true });
    const accessToken = session.tokens.accessToken.toString();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const raw = JSON.stringify([
      {
        "file_name": fileName,
        "file_type": fileType,
        "asset_id": assetId,
        "meta_data": {
          "name": "Test name"
        }
      }
    ]);
    // console.log(raw)

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const url = "https://api.dev.nonprod.civic.ly/assets/e5bd087d-3f8a-413c-b3d6-84011a7ff644/asset/uploads/";
    console.log(`Sending request to ${url}`);
    
    let response;
    try {
      response = await fetch(url, requestOptions);
    } catch (error) {
      console.error(`Error accured during 1.call: ${error}`);
      
    }

 

    const data = await response.json();
    console.log('Received response data:', data);

  
    for (const d of data) {
      const postData = new FormData();
      for (const key in d.fields) {
        postData.append(key, d.fields[key]);
      }
      
      console.log(image)
     
     
     
      postData.append('file', { uri: Platform.OS === 'ios' ? image.sourceURL : image.path, name: image.filename, type: image.mime, });
     

      console.log(`Uploading file to ${d.url}`);
      console.log(postData)
      try {
        const uploadResponse = await fetch(d.url, {
          method: 'POST',
          body: postData,
        });
        // const uploadResult = await uploadResponse.json();
        // console.log('File upload response:', uploadResult);
      } catch (error) {
        console.log(`Error accured during 2.call: ${error}`);
      
      }

      const raw2 = JSON.stringify({
        "file_id": d.fields['key']
      });

      const requestOptions2 = {
        method: "PUT",
        headers: myHeaders,
        body: raw2,
        redirect: "follow"
      };

      const completeUrl = "https://api.dev.nonprod.civic.ly/assets/e5bd087d-3f8a-413c-b3d6-84011a7ff644/asset/uploads/complete/";
      console.log(`Completing upload to ${completeUrl}`);
      let completeResponse;
      try {
        completeResponse = await fetch(completeUrl, requestOptions2);
      } catch (error) {
       console.log(`Error accured during 3.call: ${error}`);
      }

      
    }

  } catch (error) {
    console.error(`Failed to upload image ${fileName}`, error);
  }
};