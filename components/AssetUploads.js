
// import { View, Text } from 'react-native'
// import React from 'react'
// import { fetchAuthSession } from 'aws-amplify/auth';
// import axios from 'axios'

// export const handleAssetFileUpload = async ({ assetId, fileName, fileType, tenantId, image }) => {
//   const fetchImageAsBlob = async (uri) => {
//   const response = await fetch(uri);
//   const blob = await response.blob();
//   return blob;
// };

//   try {
//     console.log('Fetching auth session...');
//     const session = await fetchAuthSession({ forceRefresh: true });
//     const accessToken = session.tokens.accessToken.toString();

//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Authorization", `Bearer ${accessToken}`);

//     const raw = JSON.stringify([
//       {
//         "file_name": fileName,
//         "file_type": fileType,
//         "asset_id": assetId,
//         "meta_data": {
//           "name": "Test name"
//         }
//       }
//     ]);
//     // console.log(raw)

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow"
//     };

//     const url = "https://api.dev.nonprod.civic.ly/assets/e5bd087d-3f8a-413c-b3d6-84011a7ff644/asset/uploads/";
//     console.log(`Sending request to ${url}`);
    
//     let response;
//     try {
//       response = await fetch(url, requestOptions);
//     } catch (error) {
//       console.error(`Error accured during 1.call: ${error}`);
      
//     }

 

//     const data = await response.json();
//     console.log('Received response data:', data);

//     const blob = await fetchImageAsBlob(image.path);
//     const file = new File([blob], image.filename || 'IMG_20240711_124223.jpg', { type: image.mime });

//     for (const d of data) {
//       const postData = new FormData();
//       for (const key in d.fields) {
//         postData.append(key, d.fields[key]);
//       }
//       // postData.append('file', file);
//       console.log(image)
//       postData.append('file', file, file.name);
     

//       console.log(`Uploading file to ${d.url}`);
//       try {
//         const uploadResponse = await fetch(d.url, {
//           method: 'POST',
//           body: postData,
//         });
//         const uploadResult = await uploadResponse.json();
//         console.log('File upload response:', uploadResult);
//       } catch (error) {
//         console.log(`Error accured during 2.call: ${error}`);
      
//       }

//       const raw2 = JSON.stringify({
//         "file_id": d.fields['key']
//       });

//       const requestOptions2 = {
//         method: "PUT",
//         headers: myHeaders,
//         body: raw2,
//         redirect: "follow"
//       };

//       const completeUrl = "https://api.dev.nonprod.civic.ly/assets/e5bd087d-3f8a-413c-b3d6-84011a7ff644/asset/uploads/complete/";
//       console.log(`Completing upload to ${completeUrl}`);
//       let completeResponse;
//       try {
//         completeResponse = await fetch(completeUrl, requestOptions2);
//       } catch (error) {
//        console.log(`Error accured during 3.call: ${error}`);
//       }

      
//     }

//   } catch (error) {
//     console.error(`Failed to upload image ${fileName}`, error);
//   }
// };
// import { View, Text } from 'react-native'
// import React from 'react'
// import { fetchAuthSession } from 'aws-amplify/auth';
// import axios from 'axios'

// export const handleAssetFileUpload = async ({ assetId, fileName, fileType, tenantId, image }) => {
//   const fetchImageAsBlob = async (uri) => {
//     const response = await fetch(uri);
//     const blob = await response.blob();
//     return blob;
//   };
//   const logFormData = (formData) => {
//     formData._parts.forEach(([key, value]) => {
//       if (key === 'file' && value instanceof File) {
//         console.log('File details:', {
//           name: value.name,
//           type: value.type,
//           size: value.size,
//         });
//       } else {
//         console.log(`${key}: ${value}`);
//       }
//     });
//   };
//   try {
//     console.log('Fetching auth session...');
//     const session = await fetchAuthSession({ forceRefresh: true });
//     const accessToken = session.tokens.accessToken.toString();

//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Authorization", `Bearer ${accessToken}`);

