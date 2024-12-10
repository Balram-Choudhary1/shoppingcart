
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import MyCart from '../screens/MyCart';
import ProductInfo from '../screens/ProductInfo';
import LoginScreen from '../screens/LoginScreen';

const Navigation = () => {

const Stack = createNativeStackNavigator();
  return (
     <NavigationContainer>
        <Stack.Navigator  
           screenOptions={{
             headerShown: false,
           }}
        >

         <Stack.Screen name='LoginScreen' component={LoginScreen}/>
           <Stack.Screen name='Home'  component={Home}/>
         
           
            <Stack.Screen name='MyCart' component={MyCart}/>
            <Stack.Screen name='ProductInfo' component={ProductInfo}/>
        </Stack.Navigator>
     </NavigationContainer>
  )
}

export default Navigation;