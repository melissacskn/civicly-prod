// import { View, Text } from 'react-native'
// import React from 'react'
// import { fetchAuthSession } from 'aws-amplify/auth';
// const HandleProfileEdit =async ({imageName,imageType}) => {
   
//         //////////Profile Picture Upload////////////////////
//         const session =  await fetchAuthSession({ forceRefresh: true });
//         if (!session || !session.tokens) throw new Error('Session tokens are undefined');
    
//         const accessToken = session.tokens.accessToken.toString();
//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");
//         myHeaders.append("Authorization", `Bearer ${accessToken}`);
//         const raw = JSON.stringify({
//             "image_name": imageName,
//             "image_type": imageType,
//             "meta_data": {
//               "name": "Test  image name"
//             }
//           });



// const requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow"
// };

// fetch("https://api.dev.nonprod.civic.ly/core/user/profile-image/upload/", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

    
//   return (
//     <View>
//       <Text>HandleProfileEdit</Text>
//     </View>
//   )
// }

// export default HandleProfileEdit
import React from 'react';
import { View, Text } from 'react-native';
import { fetchAuthSession } from 'aws-amplify/auth';
import { Platform } from 'react-native';

const HandleProfileEdit = async ({ imageName, imageType, image }) => {
  try {
    // Step 1: Fetch auth session
    const session = await fetchAuthSession({ forceRefresh: true });
    if (!session || !session.tokens) throw new Error('Session tokens are undefined');

    const accessToken = session.tokens.accessToken.toString();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    // Step 2: Initiate profile picture upload (First API call)
    const raw = JSON.stringify({
      "image_name": imageName,
      "image_type": imageType,
      "meta_data": {
        "name": "Test image name"
      }
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    let response;
    try {
      response = await fetch("https://api.dev.nonprod.civic.ly/core/user/profile-image/upload/", requestOptions);
      if (!response.ok) {
        console.error("First API call failed.");
        return;
      }
    } catch (error) {
      console.error(`Error occurred during the first call: ${error}`);
      return;  // Stop execution if the first API call fails
    }

    const data = await response.json();
    console.log('First API call response data:', data);

    // Step 3: Upload the file to the provided URL (Second API call)
    if (!data.fields || !data.url) {
      console.error("Missing fields or URL in the response data.");
      return;  // Stop execution if fields or URL are missing
    }

    const postData = new FormData();
    for (const key in data.fields) {
      postData.append(key, data.fields[key]);
    }

    postData.append('file', {
      uri: Platform.OS === 'ios' ? image.sourceURL : image.path,
      name: image.filename,
      type: image.mime,
    });

    console.log(postData);

    try {
      const uploadResponse = await fetch(data.url, {
        method: 'POST',
        body: postData,
      });

      if (!uploadResponse.ok) {
        console.error("File upload failed.");
        return;  // Stop execution if the file upload fails
      }

      console.log('Second API call (File upload) successful.');

    } catch (error) {
      console.error(`Error occurred during the second call: ${error}`);
      return;  // Stop execution if the second API call fails
    }

    // Step 4: Complete the upload (Third API call)
    const completeRaw = JSON.stringify({
      "image_id": data.fields['key'] // Use the key from the first response data
    });

    const completeRequestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: completeRaw,
      redirect: "follow"
    };

    const completeResponse = await fetch("https://api.dev.nonprod.civic.ly/core/user/profile-image/upload/complete/", completeRequestOptions);

    if (!completeResponse.ok) {
      console.error('Failed to complete the image upload.');
      return;  // Stop execution if the third API call fails
    }

    const completeResult = await completeResponse.text();
    console.log('Third API call (Complete upload) response:', completeResult);

  } catch (error) {
    console.error('Failed to upload profile image:', error);
  }

  return (
    <View>
      <Text>Profile Edit Handled</Text>
    </View>
  );
}

export default HandleProfileEdit;

