import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import  {Colors} from './../components/styles';
const{primary,tertiary}=Colors
const Stack = createStackNavigator();

function InnerStack() {
    return (
        <Stack.Navigator
        screenOptions={{
            
            headerStyle:{
                backgroundColor: "transparent"
            },
            headerTintColor: primary,
            headerTransparent: true,
            headerTitle:'',
            headerLeftContainerStyle:{
                paddingLeft:20
            }
           
            
          }}>
        
            <Stack.Screen name="Welcome" component={Welcome} />
            
        </Stack.Navigator>
    );
}

export default InnerStack;