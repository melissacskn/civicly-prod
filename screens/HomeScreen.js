////without any charts///////
// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Image } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { fetchAuthSession } from 'aws-amplify/auth';
// import { TenantContext } from '../components/TenantContext';
// import { LocationContext } from '../components/LocationContext';

// const HomeScreen = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { tenantId } = useContext(TenantContext);
//   const { location } = useContext(LocationContext);
//   const [weatherData, setWeatherData] = useState(null);

//   const [statusCounts, setStatusCounts] = useState({
//     DRAFT: 0,
//     ACTIVE: 0,
//     INACTIVE: 0,
//   });

//   // Fetch dashboard data
//   const fetchDashboardData = async () => {
//     const session = await fetchAuthSession({ forceRefresh: true });
//     const accessToken = session.tokens.accessToken.toString();
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${accessToken}`);
//     const requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow",
//     };

//     try {
//       const response = await fetch(
//         `https://api.dev.nonprod.civic.ly/assets/${tenantId}/dashboard`,
//         requestOptions
//       );
//       const result = await response.json();
//       setDashboardData(result);

//       const draft = result.status.find((item) => item.status === 'DRAFT')?.count || 0;
//       const active = result.status.find((item) => item.status === 'ACTIVE')?.count || 0;
//       const inactive = result.status.find((item) => item.status === 'INACTIVE')?.count || 0;

//       setStatusCounts({ DRAFT: draft, ACTIVE: active, INACTIVE: inactive });
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//       Alert.alert("Error", "Failed to fetch dashboard data.");
//       setLoading(false);
//     }
//   };

//   // Fetch weather data
//   const fetchWeatherData = async () => {
//     if (location) {
//       const { latitude, longitude } = location;
//       const apiKey = '2452faa467e14a01bae124145231711';

//       try {
//         const response = await fetch(
//           `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
//         );
//         const result = await response.json();
//         setWeatherData(result);
//       } catch (error) {
//         console.error("Error fetching weather data:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//     fetchWeatherData();
//   }, [location]);

//   if (loading || !dashboardData || !weatherData) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="green" />
//         <Text>Loading Dashboard...</Text>
//       </View>
//     );
//   }

//   const purchaseValue = dashboardData.total_purchase_value || 0;
//   const insuranceValue = dashboardData.total_insurance_value || 0;
//   const differencePercentage = purchaseValue > 0
//     ? Math.abs(((insuranceValue - purchaseValue) / purchaseValue) * 100).toFixed(2)
//     : 0;
//   const differenceColor = differencePercentage >= 95 ? 'green' : 'red';

//   const { location: weatherLocation, current } = weatherData;
//   const { temp_c, condition } = current;

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Dashboard</Text>
//       </View>

//       {/* Total Assets & Assets Value */}
//       <View style={styles.cardRow}>
//         <View style={[styles.card, styles.totalAssetsCard]}>
//           <Text style={styles.cardTitle}>Total Assets</Text>
//           <View style={styles.cardContent}>
//             <Text style={styles.assetCount}>{dashboardData.total_asset || 0}</Text>
//             <View style={styles.statusRow}>
//               <View style={styles.status}>
//                 <Text style={[styles.statusText, { color: 'green' }]}>Active</Text>
//                 <Text>{statusCounts.ACTIVE}</Text>
//               </View>
//               <View style={styles.status}>
//                 <Text style={[styles.statusText, { color: 'red' }]}>Inactive</Text>
//                 <Text>{statusCounts.INACTIVE}</Text>
//               </View>
//               <View style={styles.status}>
//                 <Text style={[styles.statusText, { color: 'blue' }]}>Draft</Text>
//                 <Text>{statusCounts.DRAFT}</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         <View style={[styles.card, styles.assetsValueCard]}>
//           <Text style={styles.cardTitle}>Assets Value</Text>
//           <View style={styles.cardContent}>
//             <View style={[styles.valueBox, { borderColor: 'green' }]}>
//               <Text style={[styles.valueText, { color: 'green' }]}>£{purchaseValue}</Text>
//               <Text style={styles.valueSubText}>Purchase Value</Text>
//             </View>
//             <View style={[styles.valueBox, { borderColor: 'green' }]}>
//               <Text style={[styles.valueText, { color: 'green' }]}>£{insuranceValue}</Text>
//               <Text style={styles.valueSubText}>Insurance Value</Text>
//             </View>
//             <View style={[styles.valueBox, { borderColor: differenceColor }]}>
//               <Text style={[styles.valueText, { color: differenceColor }]}>
//                 {differencePercentage}%
//               </Text>
//               <Text style={styles.valueSubText}>Difference %</Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Average Life Span & Weather Card */}
//       <View style={styles.cardRow}>
//         <View style={styles.lifeSpanCard}>
//          {/* Converting months to years and rounding to 1 decimal place */}
//   <Text style={styles.lifeSpanText}>
//     {(dashboardData.average_life_span / 12).toFixed(1)} Years
//   </Text>
     
  
//           <Text style={styles.lifeSpanSubText}>Average Life Span</Text>
//         </View>

