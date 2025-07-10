	/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

   import React, {Component} from 'react';
   import {Platform,Text,View} from 'react-native';
   import Login from './src/config/routes';
   import { Root } from "native-base";
import { SafeAreaProvider } from 'react-native-safe-area-context';
   
   const instructions = Platform.select({
     ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
     android:
       'Double tap R on your keyboard to reload,\n' +
       'Shake or press menu button for dev menu',
   });
   //const ShortcutBadger = NativeModules.ShortcutBadger;
   
   type Props = {};
   
   
   export default class App extends Component<Props> {
   
     constructor() {
       super();
       //Text.allowFontScaling = false;
     }
   
      componentDidMount() {
      }
   
     render() {
       return (
               <SafeAreaProvider>
        <Root>
               <Login/> 
            
               </Root>
               </SafeAreaProvider>
       );
     }
   }
   
