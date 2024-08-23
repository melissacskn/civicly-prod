import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fetchAuthSession } from 'aws-amplify/auth';
import { TenantContext } from '../components/TenantContext';
import { LocationContext } from '../components/LocationContext';

const HomeScreen = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { tenantId } = useContext(TenantContext);
  const { location } = useContext(LocationContext);
  const [weatherData, setWeatherData] = useState(null);

  const [statusCounts, setStatusCounts] = useState({
    DRAFT: 0,
    ACTIVE: 0,
    INACTIVE: 0,
  });

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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      Alert.alert("Error", "Failed to fetch dashboard data.");
      setLoading(false);
    }
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
    fetchWeatherData();
  }, [location]);

  if (loading || !dashboardData || !weatherData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="green" />
        <Text>Loading Dashboard...</Text>
      </View>
    );
  }

  const purchaseValue = dashboardData.total_purchase_value || 0;
  const insuranceValue = dashboardData.total_insurance_value || 0;
  const differencePercentage = purchaseValue > 0
    ? Math.abs(((insuranceValue - purchaseValue) / purchaseValue) * 100).toFixed(2)
    : 0;
  const differenceColor = differencePercentage >= 95 ? 'green' : 'red';

  const { location: weatherLocation, current } = weatherData;
  const { temp_c, condition } = current;

  return (
    <ScrollView style={styles.container}>
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
    {(dashboardData.average_life_span / 12).toFixed(1)} Years
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
    </ScrollView>
  );
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
    marginVertical: hp('1%'), // Slightly reduced margin between rows
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: wp('3%'),
    marginHorizontal: wp('1%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
    marginBottom: hp('1%'),
    fontFamily: 'PublicSans-SemiBold',
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  valueBox: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 8,
    alignItems: 'center',
  },
  valueText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  valueSubText: {
    fontSize: wp('3.5%'),
    fontFamily: 'PublicSans-Regular',
  },
  assetCount: {
    fontSize: wp('8%'),
    color: '#000',
    fontFamily: 'PublicSans-SemiBold',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
  },
  status: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
    fontFamily: 'PublicSans-SemiBold',
    // paddingTop: hp('0.5%'),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lifeSpanCard: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: wp('4%'),
    marginVertical: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: hp('15%'),
    flex: 1,  // Ensures it takes equal space in the row
    marginHorizontal: wp('1%'),
  },
  lifeSpanText: {
    fontSize: wp('6%'),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'PublicSans-SemiBold',
  },
  lifeSpanSubText: {
    fontSize: wp('4%'),
    color: 'white',
    textAlign: 'center',
    fontFamily: 'PublicSans-Regular',
  },
  weatherCard: {
    backgroundColor: '#00ACC1',
    borderRadius: 10,
    padding: 10,
    marginVertical: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,  // Ensures it takes equal space in the row
    marginHorizontal: wp('1%'),
  },
  locationText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#fff',
  },
  conditionText: {
    fontSize: wp('3.8%'),
    color: '#fff',
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  temperatureText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HomeScreen;



