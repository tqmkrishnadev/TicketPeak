// login screen 
import React, { Component } from 'react';
import { StyleSheet, Image, View, Text,TextInput,Dimensions,TouchableOpacity,Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '../../config/Constants';
import ApiConstants from '../../config/ApiConstants';
import Spinner from 'react-native-loading-spinner-overlay';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import FooterMenu from '../../config/FooterMenu';
import HeaderApp from '../../config/HeaderApp';
import {Toast } from 'native-base';
import { Container,Content,Card,CardItem} from 'native-base';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
import { SafeAreaView } from 'react-native-safe-area-context';

export default class ChangePassword extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        isConnected:'yes',isLoading: false,oldSavedPwd:'',currentpassword:'',password:'',cnfpassword:'',token:'',user_id:''
      }
    }

    componentDidMount() {
      this.willBlurListener = this.props.navigation.addListener('willFocus', () => {
         this.getToken();
      });
    }

    getToken = async() => {
      const token = await AsyncStorage.getItem('token');
      const user_id = await AsyncStorage.getItem('user_id');
      const pwd = await AsyncStorage.getItem('Password');
      this.setState({token:token,oldSavedPwd:pwd,user_id:user_id});
    }

    setTopSafeArea() {
      return Platform.OS === 'ios'? 'top':'';
    }  

    setTopSafeAreaMargin() {
      return Platform.OS === 'ios'? -30:0;
    }
    
    render() {
    const { navigation } = this.props;
        return (
                <SafeAreaView style={{ flex: 1,backgroundColor:'#002941'}} edges={[this.setTopSafeArea(),'left', 'right']}>
            <Container style={{backgroundColor:"#fff"}}>
                <HeaderApp navigation={navigation} name='Change Password'/>
              
                <Content padder style={styles.mainContent}>
                <View style={styles.centercard}>

                  <View style = {styles.footer}>
                    <Text style={styles.inputHeadingTextTop}>{CONSTANTS.CURRENT_PASSWORD}</Text>
                    <TextInput
                      style={styles.inputbg}
                      // defaultValue = 'shail1@gmail.com'
                      value={this.state.currentpassword}
                      placeholder = {CONSTANTS.CURRENT_PASSWORD}
                      placeholderTextColor="#8e8e92"
                      secureTextEntry = {true}
                      returnKeyType = { "next" }
                      onSubmitEditing={() => {this.newpwdInput.focus();}}
                      onChangeText={text => this.setState({currentpassword: text})}/>
                  </View>
                  
                  <Spinner
                      visible={this.state.isLoading}
                      textContent={'Loading...'}
                      textStyle={styles.spinnerTextStyle}
                  /> 

                  <Text style={styles.inputHeadingText}>{CONSTANTS.NEW_PASSWORD}</Text>
                  <TextInput
                    ref={(input) => { this.newpwdInput = input; }}     
                    style={styles.inputbg}
                    value={this.state.password}
                    placeholder = {CONSTANTS.NEW_PASSWORD}
                    //defaultValue = 'DGyfa1234'
                    placeholderTextColor="#8e8e92"
                    secureTextEntry = {true}
                    returnKeyType = { "next" }
                    onSubmitEditing={() => { this.cnfpwdInput.focus(); }}
                    onChangeText={text => this.setState({password: text})}
                  />

                  <Text style={styles.inputHeadingText}>{CONSTANTS.CONFIRM_PASSWORD}</Text>
                  <TextInput
                    ref={(input) => { this.cnfpwdInput = input; }}
                    style={styles.inputbg}
                    value={this.state.cnfpassword}
                    placeholder = {CONSTANTS.CONFIRM_PASSWORD}
                    //defaultValue = 'DGyfa1234'
                    placeholderTextColor="#8e8e92"
                    secureTextEntry = {true}
                    returnKeyType = { "done" }
                    onChangeText={text => this.setState({cnfpassword: text})}
                  />
                  <TouchableOpacity onPress={()=>this.SubmitClick()} style={styles.btnSubmit} >
                        <Text style={{fontSize:deviceHeight * 2 / 100,color:'#fff'}}>Submit</Text>
                      </TouchableOpacity>
                </View>   
                </Content>
                <FooterMenu navigation={navigation} name='Change Password'/>
            </Container>
            </SafeAreaView>
        );
    }

    SubmitClick() {
      const {currentpassword,password,cnfpassword,oldSavedPwd} = this.state;
      if(currentpassword.length === 0) {
        Toast.show({text: CONSTANTS.PLSENTERCURRENT_PWD,buttonText: "Okay",duration: 5000});
      } else if(currentpassword !== oldSavedPwd) {
        Toast.show({text: CONSTANTS.CURRNOTMATCH_PWD,buttonText: "Okay",duration: 5000});
      } else if(password.length === 0){
        Toast.show({text: CONSTANTS.PLSENTER_PWD,buttonText: "Okay",duration: 5000});
        //this.setState({pwdError:ApiConstants.PLSENTER_PWD});
      } else if(password.length < 8) {
        Toast.show({text: CONSTANTS.MIN3DIGIT_PWD,buttonText: "Okay",duration: 5000});
      } else if(cnfpassword.length === 0) {
        Toast.show({text: CONSTANTS.PLSREENTER_PWD,buttonText: "Okay",duration: 5000});
      } else if(cnfpassword !== password) {
        Toast.show({text: CONSTANTS.PWD_NOTMATCH,buttonText: "Okay",duration: 5000});
      } else {
        this.ChangePwdTask();
      }
    }

    ChangePwdTask = ()=> {
      const {token,oldSavedPwd,password,cnfpassword,user_id} = this.state;
      this.setState({ isLoading: true })
      fetch(ApiConstants.BASE_URL+ApiConstants.CHANGE+"/"+ApiConstants.PASSWORD,{
         method: ApiConstants.METHOD_POST,
         headers:{
           'Accept': ApiConstants.CONTENT_TYPE,
           'Content-Type': ApiConstants.CONTENT_TYPE,
           'Authorization': token
         }, body: JSON.stringify({
          'old_password':oldSavedPwd,
          'new_password':password,
          'confirm_password':cnfpassword,
          'user_id': user_id
         })})
         .then((response) => response.json())
         .then((responseJson) => {
           console.log('Response changepwd '+JSON.stringify(responseJson));
          
           if(responseJson.status === true) {
            this.setState({ isLoading: false,currentpassword:'',password:'',cnfpassword:''})
              Toast.show({
                text: responseJson.message,
                buttonText: "Okay",
                duration: 3000
              });
              this.StoreData(password);
              setTimeout(() => {
                this.props.navigation.goBack(null)
              }, 1500);
             
           } else {
            this.setState({ isLoading: false})
              if(responseJson.code === 401) {
                this.logout();
              } else {
                Toast.show({
                  text: responseJson.message,
                  buttonText: "Okay",
                  duration: 4000
                });
              }
           }
           //this.props.navigation.navigate('App');
           }).catch((error) =>{
             this.setState({ isLoading: false });
             return;
        });
    }

    StoreData = async (password)=> {
      try {
        await AsyncStorage.setItem('Password', password);
      } catch (error) {}
    }

    logout = () => {
      AsyncStorage.clear();
      Toast.show({
        text: 'Successfully Logged out.',
        buttonText: "Okay",
        duration: 3000
      });
      setTimeout(() => {
       this.props.navigation.navigate('Auth');
     }, 1200);
    }

}

  var styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    mainContent : {
        width:'100%',
        flex:1,
        marginTop:0,
        padding:deviceHeight * 2.6 / 100,
        backgroundColor:'#fff'
    },
    containerscroll:{
      flex:1,
      width:'100%',
      backgroundColor:'#fff',
      padding:deviceHeight * 2.6 / 100,
     
  },
    centercard: {
        width:'100%',
        backgroundColor:'#fff',
        borderRadius:deviceWidth * 3 / 100,
        padding:deviceHeight * 3.0 / 100,
        marginTop:deviceHeight * 1 / 100,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
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
        marginTop:deviceHeight * 2.4/100
      },
      inputHeadingTextTop: {
        color:'black',
        fontWeight:'bold',
        fontSize:deviceHeight * 1.8 / 100,
        marginLeft:deviceHeight * 2/100,
        marginTop:deviceHeight * .6/100
      },

      loginicon : {
        width:deviceHeight * 9.4 / 100,
        height: deviceHeight * 9.4 / 100,
      },
      spinnerTextStyle: {
        color: '#FFF',
        justifyContent: 'center',  
      },
      btnSubmit: {
        backgroundColor:'#ff4100',
        alignSelf:'center',
        marginTop:deviceHeight * 4 / 100,
        borderRadius:deviceWidth * 1.7 / 100,
        paddingLeft:deviceHeight * 2.2 / 100,
        paddingRight:deviceHeight * 2.2 / 100,
        paddingTop:deviceHeight * .9 / 100,
        paddingBottom:deviceHeight * .9 / 100,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2, 
        elevation:6,
        shadowOffset: {
            height: 1,
            width: 1
        }
      },
      spinnerTextStyle: {
        color: '#FFF',
        justifyContent: 'center',  
      }
  });