//         <View style={styles.weatherCard}>
//           <Text style={styles.locationText}>📍 {weatherLocation.name}, {weatherLocation.country}</Text>
//           <Text style={styles.conditionText}>{condition.text}</Text>
//           <Image source={{ uri: `https:${condition.icon}` }} style={styles.weatherIcon} />
//           <Text style={styles.temperatureText}>Temperature: {temp_c}°C</Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     paddingHorizontal: wp('3%'),
//   },
//   header: {
//     paddingVertical: hp('2%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: wp('5.5%'),
//     fontWeight: 'bold',
//     color: '#333',
//     fontFamily: 'PublicSans-SemiBold',
//   },
//   cardRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: hp('1%'), // Slightly reduced margin between rows
//   },
//   card: {
//     flex: 1,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: wp('3%'),
//     marginHorizontal: wp('1%'),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   totalAssetsCard: {
//     backgroundColor: '#e6f7e6',  
//   },
//   assetsValueCard: {
//     backgroundColor: '#f7f7f7',
//   },
//   cardTitle: {
//     fontSize: wp('3.8%'),
//     fontWeight: 'bold',
//     marginBottom: hp('1%'),
//     fontFamily: 'PublicSans-SemiBold',
//   },
//   cardContent: {
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//   },
//   valueBox: {
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 8,
//     alignItems: 'center',
//   },
//   valueText: {
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//   },
//   valueSubText: {
//     fontSize: wp('3.5%'),
//     fontFamily: 'PublicSans-Regular',
//   },
//   assetCount: {
//     fontSize: wp('8%'),
//     color: '#000',
//     fontFamily: 'PublicSans-SemiBold',
//   },
//   statusRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: hp('1%'),
//   },
//   status: {
//     alignItems: 'center',
//   },
//   statusText: {
//     fontSize: wp('3.5%'),
//     fontWeight: 'bold',
//     fontFamily: 'PublicSans-SemiBold',
//     // paddingTop: hp('0.5%'),
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   lifeSpanCard: {
//     backgroundColor: '#4CAF50',
//     borderRadius: 10,
//     padding: wp('4%'),
//     marginVertical: hp('2%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: hp('15%'),
//     flex: 1,  // Ensures it takes equal space in the row
//     marginHorizontal: wp('1%'),
//   },
//   lifeSpanText: {
//     fontSize: wp('6%'),
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontFamily: 'PublicSans-SemiBold',
//   },
//   lifeSpanSubText: {
//     fontSize: wp('4%'),
//     color: 'white',
//     textAlign: 'center',
//     fontFamily: 'PublicSans-Regular',
//   },
//   weatherCard: {
//     backgroundColor: '#00ACC1',
//     borderRadius: 10,
//     padding: 10,
//     marginVertical: hp('2%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,  // Ensures it takes equal space in the row
//     marginHorizontal: wp('1%'),
//   },
//   locationText: {
//     fontSize: wp('4%'),
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   conditionText: {
//     fontSize: wp('3.8%'),
//     color: '#fff',
//   },
//   weatherIcon: {
//     width: 50,
//     height: 50,
//     marginVertical: 10,
//   },
//   temperatureText: {
//     fontSize: wp('4%'),
//     fontWeight: 'bold',
//     color: '#fff',
//   },
// });

// export default HomeScreen;

////// 26 august there are piw charts without donut hole////

// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Image } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { PieChart } from 'react-native-chart-kit';
// import { Dimensions } from 'react-native';
// import { fetchAuthSession } from 'aws-amplify/auth';
// import { TenantContext } from '../components/TenantContext';
// import { LocationContext } from '../components/LocationContext';

// const HomeScreen = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { tenantId } = useContext(TenantContext);
//   const { location } = useContext(LocationContext);
//   const [weatherData, setWeatherData] = useState(null);

//   const [statusCounts, setStatusCounts] = useState({
//     DRAFT: 0,
//     ACTIVE: 0,
//     INACTIVE: 0,
//   });

//   const [conditionData, setConditionData] = useState([]); // State for storing asset condition chart data

//   // Fetch dashboard data
//   const fetchDashboardData = async () => {
//     const session = await fetchAuthSession({ forceRefresh: true });
//     const accessToken = session.tokens.accessToken.toString();
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${accessToken}`);
//     const requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow",
//     };

//     try {
//       const response = await fetch(
//         `https://api.dev.nonprod.civic.ly/assets/${tenantId}/dashboard`,
//         requestOptions
//       );
//       const result = await response.json();
//       setDashboardData(result);

//       const draft = result.status.find((item) => item.status === 'DRAFT')?.count || 0;
//       const active = result.status.find((item) => item.status === 'ACTIVE')?.count || 0;
//       const inactive = result.status.find((item) => item.status === 'INACTIVE')?.count || 0;

//       setStatusCounts({ DRAFT: draft, ACTIVE: active, INACTIVE: inactive });

//       // Map conditions from API response to chart data format
//       const conditions = result.conditions.map(condition => ({
//         name: condition.condition,
//         population: condition.count,
//         color: getColorForCondition(condition.condition), // Assign color based on condition type
//         legendFontColor: "#7F7F7F",
//         legendFontSize: 15
//       }));
//       setConditionData(conditions); // Set condition data for the chart

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//       Alert.alert("Error", "Failed to fetch dashboard data.");
//       setLoading(false);
//     }
//   };

//   // Fetch weather data
//   const fetchWeatherData = async () => {
//     if (location) {
//       const { latitude, longitude } = location;
//       const apiKey = '2452faa467e14a01bae124145231711';

//       try {
//         const response = await fetch(
//           `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
//         );
//         const result = await response.json();
//         setWeatherData(result);
//       } catch (error) {
//         console.error("Error fetching weather data:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//     fetchWeatherData();
//   }, [location]);

//   if (loading || !dashboardData || !weatherData || conditionData.length === 0) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="green" />
//         <Text>Loading Dashboard...</Text>
//       </View>
//     );
//   }

//   const purchaseValue = dashboardData.total_purchase_value || 0;
//   const insuranceValue = dashboardData.total_insurance_value || 0;
//   const differencePercentage = purchaseValue > 0
//     ? Math.abs(((insuranceValue - purchaseValue) / purchaseValue) * 100).toFixed(2)
//     : 0;
//   const differenceColor = differencePercentage >= 95 ? 'green' : 'red';

//   const { location: weatherLocation, current } = weatherData;
//   const { temp_c, condition } = current;

//   return (
//     <ScrollView contentContainerStyle={{ minHeight: hp('100%') }} style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Dashboard</Text>
//       </View>

//       {/* Total Assets & Assets Value */}
//       <View style={styles.cardRow}>
//         <View style={[styles.card, styles.totalAssetsCard]}>
//           <Text style={styles.cardTitle}>Total Assets</Text>
//           <View style={styles.cardContent}>
//             <Text style={styles.assetCount}>{dashboardData.total_asset || 0}</Text>
//             <View style={styles.statusRow}>
//               <View style={styles.status}>
//                 <Text style={[styles.statusText, { color: 'green' }]}>Active</Text>
//                 <Text>{statusCounts.ACTIVE}</Text>
//               </View>
//               <View style={styles.status}>
//                 <Text style={[styles.statusText, { color: 'red' }]}>Inactive</Text>
//                 <Text>{statusCounts.INACTIVE}</Text>
//               </View>
//               <View style={styles.status}>
//                 <Text style={[styles.statusText, { color: 'blue' }]}>Draft</Text>
//                 <Text>{statusCounts.DRAFT}</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         <View style={[styles.card, styles.assetsValueCard]}>
//           <Text style={styles.cardTitle}>Assets Value</Text>
//           <View style={styles.cardContent}>
//             <View style={[styles.valueBox, { borderColor: 'green' }]}>
//               <Text style={[styles.valueText, { color: 'green' }]}>£{purchaseValue}</Text>
//               <Text style={styles.valueSubText}>Purchase Value</Text>
//             </View>
//             <View style={[styles.valueBox, { borderColor: 'green' }]}>
//               <Text style={[styles.valueText, { color: 'green' }]}>£{insuranceValue}</Text>
//               <Text style={styles.valueSubText}>Insurance Value</Text>
//             </View>
//             <View style={[styles.valueBox, { borderColor: differenceColor }]}>
//               <Text style={[styles.valueText, { color: differenceColor }]}>
//                 {differencePercentage}%
//               </Text>
//               <Text style={styles.valueSubText}>Difference %</Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Average Life Span & Weather Card */}
//       <View style={styles.cardRow}>
//         <View style={styles.lifeSpanCard}>
//           {/* Converting months to years and rounding to 1 decimal place */}
//           <Text style={styles.lifeSpanText}>
//             {(dashboardData.average_life_span / 12).toFixed(1)} Years
//           </Text>
//           <Text style={styles.lifeSpanSubText}>Average Life Span</Text>
//         </View>

//         <View style={styles.weatherCard}>
//           <Text style={styles.locationText}>📍 {weatherLocation.name}, {weatherLocation.country}</Text>
//           <Text style={styles.conditionText}>{condition.text}</Text>
//           <Image source={{ uri: `https:${condition.icon}` }} style={styles.weatherIcon} />
//           <Text style={styles.temperatureText}>Temperature: {temp_c}°C</Text>
//         </View>
//       </View>

//       {/* Asset Condition Pie Chart with Labels Above the Chart */}
//       <View style={styles.chartContainer}>
//         <Text style={styles.chartTitle}>Asset Condition</Text>


//         <PieChart
//           data={conditionData} // Data dynamically from API
//           width={Dimensions.get('window').width - wp('6%')} // Adjust width to fit within screen
//           height={220}
          
//           chartConfig={{
//             backgroundColor: '#1cc910',
//             backgroundGradientFrom: '#eff3ff',
//             backgroundGradientTo: '#efefef',
//             decimalPlaces: 2,
//             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//             style: {
//               borderRadius: 16,
//             },
//           }}
//           accessor={"population"}
//           backgroundColor={"transparent"}
//           paddingLeft={"15"}
//           absolute
//         />
//       </View>
//     </ScrollView>
//   );
// };

// // Helper function to get color based on condition type
// const getColorForCondition = (condition) => {
//   switch (condition) {
//     case 'NEW':
//       return '#00BFFF';
//     case 'GOOD':
//       return 'green';
//     case 'FAIR':
//       return 'orange';
//     case 'POOR':
//       return 'red';
//     default:
//       return 'gray'; // Default color for unexpected conditions
//   }
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     paddingHorizontal: wp('3%'),
//   },
//   header: {
//     paddingVertical: hp('2%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: wp('5.5%'),
//     fontWeight: 'bold',
//     color: '#333',
//     fontFamily: 'PublicSans-SemiBold',
//   },
//   cardRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: hp('1%'), // Slightly reduced margin between rows
//   },
//   card: {
//     flex: 1,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: wp('3%'),
//     marginHorizontal: wp('1%'),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   totalAssetsCard: {
//     backgroundColor: '#e6f7e6',  
//   },
//   assetsValueCard: {
//     backgroundColor: '#f7f7f7',
//   },
//   cardTitle: {
//     fontSize: wp('3.8%'),
//     fontWeight: 'bold',
//     marginBottom: hp('1%'),
//     fontFamily: 'PublicSans-SemiBold',
//   },
//   cardContent: {
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//   },
//   valueBox: {
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 8,
//     alignItems: 'center',
//   },
//   valueText: {
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//   },
//   valueSubText: {
//     fontSize: wp('3.5%'),
//     fontFamily: 'PublicSans-Regular',
//   },
//   assetCount: {
//     fontSize: wp('8%'),
//     color: '#000',
//     fontFamily: 'PublicSans-SemiBold',
//   },
//   statusRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: hp('1%'),
//   },
//   status: {
//     alignItems: 'center',
//   },
//   statusText: {
//     fontSize: wp('3.5%'),
//     fontWeight: 'bold',
//     fontFamily: 'PublicSans-SemiBold',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   chartContainer: {
//     marginTop: hp('2%'),
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: wp('3%'),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   chartTitle: {
//     fontSize: wp('4.5%'),
//     fontWeight: 'bold',
//     marginBottom: hp('1%'),
//     textAlign: 'center',
//   },

//   lifeSpanCard: {
//     backgroundColor: '#4CAF50',
//     borderRadius: 10,
//     padding: wp('4%'),
//     marginVertical: hp('2%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: hp('15%'),
//     flex: 1,  // Ensures it takes equal space in the row
//     marginHorizontal: wp('1%'),
//   },
//   lifeSpanText: {
//     fontSize: wp('6%'),
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontFamily: 'PublicSans-SemiBold',
//   },
//   lifeSpanSubText: {
//     fontSize: wp('4%'),
//     color: 'white',
//     textAlign: 'center',
//     fontFamily: 'PublicSans-Regular',
//   },
//   weatherCard: {
//     backgroundColor: '#00ACC1',
//     borderRadius: 10,
//     padding: 10,
//     marginVertical: hp('2%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,  // Ensures it takes equal space in the row
//     marginHorizontal: wp('1%'),
//   },
//   locationText: {
//     fontSize: wp('4%'),
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   conditionText: {
//     fontSize: wp('3.8%'),
//     color: '#fff',
//   },
//   weatherIcon: {
//     width: 50,
//     height: 50,
//     marginVertical: 10,
//   },
//   temperatureText: {
//     fontSize: wp('4%'),
//     fontWeight: 'bold',
//     color: '#fff',
//   },
// });

// export default HomeScreen;


/////27 august pie charts with donut holes +bar chart/////////

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Image, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PieChart,BarChart } from 'react-native-chart-kit';
import { fetchAuthSession } from 'aws-amplify/auth';
import { TenantContext } from '../components/TenantContext';
import { LocationContext } from '../components/LocationContext';


const HomeScreen = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { tenantId } = useContext(TenantContext);
  const { location } = useContext(LocationContext);
  const [weatherData, setWeatherData] = useState(null);
  const [insuranceBreakdownData, setInsuranceBreakdownData] = useState([]); // State for insurance value pie chart
  const [subCategoryData, setSubCategoryData] = useState({ labels: [], datasets: [] }); // State for subcategory bar chart data

  const [statusCounts, setStatusCounts] = useState({
    DRAFT: 0,
    ACTIVE: 0,
    INACTIVE: 0,
  });

  const [conditionData, setConditionData] = useState([]); // State for storing asset condition chart data

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    const session = await fetchAuthSession({ forceRefresh: true });
    const accessToken = session.tokens.accessToken.toString();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://api.dev.nonprod.civic.ly/assets/${tenantId}/dashboard`,
        requestOptions
      );
      const result = await response.json();
      setDashboardData(result);

      const draft = result.status.find((item) => item.status === 'DRAFT')?.count || 0;
      const active = result.status.find((item) => item.status === 'ACTIVE')?.count || 0;
      const inactive = result.status.find((item) => item.status === 'INACTIVE')?.count || 0;

      setStatusCounts({ DRAFT: draft, ACTIVE: active, INACTIVE: inactive });
      

      // Map conditions from API response to chart data format (for PieChart)
      const conditions = result.conditions.map(condition => ({
        name: condition.condition,
        population: condition.count,
        color: getColorForCondition(condition.condition), // Assign color based on condition type
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }));
      setConditionData(conditions); 
      // Format subcategories for the bar chart
      const subCategories = result.sub_categories;
      const labels = subCategories.map((sub) => sub.name); // Subcategory names
      const data = subCategories.map((sub) => sub.count);  // Subcategory counts

      setSubCategoryData({
        labels,
        datasets: [
          {
            data,
          },
        ],
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      Alert.alert("Error", "Failed to fetch dashboard data.");
      setLoading(false);
    }
  };

  // Fetch asset data to calculate insurance value breakdown
  const fetchAssetData = async () => {
    const session = await fetchAuthSession({ forceRefresh: true });
    const accessToken = session.tokens.accessToken.toString();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(`https://api.dev.nonprod.civic.ly/assets/${tenantId}/asset/`, requestOptions);
      const result = await response.json();
      
      // Aggregate insurance values by asset category parent name
      const insuranceBreakdown = {};
      result.results.forEach(asset => {
        const parentName = asset.asset_type.asset_category.parent.name;
        const insuranceValue = asset.insurance_value || 0;
        if (!insuranceBreakdown[parentName]) {
          insuranceBreakdown[parentName] = 0;
        }
        insuranceBreakdown[parentName] += insuranceValue;
      });

      // Filter out categories with 0 insurance value
      const filteredPieChartData = Object.keys(insuranceBreakdown)
        .filter(category => insuranceBreakdown[category] > 0) // Exclude zero insurance value categories
        .map((category, index) => ({
          name: category,
          population: insuranceBreakdown[category],
          color: getRandomColor(index),
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        }));

      setInsuranceBreakdownData(filteredPieChartData);
    } catch (error) {
      console.error("Error fetching asset data:", error);
      Alert.alert("Error", "Failed to fetch asset data.");
    }
  };
   // Random color generator for pie chart
   const getRandomColor = (index) => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
    return colors[index % colors.length];
  };

  // Fetch weather data
  const fetchWeatherData = async () => {
    if (location) {
      const { latitude, longitude } = location;
      const apiKey = '2452faa467e14a01bae124145231711';

      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
        );
        const result = await response.json();
        setWeatherData(result);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchAssetData();
    fetchWeatherData();
  }, [location]);

  if (loading || !dashboardData || !conditionData.length || !insuranceBreakdownData.length || !weatherData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="green" />
        <Text>Loading Dashboard...</Text>
      </View>
    );
  }

  const purchaseValue = dashboardData.total_purchase_value || 0;
  const insuranceValue = dashboardData.total_insurance_value || 0;
  const averageLifeSpan = dashboardData.average_life_span || 0; // Fetch average lifespan
  const differencePercentage = purchaseValue > 0
    ? Math.abs(((insuranceValue - purchaseValue) / purchaseValue) * 100).toFixed(2)
    : 0;
  const differenceColor = differencePercentage >= 95 ? 'green' : 'red';

  const { location: weatherLocation, current } = weatherData;
  const { temp_c, condition } = current;





  return (
    <ScrollView contentContainerStyle={{ minHeight: hp('300%') }} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      {/* Total Assets & Assets Value */}
      <View style={styles.cardRow}>
        <View style={[styles.card, styles.totalAssetsCard]}>
          <Text style={styles.cardTitle}>Total Assets</Text>
          <View style={styles.cardContent}>
            <Text style={styles.assetCount}>{dashboardData.total_asset || 0}</Text>
            <View style={styles.statusRow}>
              <View style={styles.status}>
                <Text style={[styles.statusText, { color: 'green' }]}>Active</Text>
                <Text>{statusCounts.ACTIVE}</Text>
              </View>
              <View style={styles.status}>
                <Text style={[styles.statusText, { color: 'red' }]}>Inactive</Text>
                <Text>{statusCounts.INACTIVE}</Text>
              </View>
              <View style={styles.status}>
                <Text style={[styles.statusText, { color: 'blue' }]}>Draft</Text>
                <Text>{statusCounts.DRAFT}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.card, styles.assetsValueCard]}>
          <Text style={styles.cardTitle}>Assets Value</Text>
          <View style={styles.cardContent}>
            <View style={[styles.valueBox, { borderColor: 'green' }]}>
              <Text style={[styles.valueText, { color: 'green' }]}>£{purchaseValue}</Text>
              <Text style={styles.valueSubText}>Purchase Value</Text>
            </View>
            <View style={[styles.valueBox, { borderColor: 'green' }]}>
              <Text style={[styles.valueText, { color: 'green' }]}>£{insuranceValue}</Text>
              <Text style={styles.valueSubText}>Insurance Value</Text>
            </View>
            <View style={[styles.valueBox, { borderColor: differenceColor }]}>
              <Text style={[styles.valueText, { color: differenceColor }]}>
                {differencePercentage}%
              </Text>
              <Text style={styles.valueSubText}>Difference %</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Average Life Span & Weather Card */}
      <View style={styles.cardRow}>
        <View style={styles.lifeSpanCard}>
          {/* Converting months to years and rounding to 1 decimal place */}
          <Text style={styles.lifeSpanText}>
            {(averageLifeSpan / 12).toFixed(1)} Years
          </Text>
          <Text style={styles.lifeSpanSubText}>Average Life Span</Text>
        </View>

        <View style={styles.weatherCard}>
          <Text style={styles.locationText}>📍 {weatherLocation.name}, {weatherLocation.country}</Text>
          <Text style={styles.conditionText}>{condition.text}</Text>
          <Image source={{ uri: `https:${condition.icon}` }} style={styles.weatherIcon} />
          <Text style={styles.temperatureText}>Temperature: {temp_c}°C</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
  <Text style={styles.chartTitle}>Asset Condition</Text>
  <View style={styles.donutWrapper}>
    <PieChart
      data={conditionData} // Pass the formatted condition data with percentages
      width={Dimensions.get('window').width - wp('20%')} // Adjust width to fit within screen
      height={220}
      chartConfig={{
        backgroundColor: '#1cc910',
        backgroundGradientFrom: '#eff3ff',
        backgroundGradientTo: '#efefef',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      accessor={"population"}
      backgroundColor={"transparent"}
      paddingLeft={"15"}
      absolute
    />
    {/* White center for donut effect */}
    <View style={styles.donutHole} />
  </View>
</View>


      {/* Total Insurance Value Breakdown Donut Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Total Insurance Value Breakdown</Text>
        <View style={styles.donutWrapper}>
          <PieChart
            data={insuranceBreakdownData} // Data from asset API
            width={Dimensions.get('window').width - wp('20%')} // Adjust width to fit within screen
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              // decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute
          />
          {/* White center for donut effect */}
          <View style={styles.donutHole} />
        </View>
      </View>

        {/* Subcategory Bar Chart
        <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Asset Categories</Text>
        
        <BarChart
  data={subCategoryData}
  width={Dimensions.get('window').width - wp('10%')} // Adjust width to fit within screen
  height={350}
  yAxisLabel={""}
  yAxisSuffix={""}
  fromZero // Ensure chart starts from zero
  chartConfig={{
    backgroundColor: '#fff', // Ensure background is white
    backgroundGradientFrom: '#fff', // No background gradient
    backgroundGradientTo: '#fff',   // Solid background color
    decimalPlaces: 0, // No decimal places
    
    fillShadowGradientFrom: "rgba(38, 176, 186, 0.85)",
    fillShadowGradientFromOpacity: 1,   
    fillShadowGradientTo: `rgba(38, 176, 186, 0.85)`,
    fillShadowGradientToOpacity: 1,

    color: (opacity = 1) => `rgba(38, 176, 186, ${opacity})`, // Bar color
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Axis label color
    style: {
      borderRadius: 16,
    },
  
    yAxisInterval: 1,  // Ensures Y-axis labels are spaced by 1 unit
    fillShadowGradient: 'rgba(38, 176, 186, 0.85)',  // Bar fill color
    fillShadowGradientOpacity: 1, // Fully opaque bars
    propsForBackgroundLines: {
      strokeDasharray: "", // Make the grid lines solid
      stroke: "rgba(0, 0, 0, 0.1)", // Light gray grid line color
      strokeWidth: 1.5, // Adjust the thickness of the grid lines
    },
    
  
  }}
  showValuesOnTopOfBars
  showBarTops={false} // Remove the top line on the bars
  verticalLabelRotation={45} // Rotate x-axis labels for better readability
/>


        </View> */}
           {/* Subcategory Bar Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Asset Categories</Text>

        <Text
  style={{
    transform: [{ rotate: '-90deg' }],
    position: 'absolute',
    left: -wp('6%'), // Reduce the left margin
    top: hp('18%'), // Adjust the top position for better alignment
    fontSize: 14, // Decrease the font size to fit better
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'PublicSans-SemiBold',
  }}
>
  Asset Count
</Text>
<ScrollView showsHorizontalScrollIndicator={true} persistentScrollbar={true} horizontal={true} contentContainerStyle={{ minWidth: subCategoryData.labels.length > 5 ? wp('120%') : wp('100%') }}>
        <BarChart
          data={subCategoryData}
          // width={Dimensions.get('window').width - wp('10%')} // Adjust width to fit within screen
          width={subCategoryData.labels.length * 60} // Dynamically calculate width based on number of bars
          height={350}
          yAxisLabel={""}
          yAxisSuffix={""}
          fromZero // Ensure chart starts from zero
          chartConfig={{
            backgroundColor: '#fff', // Ensure background is white
            backgroundGradientFrom: '#fff', // No background gradient
            backgroundGradientTo: '#fff',   // Solid background color
            decimalPlaces: 0, // No decimal places
            fillShadowGradientFrom: "rgba(38, 176, 186, 0.85)",
            fillShadowGradientFromOpacity: 1,
            fillShadowGradientTo: `rgba(38, 176, 186, 0.85)`,
            fillShadowGradientToOpacity: 1,
            
            color: (opacity = 1) => `rgba(38, 176, 186, ${opacity})`, // Bar color
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Axis label color
            
            style: {
              borderRadius: 16,
            },
            yAxisInterval: 1,  // Ensures Y-axis labels are spaced by 1 unit
            fillShadowGradient: 'rgba(38, 176, 186, 0.85)',  // Bar fill color
            fillShadowGradientOpacity: 1, // Fully opaque bars
            propsForBackgroundLines: {
              strokeDasharray: "", // Make the grid lines solid
              stroke: "rgba(0, 0, 0, 0.1)", // Light gray grid line color
              strokeWidth: 1.5, // Adjust the thickness of the grid lines
            },
            barPercentage: 0.7, // Adjust the bar width percentage relative to the space
          }}
          
          showValuesOnTopOfBars
          showBarTops={false} // Remove the top line on the bars
          verticalLabelRotation={45} // Rotate x-axis labels for better readability
        />
        </ScrollView>
        

        {/* X-axis label */}
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: hp('2%'),
            fontFamily: 'PublicSans-SemiBold',
          }}
        >
          Subcategories
        </Text>
      </View>

    </ScrollView>
  );
};

