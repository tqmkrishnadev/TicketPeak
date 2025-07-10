import React, { Component } from 'react';
import { StyleSheet, Image, View, Text,TextInput,Dimensions,TouchableOpacity,Alert} from 'react-native';
import CONSTANTS from '../../config/Constants';
import ApiConstants from '../../config/ApiConstants';
import {Toast } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

export default class Forgotpwd extends React.Component {
  
    constructor(props) {
      super(props)
      this.state = {
        email: '',
        isConnected:'yes',isLoading: false
      }
    }

    render() {
        const { navigation } = this.props;
            return (
                <View style={styles.container}>
                     <Image source={require('../../images//login-page-logo-neww.png')}
              style={styles.toplogo}  />
                    <TouchableOpacity style={{position:'absolute',paddingTop:deviceHeight * 1.7 / 100,marginTop : 20,paddingLeft:deviceHeight * 2.6 / 100}} onPress={()=>this.props.navigation.goBack(null)}>                     
                        <Image source={require('../../images//back_btn_white.png')} style={{width:deviceHeight * 2 / 100,height:deviceHeight * 2 / 100}}/>
                    </TouchableOpacity>
                    <View style={styles.centercard}>
                      <Text style={{color:'black',fontSize:deviceHeight * 3.5 / 100,fontWeight:'bold',marginTop:deviceHeight * 1 / 100}}>{CONSTANTS.FORGOTPWDNEW}</Text>
                      
                      <View style={{backgroundColor:'#f1f2f6',height:1,width:'100%',marginTop:deviceHeight * 1.6/100}}></View>

                      <View style = {styles.footer}>
                        <Text style={styles.inputHeadingText}>{CONSTANTS.EMAIL}</Text>
                        <TextInput
                          style={styles.inputbg}
                          // defaultValue = 'shail1@gmail.com'
                          placeholder = {CONSTANTS.EMAIL}
                          placeholderTextColor="#8e8e92"
                          onChangeText={text => this.setState({email: text})}/>
                      </View>
                      <Spinner
                          visible={this.state.isLoading}
                          textContent={'Loading...'}
                          textStyle={styles.spinnerTextStyle}
                      />
                    <TouchableOpacity style={styles.logoiconImagecenter} onPress={()=>this.OnClickSubmit()}>
                      <Image source={require('../../images//login_btn.png')} style={styles.loginicon}  />
                    </TouchableOpacity>
                    </View>
                           
                </View>
            );
    }

    OnClickSubmit() {
      let userEmail = this.state.email;
      
      if(userEmail.length <= 0) {
        Toast.show({
          text: CONSTANTS.PLEASE_ENTEREMAIL,
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

      else {
        //this.props.navigation.navigate('Login');
        this.setState({ isLoading: true })
        // this.props.navigation.navigate('App');
        fetch(ApiConstants.BASE_URL+ApiConstants.FRGTPWD,{
          method: ApiConstants.METHOD_POST,
          headers:{
            'Accept': ApiConstants.CONTENT_TYPE,
            'Content-Type': ApiConstants.CONTENT_TYPE,
          },
          body: JSON.stringify({
            'email':this.state.email
          }) })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log('Response LOGIN '+responseJson);
            this.setState({ isLoading: false })
            if(responseJson.status === 'true') {  
              Toast.show({
                text: responseJson.message,
                buttonText: "Okay",
                duration: 3000
              });
              setTimeout(() => {
                this.props.navigation.navigate('Login');
              }, 3000);
            } else {
              Toast.show({
                text: responseJson.message,
                buttonText: "Okay",
                duration: 4000
              });
            }
              //this.props.navigation.navigate('App');
            }).catch((error) =>{
              this.setState({ isLoading: false });
              return;
          });
        }
    }

    validate = (text) => {
      console.log(text);
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
    container:{
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
    logoiconImagecenter : {
      width:deviceWidth * 18 / 100,
      height: deviceHeight * 8.9 / 100,
      alignSelf:'flex-end',
      bottom:deviceHeight * -3.9 / 100,
      position:'absolute'
    },
    spinnerTextStyle: {
      color: '#FFF',
      justifyContent: 'center',  
    },
    centercard: {
      width:'100%',
      backgroundColor:'white',
      borderRadius:deviceWidth * 5.4 / 100,
      padding:deviceHeight * 3.2 / 100,
      marginTop:deviceHeight * 6.6 / 100,
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
      backgroundColor:'#f9f9fb',
      color:'#000000',
      height:deviceHeight * 5.2/100,
      paddingLeft:deviceHeight * 2/100,
      marginTop:deviceHeight * 1 / 100,
      marginBottom:deviceHeight * 6 / 100,
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
    loginicon : {
      width:deviceHeight * 9.4 / 100,
      height: deviceHeight * 9.4 / 100,
    },
  });