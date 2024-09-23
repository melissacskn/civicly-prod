import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, Alert, Switch, TouchableWithoutFeedback,ScrollView } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import DashBoardScreen from '../screens/DashBoardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AssetsPage from '../screens/AssetsPage';
import AssetMap from '../screens/AssetMap';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AssetContext } from '../components/AssetContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AssetTable from '../screens/AssetTable';
import { fetchAuthSession } from 'aws-amplify/auth';
import { TenantContext } from '../components/TenantContext';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import config from '../src/config';
const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  const [firstName, setFirstName] = useState('User');
  const [lastName, setLastName] = useState('Name');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100');
  const [email, setEmail] = useState('user@example.com');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState('list');
 
  // const [showSortOptions, setShowSortOptions] = useState(false);
  const { fetchAssets } = useContext(AssetContext);
  const { tenantId } = useContext(TenantContext);
  const bottomSheetRef = useRef(null);
  const snapPoints = ['25%', '80%'];
  const [selectedSortOption, setSelectedSortOption] = useState(null);
  const [showSortOptions, setShowSortOptions] = useState(false);  // Existing sort options visibility state
  const [showViewOptions, setShowViewOptions] = useState(false);  // New view options visibility state
  const {
    showMainCategory, setShowMainCategory,
    showSubCategory, setShowSubCategory,
    showCurrentValue, setShowCurrentValue,
    showInsuranceValue, setShowInsuranceValue,
    showLastInspection, setShowLastInspection,
    showNextInspection, setShowNextInspection,
    showImage, setShowImage
  } = useContext(AssetContext);



 

  const toggleViewOptions = () => {
    if (showViewOptions) {
      setShowViewOptions(false); // Close view options
    } else {
      setShowViewOptions(true);  // Open view options
      setShowSortOptions(false); // Ensure sort options are closed
    }
  };

  const toggleSortOptions = () => {
    if (showSortOptions) {
      setShowSortOptions(false); // Close sort options
    } else {
      setShowSortOptions(true);  // Open sort options
      setShowViewOptions(false); // Ensure view options are closed
    }
  };



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const session = await fetchAuthSession({ forceRefresh: true });
        if (!session || !session.tokens) throw new Error('Session tokens are undefined');
        const accessToken = session.tokens.accessToken.toString();
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${accessToken}`);

        const response = await fetch(`${config.CORE_BASE_URL_DEV}/user/`, {
          method: 'GET',
          headers: myHeaders,
        });

        const result = await response.json();
        setFirstName(result.firstname || 'User');
        setLastName(result.lastname || 'Name');
        setProfileImage(result.profile_image?.image || 'https://via.placeholder.com/100');
        setEmail(result.email || 'user@example.com');
        setUserName(result.username || 'no username');
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
 



  const toggleDropdown = () => {
    bottomSheetRef.current?.expand();
  };

  const handleViewChange = (view) => {
    setViewType(view);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const handleSortChange = (sortOption) => {
    setSelectedSortOption(sortOption);
    if (tenantId) {
      fetchAssets(tenantId, sortOption);
    }
  };
  const renderBackdrop = (props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.7}
      pressBehavior="close"
    />
  );

  const clearSort = () => {
    setSelectedSortOption(null);
    if (tenantId) {
      fetchAssets(tenantId);
    }
  };

  const getSortByLabel = () => {
    if (!selectedSortOption) {
      return 'Date Updated'; 
    }
    switch (selectedSortOption) {
      case 'name':
        return 'Name';
      case 'type':
        return 'Type (A-Z)';
      case 'status':
        return 'Status';
      case 'condition':
        return 'Condition';
      case 'asset_type__asset_category__parent__name':
        return 'Main Category';
      case 'asset_type__asset_category__name':
        return 'Sub Category';
      default:
        return 'Date Updated'; 
    }
  };
  const getTitle = (routeName) => {
    switch (routeName) {
      case 'DashboardScreen':
        return 'Dashboard';
      case 'AssetTable':
        return 'Assets';
      case 'AssetMap':
        return 'Map';
      case 'ProfileScreen':
        return 'Profile';
      default:
        return '';
    }
  };
  


  
  // Custom Drawer Content to display user image and username
const CustomDrawerContent = (props) => {
  const { firstName, lastName, profileImage, userName } = props;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.nameSurname}>{`${firstName} ${lastName}`}</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};


const renderDetailedView = () => (
  <View style={styles.bottomSheetContainer}>
    {/* View Options */}
    <View>
      <TouchableOpacity onPress={toggleViewOptions}>
        <View style={styles.headerRow}>
          <AntDesign name="appstore-o" size={26} color="black" />
          <Text style={styles.headerText}>View Options</Text>
        </View>
      </TouchableOpacity>
    </View>

    {/* Conditionally Render View Options if Sort Options are Hidden */}
    {!showSortOptions && showViewOptions && (
      <>
        {/* Compact View Options Content */}
        <View style={styles.compactOptionContainer}>
          <TouchableOpacity onPress={() => handleViewChange('list')}>
            <View style={styles.compactOption}>
              <Entypo name="menu" size={30} color={viewType === 'list' ? 'green' : 'black'} />
              <Text style={[styles.optionText, viewType === 'list' && styles.selectedItem]}>
                Small
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleViewChange('grid')}>
            <View style={styles.compactOption}>
              <MaterialIcons name="view-module" size={30} color={viewType === 'grid' ? 'green' : 'black'} />
              <Text style={[styles.optionText, viewType === 'grid' && styles.selectedItem]}>
                Large
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Display Options - Conditionally show when viewType is 'list' */}
        {viewType === 'list' && (
          <>
            <Text style={styles.optionTitle}>Display Options</Text>
            <View style={styles.optionRow2}>
              <Text style={styles.optionText2}>Show Image</Text>
              <Switch
                value={showImage}
                onValueChange={() => setShowImage(!showImage)}
              />
            </View>
            <View style={styles.optionRow2}>
              <Text style={styles.optionText2}>Show Main Category</Text>
              <Switch
                value={showMainCategory}
                onValueChange={() => setShowMainCategory(!showMainCategory)}
              />
            </View>
            <View style={styles.optionRow2}>
              <Text style={styles.optionText2}>Show Sub Category</Text>
              <Switch
                value={showSubCategory}
                onValueChange={() => setShowSubCategory(!showSubCategory)}
              />
            </View>
            <View style={styles.optionRow2}>
              <Text style={styles.optionText2}>Show Current Value</Text>
              <Switch
                value={showCurrentValue}
                onValueChange={() => setShowCurrentValue(!showCurrentValue)}
              />
            </View>
            <View style={styles.optionRow2}>
              <Text style={styles.optionText2}>Show Insurance Value</Text>
              <Switch
                value={showInsuranceValue}
                onValueChange={() => setShowInsuranceValue(!showInsuranceValue)}
              />
            </View>
            <View style={styles.optionRow2}>
              <Text style={styles.optionText2}>Show Last Inspection</Text>
              <Switch
                value={showLastInspection}
                onValueChange={() => setShowLastInspection(!showLastInspection)}
              />
            </View>
            <View style={styles.optionRow2}>
              <Text style={styles.optionText2}>Show Next Inspection</Text>
              <Switch
                value={showNextInspection}
                onValueChange={() => setShowNextInspection(!showNextInspection)}
              />
            </View>
          </>
        )}
      </>
    )}

    {/* Divider */}
    <View style={styles.divider} />

    {/* Sort By Section */}
    <TouchableOpacity onPress={toggleSortOptions}>
      <View style={styles.headerRow}>
        <MaterialIcons name="swap-vert" size={30} color="black" />
        <Text style={styles.headerText}>Sort By</Text>
        <Text style={styles.sortByLabel}>{getSortByLabel()}</Text>
      </View>
    </TouchableOpacity>

    {/* Conditionally Render Sort Options if View Options are Hidden */}
    {showSortOptions && !showViewOptions && (
      <>
        <View style={styles.sortOptionsContainer}>
          {[
            { key: 'name', label: 'Name' },
            { key: 'type', label: 'Type (A-Z)' },
            { key: 'status', label: 'Status' },
            { key: 'condition', label: 'Condition' },
            { key: 'asset_type__asset_category__parent__name', label: 'Main Category' },
            { key: 'asset_type__asset_category__name', label: 'Sub Category' },
          ].map((option) => (
            <TouchableOpacity key={option.key} onPress={() => handleSortChange(option.key)}>
              <View style={styles.optionRow}>
                <Text
                  style={[
                    styles.sortOption,
                    selectedSortOption === option.key && styles.selectedSortOption,
                  ]}
                >
                  {option.label}
                </Text>
                {selectedSortOption === option.key && (
                  <FontAwesome
                    name="check"
                    size={18}
                    color="green"
                    style={styles.checkmark}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}

          {/* Conditionally show "Clear Sort" */}
          {selectedSortOption && (
            <View style={styles.clearSortContainer}>
              <TouchableOpacity onPress={clearSort}>
                <Text style={styles.clearSortOption}>✖ Clear Sort</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
            </View>
          )}
        </View>
      </>
    )}
  </View>
);

  return (
    <>
      <Drawer.Navigator
        initialRouteName="DashboardScreen"
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            firstName={firstName}
            lastName={lastName}
            profileImage={profileImage}
            userName={userName}
          />
        )}
        screenOptions={({ route, navigation }) => ({
          header: () => (
            <View style={styles.navBar}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <AntDesign name="menu-fold" size={28} color="black" />
              </TouchableOpacity>
              <Text style={styles.title}>{getTitle(route.name)}</Text>
              {(route.name === 'AssetTable' || route.name === 'AssetsPage') && (
                <View>
                  <TouchableOpacity onPress={toggleDropdown}>
                    <MaterialIcons name="more-vert" size={28} color="black" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ),
          drawerIcon: ({ color }) => {
            let iconName;
            if (route.name === 'DashboardScreen') iconName = 'dashboard';
            else if (route.name === 'AssetTable') iconName = 'appstore1';
            else if (route.name === 'AssetMap') iconName = 'enviromento';
            else if (route.name === 'ProfileScreen') iconName = 'user';
            return <AntDesign name={iconName} size={wp('6%')} color={color} />;
          },
          drawerActiveTintColor: 'green',
          drawerInactiveTintColor: '#4D4D4D',
          drawerStyle: styles.drawer,
        })}
      >
        <Drawer.Screen name="DashboardScreen" component={DashBoardScreen} options={{ title: 'Dashboard' }} />
        <Drawer.Screen name="AssetTable" component={viewType === 'list' ? AssetTable : AssetsPage} options={{ title: 'Assets' }} />
        <Drawer.Screen name="AssetMap" component={AssetMap} options={{ title: 'Map' }} />
        <Drawer.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
      </Drawer.Navigator>

      <TouchableWithoutFeedback onPress={closeBottomSheet}>
        <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints} enablePanDownToClose={true} backdropComponent={renderBackdrop}>
          {renderDetailedView()}
        </BottomSheet>
      </TouchableWithoutFeedback>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  drawer: {
    backgroundColor: 'white',
    width: wp('75%'),
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    fontFamily: 'PublicSans-SemiBold',
  },
  bottomSheetContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 10,
    fontFamily: 'PublicSans-SemiBold',
  },
  optionText2: {
    fontSize: 16,
    paddingVertical: 10,
    fontFamily: 'PublicSans-Regular',
  },
  optionRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  selectedItem: {
    color: 'green',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },

  drawerHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', // Centers the content horizontally
    padding: 20,
  },
  profileImage: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
    marginBottom: 10,
  },
  textContainer: {
    alignItems: 'center', // Centers the text below the image
  },
  nameSurname: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center', // Centers the text
  },
  userName: {
    fontSize: wp('3.5%'),
    color: 'gray',
    textAlign: 'center', // Centers the text
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align items to the left
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 14,
    paddingTop: 5,
    textAlign: 'center',
    fontFamily: 'PublicSans-Regular',
  },
  sortOptionsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  sortOption: {
    fontSize: 16,
    fontFamily: 'PublicSans-Regular',
    textAlign: 'left', // Ensure text is left aligned
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 8,
  },
  headerText: {
    fontSize: 18,
    marginLeft: 10, // Space between icon and text
    fontFamily: 'PublicSans-SemiBold',
  },
  sortByLabel: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 'auto',
    fontFamily: 'PublicSans-SemiBold',
  },
  clearSortContainer: {
    marginTop: 10, // Add some space before the "Clear Sort" button

 
  },
  clearSortOption: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  
  },

  checkmark: {
    marginLeft: 'auto',
  },
  compactOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  compactOption: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default MainDrawer;
