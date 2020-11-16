
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SearchScreen from './screen/SearchScreen';
import ResultScreen from './screen/ResultScreen';
import MyTrayScreen from './screen/MyTrayScreen';
import HistoryScreen from './screen/HistoryScreen';
import Header from './screen/Header';
import {store,persistor} from './redux/store';
import {searchLinkAction} from './redux/actions';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';


const Stack = createStackNavigator();

export default function App(){
  //persistor.purge();
  return (
    <Provider store = {store} >
      <PersistGate loading={null} persistor={persistor}>   
        <NavigationContainer>
          <Stack.Navigator  
                        initialRouteName = {SearchScreen}
                        headerMode = 'screen'
                        screenOptions = {{
                          header:({scene,previous,navigation})=><Header scene={scene} previous={previous}
                                                                        navigation={navigation} />
                        }} >
            <Stack.Screen name='SearchScreen' component={SearchScreen} />
            <Stack.Screen name='ResultScreen' component={ResultScreen} />
            <Stack.Screen name='MyTrayScreen' component={MyTrayScreen} />
            <Stack.Screen name='HistoryScreen' component={HistoryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>  
    );
}
