
import React, { createContext, useState } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';

export const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssets = async (tenantId, ordering = '') => {
    setLoading(true);
    try {
      const session = await fetchAuthSession({ forceRefresh: true });
      const accessToken = session.tokens.accessToken.toString();
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      // Construct the API URL dynamically based on the ordering parameter
      let apiUrl = `https://api.dev.nonprod.civic.ly/assets/${tenantId}/asset/`;
      if (ordering) {
        apiUrl += `?ordering=${ordering}`;
      }

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(apiUrl, requestOptions);
      const json = await response.json();

      const newData = json.results.map((item) => {
        const coordinates = item.asset_location?.features[0]?.geometry?.coordinates || [null, null];
        const assetUploads = item.asset_uploads || [];
        const imageUrl = assetUploads.length > 0 ? assetUploads[0].medium_file_url : 'https://via.placeholder.com/100';
        return {
          id: item.id,
          name: item.name,
          asset_uploads: item.asset_uploads,
          status: item.status,
          condition: item.condition,
          asset_type_name: item.asset_type?.name || 'Unknown',
          latitude: coordinates[1],
          longitude: coordinates[0],
          asset_type_id: item.asset_type?.id || 0,
          imageUrl: imageUrl,
          insurance_value: item.insurance_value || 0,
          purchase_value: item.purchase_value || 0,
          warranty_expiry_date: item.warranty_expiry_date,
          date_acquired: item.date_acquired,
          next_inspection_date: item.next_inspection_date,
          last_inspection_date: item.last_inspection_date,
          estimated_life_months: item.estimated_life_months || 0,
          charges: item.charges || 0,
          main_category: item.asset_type?.asset_category?.parent?.name || 'Unknown',
          sub_category: item.asset_type?.asset_category?.name || 'Unknown',
        };
      });
      console.log(newData);

      setAssets(newData);  
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AssetContext.Provider value={{ assets, loading, fetchAssets }}>
      {children}
    </AssetContext.Provider>
  );
};
