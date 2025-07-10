// login screen 
import React, { Component } from 'react';
import { StyleSheet, Image, View, Text,Platform,Dimensions,TouchableOpacity,Alert,ImageBackground} from 'react-native';
import CONSTANTS from '../../config/Constants';
import ApiConstants from '../../config/ApiConstants';
import Spinner from 'react-native-loading-spinner-overlay';
import FooterMenu from '../../config/FooterMenu';
import HeaderApp from '../../config/HeaderApp';
import {Toast } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { Container,Content,Card,CardItem,Header} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

export default class MyAccount extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        isConnected:'yes',isLoading: false,firstname:'',lastname:'',email:''
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
      if (user_id !== null) {
        //Toast.show({text: value,buttonText: "Okay",duration: 3000});
        this.GetAccountDetail(user_id,token);
      } else {
        Toast.show({text: 'User Id is not available',buttonText: "Okay",duration: 3000});
      }
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
            <SafeAreaView style={{ flex: 1, backgroundColor: '#002941'}} edges={[this.setTopSafeArea(),'left', 'right']}>
        <Container style={{backgroundColor:"#fff"}}>
             <HeaderApp navigation={navigation} name='My Account'/>
            {/* <Image source={require('../../images//header-bg.png')} style={{height:'4.8%',width:'100%'}}></Image> */}

            <Content padder style={styles.mainContent}>
                <View style={{flex:1,flexDirection:'column',marginTop:deviceHeight * .14 / 100,padding:deviceHeight * 2.0 / 100}}>
                  <Text style={{fontSize:deviceHeight * 2.2 / 100,color:'#000',fontWeight:'bold',flex:1}}>First Name:  </Text>
                  <Text style={{fontSize:deviceHeight * 2.2 / 100,color:'#898d8c',flex:1,marginTop:deviceHeight * .8 / 100}}>{this.state.firstname}</Text>            
                </View>
                <View style={{flex:1,flexDirection:'column',padding:deviceHeight * 2.0 / 100}}>
                  <Text style={{fontSize:deviceHeight * 2.2 / 100,color:'#000',fontWeight:'bold',flex:3.5}}>Last Name:  </Text>    
                  <Text style={{fontSize:deviceHeight * 2.2 / 100,color:'#898d8c',flex:6.5,marginTop:deviceHeight * .8 / 100}}>{this.state.lastname}</Text>            
                </View>
                <View style={{flex:1,flexDirection:'column',padding:deviceHeight * 2.0 / 100}}>
                  <Text style={{fontSize:deviceHeight * 2.2 / 100,color:'#000',fontWeight:'bold',flex:1}}>Email Address:  </Text>    
                  <Text style={{fontSize:deviceHeight * 2.2 / 100,color:'#898d8c',flex:1,marginTop:deviceHeight * .8 / 100}}>{this.state.email}</Text>            
                </View>
                
                {/* <View style={{flexDirection:'row',padding:deviceHeight * 2.0 / 100}}>
                  <Text style={{fontSize:deviceHeight * 2.2 / 100,color:'#000',fontWeight:'bold'}}>Organization Type  :  </Text>    
                  <Text style={{fontSize:deviceHeight * 2.2 / 100,color:'#898d8c'}}>For-Profit</Text>            
                </View> */}

                  <Spinner
                    visible={this.state.isLoading}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                  /> 
            </Content>
            <FooterMenu navigation={navigation} name='My Account'/>
        </Container>
        </SafeAreaView>
    );
  }

  GetAccountDetail = (userid,token)=> {
   // Toast.show({text: token,buttonText: "Okay",duration: 3000});
    this.setState({ isLoading: true })
    fetch(ApiConstants.BASE_URL+ApiConstants.USERPROFILE+"/"+userid,{
       method: ApiConstants.METHOD_GET,
       headers:{
         'Accept': ApiConstants.CONTENT_TYPE,
         'Content-Type': ApiConstants.CONTENT_TYPE,
         'Authorization': token
       },
       })
       .then((response) => response.json())
       .then((responseJson) => {
         console.log('Response GETAcoount '+JSON.stringify(responseJson));
         if(responseJson.status === true) {
           this.setState({firstname:responseJson.user.first_name,lastname:responseJson.user.last_name,email:responseJson.user.email,isLoading: false});
           //Toast.show({text: responseJson.message,buttonText: "Okay",duration: 3000});
         } else {
          this.setState({isLoading: false})
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
         }).catch((error) => {
           this.setState({ isLoading: false });
           return;
      });
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
        justifyContent:'center'
    },
    mainContent : {
      width:'100%',
      backgroundColor:'#fff',
      marginTop:0,
      flex:1,
    },
    spinnerTextStyle: {
      color: '#FFF',
      justifyContent: 'center',  
    },
      bgImage:{
          // flex: 1,
          height:90,
          width:'100%',
          // resizeMode: 'contain',
        },
  });
