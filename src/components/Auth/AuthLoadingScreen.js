import React,{Component} from 'react';
import {View,ImageBackground,Dimensions,StyleSheet,Image,Text} from 'react-native';
import CONSTANTS from '../../config/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

export default class AuthLoadingScreen extends React.Component {

    constructor(props) {
      super(props);
      this.moveToNextScreen();
      
    }

    moveToNextScreen = async() => {
      const { navigation } = this.props;
     // setTimeout(function() {
       //navigation.navigate('Auth');
       this.retrieveData();
    //  }, 1500);
    }

    retrieveData = async() => {
      const { navigation } = this.props;
      try {
        AsyncStorage.getItem("isLogin").then((value) => {          
          if (value !== null)
          {
            if(value == 'yes') {
              setTimeout(function() {
                navigation.navigate('App');
              }, 1500);
            } else {
              setTimeout(function() {
                navigation.navigate('Auth');
              }, 1500);
            }
          } else {  
            setTimeout(function() {
               navigation.navigate('Auth');
            }, 1500);
          }
        });
      } catch (error) {}
    }
    
    // Render any loading content that you like here
    render() {
      return (
        <View style={{flex:1,backgroundColor:'red'}}>
          <Image
            source={require('../../images//splash-finalneww.png')}
            style={styles.bgImage}>
          </Image>
        </View>
      );
    }
  }

  var styles = StyleSheet.create({
    bgImage:{
        flex:1,
        width:'100%',
        height:'100%',
        position:'absolute',
        resizeMode: "stretch"
      },
      logoiconImage : {
        width:deviceWidth * 18 / 100,
        height: deviceHeight * 9 / 100,
        alignSelf : 'center',
      },
      logoImage : {
        marginTop:10,
        width:deviceWidth * 72 / 100,
        height: deviceHeight * 6 / 100,
        alignSelf : 'center',
      },
      btmtext : {
        flex:1,
        flexDirection:'column',
        fontSize:13,
        color:'white',
        bottom:12,
        alignSelf:'center',
        position:'absolute',
      
      }
  });