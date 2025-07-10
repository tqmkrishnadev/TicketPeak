// login screen 
import React, { Component } from 'react';
import { StyleSheet, Image, View, Text,TextInput,Dimensions,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Toast } from 'native-base';
import CONSTANTS from '../../config/Constants';
import ApiConstants from '../../config/ApiConstants';
import Spinner from 'react-native-loading-spinner-overlay';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
export default class Login extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        isConnected:'yes',isLoading: false
      }
    }
    
    render() {
    const { navigation } = this.props;
        return (
            <View style={styles.container}>  
              <Image source={require('../../images//login-page-logo-neww.png')}
              style={styles.toplogo}  />        
                <View style={styles.centercard}>
                  <Text style={{color:'black',fontSize:deviceHeight * 3.6 / 100,fontWeight:'bold',marginTop:deviceHeight * 1 / 100}}>{CONSTANTS.LOGIN}</Text>
                  {/* <Text style={{color:'#ff4100',fontSize:deviceHeight * 2 / 100,marginTop:4}}>{CONSTANTS.PLEASE_SIGNIN}</Text> */}
                  <View style={{backgroundColor:'#f1f2f6',height:1,width:'100%',marginTop:deviceHeight * 1.6/100}}></View>

                  <View style = {styles.footer}>
                    <Text style={styles.inputHeadingText}>{CONSTANTS.USERNAME_OREMAIL}</Text>
                    <TextInput
                      style={styles.inputbg}
                      // defaultValue = 'shail1@gmail.com'
                      placeholder = {CONSTANTS.USERNAME_OREMAIL}
                      placeholderTextColor="#8e8e92"
                      returnKeyType = { "next" }
                      onSubmitEditing={() => {this.newpwdInput.focus();}}
                      onChangeText={text => this.setState({email: text})}/>
                  </View>
                  
                  <Spinner
                      visible={this.state.isLoading}
                      textContent={'Loading...'}
                      textStyle={styles.spinnerTextStyle}
                  /> 

                  <Text style={styles.inputHeadingText}>{CONSTANTS.PASSWORD}</Text>
                  <TextInput
                    ref={(input) => { this.newpwdInput = input; }}     
                    style={styles.inputbg}
                    placeholder = {CONSTANTS.PASSWORD}
                    placeholderTextColor="#8e8e92"
                    //defaultValue = 'DGyfa1234'
                    secureTextEntry = {true}
                    returnKeyType = { "done" }
                    onChangeText={text => this.setState({password: text})}
                  />
                  <TouchableOpacity onPress={()=>this.forgotPwdClick()}>
                   <Text style={styles.forgotText}>{CONSTANTS.FORGOTPWD}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.logoiconImagecenter} onPress={()=>this.OnClickLogin()}>
                   <Image source={require('../../images//login_btn.png')} style={styles.loginicon}  />
                  </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Forgot password screen call
    forgotPwdClick() {
      this.props.navigation.navigate('Forgotpwd');
    }

    OnClickLogin() {
      
      //this.props.navigation.navigate('App');
      let userEmail = this.state.email;
      let userPassword = this.state.password;
      if(userEmail.length <= 0  ||  userPassword.length <= 0) {
        Toast.show({
          text: CONSTANTS.PLEASE_ENTERALL,
          buttonText: "Okay",
          duration: 5000
        });
        return;
      }
      if(!this.validate(userEmail)) {
        Toast.show({
          text: CONSTANTS.ENTER_VALIDEMAIL,
          buttonText: "Okay",
          duration: 5000
        });
        return;
      }
      if(userPassword.length <= 0) {
        Toast.show({
          text: CONSTANTS.ENTER_VALIDPWD,
          buttonText: "Okay",
          duration: 5000
        });
        return;
      }
      else {
        this.setState({ isLoading: true })
       // this.props.navigation.navigate('App');
       fetch(ApiConstants.BASE_URL+ApiConstants.LOGIN,{
          method: ApiConstants.METHOD_POST,
          headers:{
            'Accept': ApiConstants.CONTENT_TYPE,
            'Content-Type': ApiConstants.CONTENT_TYPE,
          },
          body: JSON.stringify({
            'email':this.state.email,
            'password': this.state.password
          }) })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log('Response LOGIN '+JSON.stringify(responseJson));
            this.setState({ isLoading: false })
            if(responseJson.status === true) {
              Toast.show({
                text: responseJson.message,
                buttonText: "Okay",
                duration: 3000
              });
              this.StoreData(responseJson.client_id,responseJson.token,responseJson.user_id);
              //  AsyncStorage.setItem('client_id',String(responseJson.client_id)); 
              //console.log('massege',AlldataSource);
            } else {
              Toast.show({
                text: responseJson.message,
                buttonText: "Okay",
                duration: 5000
              });
            }
              //this.props.navigation.navigate('App');
            }).catch((error) =>{
              this.setState({ isLoading: false });
              return;
          });
       }
    }

    /******StoreData*******/
    StoreData = async (clientid,token,userid)=> {
      const {password} = this.state;
      try {
        await AsyncStorage.setItem('isLogin', 'yes');
        await AsyncStorage.setItem('client_id', String(clientid));
        await AsyncStorage.setItem('user_id', String(userid));
        await AsyncStorage.setItem('token', String(token));
        await AsyncStorage.setItem('Password', password);
        this.props.navigation.navigate('App');
      } catch (error) {}
    }

    validate = (text) => {
      console.log(text);  ` `
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(text) === false) {
        console.log("Email is Not Correct");
        return false;
      }
      else {
        return true
      }
    }
}

  var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#01273c',
        padding:deviceWidth * 6 / 100
    },
    toplogo: {
      width:deviceHeight * 26 / 100,
      height:deviceHeight * 6.5 / 100,
      marginTop:deviceHeight * 7.2 / 100,
      alignSelf:'center',
      resizeMode: "stretch"
    },
    centercard: {
      width:'100%',
      backgroundColor:'white',
      borderRadius:deviceWidth * 5.4 / 100,
      padding:deviceHeight * 3.2 / 100,
      marginTop:deviceHeight * 6.4 / 100,
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 2, 
      elevation:4,
      shadowOffset: {
          height: 1,
          width: 1
      }
    },
    inputbg: {
      borderBottomWidth:0,
      color:'#000000',
      backgroundColor:'#f9f9fb',
      height:deviceHeight * 5.2 / 100,
      paddingLeft:deviceHeight * 2/100,
      marginTop:deviceHeight * 1 / 100,
      borderRadius:10,
      fontSize:deviceHeight * 1.8 / 100,
      shadowColor: "#000000",
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation:1,
      shadowOffset: {
          height: 1,
          width: 1
      }
    },
    inputHeadingText: {
      color:'black',
      fontWeight:'bold',
      fontSize:deviceHeight * 1.8 / 100,
      marginLeft:deviceHeight * 2/100,
      marginTop:deviceHeight * 2.2/100
    },
    forgotText: {
      color:'#ff4100',
      alignSelf:'flex-end',
      marginRight: deviceHeight * 1 / 100,
      fontSize:deviceHeight * 1.6 / 100,
      marginTop:deviceHeight * 1/100,
      marginBottom : deviceHeight * 6 / 100
    },
    logoiconImagecenter : {
      width:deviceWidth * 18 / 100,
      height: deviceHeight * 8.9 / 100,
      alignSelf:'flex-end',
      bottom:deviceHeight * -3.9 / 100,
      position:'absolute'
    },
    loginicon : {
      width:deviceHeight * 9.4 / 100,
      height: deviceHeight * 9.4 / 100,
    },
    spinnerTextStyle: {
      color: '#FFF',
      justifyContent: 'center',  
    }
  });