// Helper function to get color based on condition type
const getColorForCondition = (condition) => {
  switch (condition) {
    case 'NEW':
      return '#00BFFF';
    case 'GOOD':
      return 'green';
    case 'FAIR':
      return 'orange';
    case 'POOR':
      return 'red';
    default:
      return 'gray'; // Default color for unexpected conditions
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: wp('3%'),
  },
  header: {
    paddingVertical: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'PublicSans-SemiBold',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp('1%'), // Responsive vertical margin
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: wp('2%'), // Responsive border radius
    padding: wp('3%'), // Responsive padding
    marginHorizontal: wp('1%'), // Responsive horizontal margin
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('0.2%') }, // Responsive shadow offset
    shadowOpacity: 0.1,
    shadowRadius: wp('1%'), // Responsive shadow radius
    elevation: 3,
  },
  totalAssetsCard: {
    backgroundColor: '#e6f7e6',  
  },
  assetsValueCard: {
    backgroundColor: '#f7f7f7',
  },
  cardTitle: {
    fontSize: wp('3.8%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'), // Responsive bottom margin
    fontFamily: 'PublicSans-SemiBold',
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  valueBox: {
    borderWidth: 1,
    borderRadius: wp('1.5%'), // Responsive border radius
    marginBottom: hp('1%'), // Responsive bottom margin
    alignItems: 'center',
    paddingVertical: hp('0.5%'), // Responsive vertical padding
  },
  valueText: {
    fontSize: wp('5%'), // Responsive font size
    fontWeight: 'bold',
  },
  valueSubText: {
    fontSize: wp('3.5%'), // Responsive font size
    fontFamily: 'PublicSans-Regular',
  },
  assetCount: {
    fontSize: wp('8%'), // Responsive font size
    color: '#000',
    fontFamily: 'PublicSans-SemiBold',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1%'), // Responsive top margin
  },
  status: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: wp('3.5%'), // Responsive font size
    fontWeight: 'bold',
    fontFamily: 'PublicSans-SemiBold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    marginTop: hp('2%'), // Responsive top margin
    backgroundColor: 'white',
    borderRadius: wp('2%'), // Responsive border radius
    padding: wp('3%'), // Responsive padding
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('0.2%') }, // Responsive shadow offset
    shadowOpacity: 0.1,
    shadowRadius: wp('1%'), // Responsive shadow radius
    elevation: 3,
  paddingLeft: wp('6%'),
  
  },
  chartTitle: {
    fontSize: wp('4.5%'), // Responsive font size
    fontWeight: 'bold',
    marginBottom: hp('1%'), // Responsive bottom margin
    textAlign: 'center',
  },
  donutWrapper: {
    position: 'relative',
    width: Dimensions.get('window').width - wp('20%'), // Match the width of the chart
    height: hp('30%'), // Responsive height
    justifyContent: 'center',
    alignItems: 'center', // Center the hole
  },
  donutHole: {
    position: 'absolute',
    width: wp('15%'), // Responsive width for the hole
    height: wp('15%'), // Make height same as width for circular hole
    backgroundColor: 'white',
    borderRadius: wp('7.5%'), // Half of width for a perfect circle
    left: '20%',  // Center the hole
   
  },
  lifeSpanCard: {
    backgroundColor: '#4CAF50',
    borderRadius: wp('2%'), // Responsive border radius
    padding: wp('4%'), // Responsive padding
    marginVertical: hp('2%'), // Responsive vertical margin
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: hp('15%'), // Responsive minimum height
    flex: 1,  // Ensures it takes equal space in the row
    marginHorizontal: wp('1%'), // Responsive horizontal margin
  },
  lifeSpanText: {
    fontSize: wp('6%'), // Responsive font size
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'PublicSans-SemiBold',
  },
  lifeSpanSubText: {
    fontSize: wp('4%'), // Responsive font size
    color: 'white',
    textAlign: 'center',
    fontFamily: 'PublicSans-Regular',
  },
  weatherCard: {
    backgroundColor: '#00ACC1',
    borderRadius: wp('2%'), // Responsive border radius
    padding: wp('2%'), // Responsive padding
    marginVertical: hp('2%'), // Responsive vertical margin
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,  // Ensures it takes equal space in the row
    marginHorizontal: wp('1%'), // Responsive horizontal margin
  },
  locationText: {
    fontSize: wp('4%'), // Responsive font size
    fontWeight: 'bold',
    color: '#fff',
  },
  conditionText: {
    fontSize: wp('3.8%'), // Responsive font size
    color: '#fff',
  },
  weatherIcon: {
    width: wp('12%'), // Responsive width for the weather icon
    height: wp('12%'), // Responsive height for the weather icon
    marginVertical: hp('1%'), // Responsive vertical margin
  },
  temperatureText: {
    fontSize: wp('4%'), // Responsive font size
    fontWeight: 'bold',
    color: '#fff',
  },
});


export default HomeScreen;
