/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
 
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather'


import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import AddProductScreen from './screens/AddProductScreen'
import ListItems from './screens/ListItems'
import AccountScreen from './screens/AccountScreen'
import 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth'

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'deepskyblue',
    
  },
};

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

const AuthNavigator= ()=>{
  return(
    <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="signup" component={SignupScreen} options={{headerShown:false}} />
      </Stack.Navigator>
  )

}

const TabNavigator =()=>{
  return(
    <Tab.Navigator   screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home'
           
        } else if (route.name === 'Add Product') {
          iconName = 'plus-circle'
        } else{
          iconName='user'
        }

        // You can return any component that you like here!
        return <View style={{borderWidth:1, borderColor:'white', borderRadius:30}}><Feather name={iconName} size={30} color={color} /></View> ;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'deepskyblue',
      inactiveTintColor: 'gray',
    }}>
        <Tab.Screen name="Home" component={ListItems} options={{title:""}}/>
        <Tab.Screen name="Add Product" component={AddProductScreen} options={{title:""}} />
        <Tab.Screen name="Account" component={AccountScreen} options={{title:""}} />

      </Tab.Navigator>
  )
}

const Navigation =()=>{
  const [user,setUser]=useState('')

  useEffect(()=>{
   const unsubscribe= auth().onAuthStateChanged((userExist)=>{
      if(userExist){

        setUser(userExist)
      }else{
        setUser('')

      }
    })
    return unsubscribe
  },[])
  return(
    <NavigationContainer>
      {user?<TabNavigator/>:<AuthNavigator/>}
    </NavigationContainer>
  )
}

const App  = () => {
  return(
    <>
    <PaperProvider theme = {theme}>
    <StatusBar barStyle='dark-content' backgroundColor='deepskyblue' />
   <View style={styles.container}>
    <Navigation/>
    </View>
    </PaperProvider>
    </>//fragment components
     
  );

 
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  backgroundColor:'#fff'
}
 
});

export default App;
