import React, { Component } from 'react';
import { StyleSheet, View,Dimensions,Platform,TouchableOpacity,Image,ImageBackground } from 'react-native';
import { Header,Button,Text } from 'native-base';
import { Icon } from 'react-native-elements';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

export default class HeaderApp extends React.Component {

  constructor(props) {
      super(props);
  }

  setHeadersize() {
    return Platform.OS === 'ios'? 14:14;
  }

  setsize() {
    return Platform.OS === 'ios'? 5.5:10.8;
  }

  render() {
    if(this.props.name === 'Scan') {
      return (
              <View style={{height:deviceHeight * this.setHeadersize() / 100,backgroundColor:'transparent',flexDirection : 'column',zIndex:4}}>
        <Header transparent style={{height:deviceHeight * this.setsize() / 100, paddingLeft:0, paddingRight:0,backgroundColor:'#002941'}}>
          <View style={{flexDirection : 'row' , width: '100%',flex:1,justifyContent:'space-between'}}>
              <View style={{justifyContent:'center',flex:1}}>
                <TouchableOpacity onPress={()=>this.OnBackClick()} style={{width:deviceWidth * 16 / 100}}>
                 <Image source={require('../images//back.png')} style={styles.backicon}  />
                </TouchableOpacity>
              </View>
              <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',flex:2}}>
                <Text style={{fontSize:deviceHeight * 2.6 / 100, letterSpacing:1,color:'#ffffff',marginTop:deviceHeight * 2.3 / 100,fontWeight:'bold'}}> {this.props.name} </Text>
              </View>           
              <View style={{flex:1,flexDirection:'column',justifyContent:'center',marginTop:deviceHeight * 2.4 / 100}}>
              </View>             
          </View>
        </Header>
      <Image source={require('../images//header-bg.png')} style={{height:'36%',width:'100%'}}></Image>
      </View>
      );
    } 
    else if(this.props.name === 'Change Password') {
      return (
              <View style={{height:deviceHeight * this.setHeadersize() / 100,backgroundColor:'transparent',flexDirection : 'column',zIndex:4}}>
        <Header transparent style={{height:deviceHeight * this.setsize() / 100, paddingLeft:0, paddingRight:0,backgroundColor:'#002941'}}>
          <View style={{flexDirection : 'row' , width: '100%',flex:1,justifyContent:'space-between'}}>
              <View style={{justifyContent:'center',flex:1}}>
                <TouchableOpacity onPress={()=>this.OnBackClickCp()} style={{width:deviceWidth * 16 / 100}}>
                 <Image source={require('../images//back.png')} style={styles.backicon}  />
                </TouchableOpacity>
              </View>
              <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',flex:3}}>
                <Text style={{fontSize:deviceHeight * 2.6 / 100, letterSpacing:1,color:'#ffffff',marginTop:deviceHeight * 2.3 / 100,fontWeight:'bold'}}> {this.props.name} </Text>
              </View>           
              <View style={{flex:1,flexDirection:'column',justifyContent:'center',marginTop:deviceHeight * 2.4 / 100}}>
              </View>             
          </View>
        </Header>
      <Image source={require('../images//header-bg.png')} style={{height:'36%',width:'100%'}}></Image>
      </View>
      );
    } 
    else if(this.props.name === 'More' || this.props.name === 'My Account') {
      return (
              <View style={{height:deviceHeight * this.setHeadersize() / 100,backgroundColor:'transparent',flexDirection : 'column',zIndex:4}}>
              <Header transparent style={{height:deviceHeight * this.setsize() / 100, paddingLeft:0, paddingRight:0,backgroundColor:'#002941'}}>
              <View style={{flexDirection : 'row' , width: '100%',flex:1,justifyContent:'space-between'}}>
                  <View style={{justifyContent:'center',flex:1}}>
                    
                  </View>
                  <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',flex:3}}>
                    <Text style={{fontSize:deviceHeight * 2.6 / 100, letterSpacing:1,color:'#ffffff',marginTop:deviceHeight * 2.3 / 100,fontWeight:'bold'}}> {this.props.name} </Text>
                  </View>
                 
                  <View style={{flex:1,flexDirection:'column',justifyContent:'center',marginTop:deviceHeight * 2.4 / 100}}>
                     
                  </View>             
              </View>
            
      
                      </Header>
                      <Image source={require('../images//header-bg.png')} style={{height:'36%',width:'100%'}}></Image>
                      </View>
      );
    }
    
    else {
      return (
        <View style={{height:deviceHeight * this.setHeadersize() / 100,backgroundColor:'transparent',flexDirection : 'column',zIndex:4}}>
        <Header transparent style={{height:deviceHeight * this.setsize() / 100, paddingLeft:0, paddingRight:0,backgroundColor:'#002941'}}>
           
              <View style={{flexDirection : 'row' , width: '100%',flex:1,justifyContent:'space-between'}}>
                  <View style={{justifyContent:'center',flex:1}}>
                    
                  </View>
                  <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',flex:1}}>
                    <Text style={{fontSize:deviceHeight * 2.6 / 100, letterSpacing:1,color:'#ffffff',marginTop:deviceHeight * 2.3 / 100,fontWeight:'bold'}}> {this.props.name} </Text>
                  </View>
                 
                  <View style={{flex:1,flexDirection:'column',justifyContent:'center',marginTop:deviceHeight * 2.4 / 100}}>
                      <TouchableOpacity style={styles.btnAllEvent} onPress={()=>this.CheckInAllClick()}>
                        <Text style={{fontSize:deviceHeight * 1.6 / 100,fontWeight:'bold',color:'#000',textAlign:'center'}}>Check In All</Text>
                      </TouchableOpacity>
                  </View>
              </View>
            
        </Header>
        <Image source={require('../images//header-bg.png')} style={{height:'36%',width:'100%'}}></Image>
        </View>
        
      );
    }
    
  }

  OnBackClick() {
    this.props.navigation.goBack(null)
  }

  OnBackClickCp() {
    this.props.navigation.navigate('More');
  }

  CheckInAllClick() {
    this.props.navigation.navigate('ScanBarcodeAll');
  }
}


var styles = StyleSheet.create({
    bgImage:{
        // flex: 1,
        height:'100%',
        width:'100%',
        // resizeMode: 'contain',
      },
      btnAllEvent: {
        backgroundColor:'#fff',
        alignSelf:'flex-end',
        borderRadius:deviceWidth * 1.4 / 100,
        paddingLeft:deviceHeight * 1.0 / 100,
        paddingRight:deviceHeight * 1.0 / 100,
        paddingTop:deviceHeight * .5 / 100,
        paddingBottom:deviceHeight * .5 / 100,
        marginRight:deviceHeight * 3.4 / 100,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2, 
        elevation:6,
        shadowOffset: {
            height: 1,
            width: 1
        }
      },
      backicon: {
        marginLeft:deviceHeight * 1.4 / 100,
        marginTop:deviceHeight * 1.5 / 100,
        height:deviceHeight * 4 / 100,
        width:deviceHeight * 4 / 100,
      },
      bgImage:{
        // flex: 1,
        height:90,
        width:'100%',
        // resizeMode: 'contain',
      }
  });
