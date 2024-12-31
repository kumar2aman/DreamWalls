

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HomePage from '../homePage';
import UserUploads from '../usersUploads';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

 export default function MyTabs() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Users upload" component={UserUploads} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}