//     const raw = JSON.stringify([
//       {
//         "file_name": fileName,
//         "file_type": fileType,
//         "asset_id": assetId,
//         "meta_data": {
//           "name": "Test name"
//         }
//       }
//     ]);

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow"
//     };

//     const url = "https://api.dev.nonprod.civic.ly/assets/e5bd087d-3f8a-413c-b3d6-84011a7ff644/asset/uploads/";
//     console.log(`Sending request to ${url}`);
    
//     let response;
//     try {
//       response = await fetch(url, requestOptions);
//     } catch (error) {
//       console.error(`Error occurred during 1.call: ${error}`);
//       return;
//     }

//     const data = await response.json();
//     console.log('Received response data:', data);

//     const blob = await fetchImageAsBlob(image.path);
//     const file = new File([blob], image.filename || 'IMG_20240711_124223.jpg', { type: image.mime });

//     for (const d of data) {
//       const postData = new FormData();
//       for (const key in d.fields) {
//         postData.append(key, d.fields[key]);
//       }
//       postData.append('file', file);
//       // logFormData(postData);

//       console.log(`Uploading file to ${d.url}`);
    
//       try {
//         const uploadResponse = await fetch(d.url, {
//           method: 'POST',
//           body: postData,
//         });
        
//         if (!uploadResponse.ok) {
//           const text = await uploadResponse.text();
//           console.error(`Upload failed: ${uploadResponse.status} ${uploadResponse.statusText} - ${text}`);
//           continue; // skip to next iteration if upload fails
//         }

//         const uploadResult = await uploadResponse.json();
//         console.log('File upload response:', uploadResult);
//       } catch (error) {
//         console.log(`Error occurred during 2.call: ${error}`);
//         continue; // skip to next iteration if upload fails
//       }

//       const raw2 = JSON.stringify({
//         "file_id": d.fields['key']
//       });

//       const requestOptions2 = {
//         method: "PUT",
//         headers: myHeaders,
//         body: raw2,
//         redirect: "follow"
//       };

//       const completeUrl = "https://api.dev.nonprod.civic.ly/assets/e5bd087d-3f8a-413c-b3d6-84011a7ff644/asset/uploads/complete/";
//       console.log(`Completing upload to ${completeUrl}`);
//       try {
//         const completeResponse = await fetch(completeUrl, requestOptions2);

//         if (!completeResponse.ok) {
//           const text = await completeResponse.text();
//           console.error(`Completion failed: ${completeResponse.status} ${completeResponse.statusText} - ${text}`);
//           continue; // skip to next iteration if completion fails
//         }

//         const completeResult = await completeResponse.json();
//         console.log('File completion response:', completeResult);
//       } catch (error) {
//         console.log(`Error occurred during 3.call: ${error}`);
//         continue; // skip to next iteration if completion fails
//       }
//     }
//   } catch (error) {
//     console.error(`Failed to upload image ${fileName}`, error);
//   }
// };




import { fetchAuthSession } from 'aws-amplify/auth';
import axios from 'axios'

export const handleAssetFileUpload = async ({ assetId, fileName, fileType, tenantId, image }) => {
  const fetchImageAsBlob = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

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

    const blob = await fetchImageAsBlob(image.path);
    const file = new File([blob], image.filename || 'IMG_20240711_124223.jpg', { type: image.mime });

    for (const d of data) {
      const postData = new FormData();
      for (const key in d.fields) {
        postData.append(key, d.fields[key]);
      }
      
      console.log(image)
      console.log()
     
      // postData.append('file', { uri: file.uri,  URIname: file.name, type: file.type});
      postData.append('file', { uri: Platform.OS === 'ios' ? image.sourceURL : image.path, name: image.filename, type: image.mime, });
     

      console.log(`Uploading file to ${d.url}`);
      console.log(postData)
      try {
        const uploadResponse = await fetch(d.url, {
          method: 'POST',
          body: postData,
        });
        const uploadResult = await uploadResponse.json();
        console.log('File upload response:', uploadResult);
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