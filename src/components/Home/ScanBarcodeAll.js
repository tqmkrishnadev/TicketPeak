// login screen 
import React, { Component } from 'react';
import { StyleSheet, Image, View, Text,TextInput,Dimensions,TouchableOpacity,Alert} from 'react-native';
import CONSTANTS from '../../config/Constants';
import ApiConstants from '../../config/ApiConstants';
import Spinner from 'react-native-loading-spinner-overlay';
import FooterMenu from '../../config/FooterMenu';
import HeaderApp from '../../config/HeaderApp';
import AsyncStorage from '@react-native-community/async-storage';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Container,Content,Card,CardItem} from 'native-base';
import {Toast } from 'native-base';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var Sound = require('react-native-sound');
var token = '';

export default class ScanBarcodeAll extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        isConnected:'yes',isLoading: false,isScan:false
      }

      // setTimeout(() => {
      //   this.setState({ isScan: true });
      //  }, 2000);
    }

    componentDidMount() {  
      Sound.setCategory('Playback'); 
      this.willBlurListener = this.props.navigation.addListener('willFocus', () => { 
        this.getClientId();       
      });
    }

    getClientId = async() => {
      const value = await AsyncStorage.getItem('client_id');
      token = await AsyncStorage.getItem('token');
      this.setState({ isScan: false,clientId:value});
      // Toast.show({
      //   text:"ClientID"+value,
      //   buttonText: "Okay",
      //   duration: 4000
      //  });
      if (value !== null) {
        //Toast.show({text: value,buttonText: "Okay",duration: 3000});
        //this.GetAllEvents(value);
      } else {
        Toast.show({text: 'Clinet Id is not available',buttonText: "Okay",duration: 3000});
      }
    }

    onSuccess = e => {
      this.ScanEvents(e.data);
    };

    ScanNext() {
      this.setState({ isScan: false});
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
    
    render() {
    const { navigation } = this.props;
        return (
            <Container style={{backgroundColor:"#f0f0f0"}}>
                <HeaderApp navigation={navigation} name='Scan'/>
               
                    <View style={{flex:1,flexDirection:'column'}}>
                      <View style={{ backgroundColor:'#fff',alignItems:'center',flex:1.8,paddingTop:deviceHeight * 3.2 / 100,paddingBottom:deviceHeight * 3 / 100}}>
                        <Text style={{fontSize:deviceHeight * 2.5 / 100,fontWeight:'bold',color:'#000'}}>Check In All Events</Text>
                        <Text style={{fontSize:deviceHeight * 1.8 / 100,color:'#898d8c',marginTop:deviceHeight * 1 / 100}}></Text>
                        {this.state.isScan ? null : <Text style={{fontSize:deviceHeight * 2 / 100,color:'#898d8c',marginTop:'auto'}}>Scan Code</Text>}
                      </View>
                      <View style={{ backgroundColor:'#fff',flex:8.2,paddingTop:deviceHeight * 1 / 100,paddingBottom:deviceHeight * 1 / 100}}>
                        {this.state.isScan ? 
                        <View style={{alignItems:'center'}}>
                             <View style={styles.centercard}>
                                <Text style={{fontSize:deviceHeight * 1.8 / 100,color:'#898d8c',textAlign: 'center',alignSelf:'center'}}>{this.state.ticketNumber}</Text>
                                <Image source={require('../../images//cross-icon.png')} style={styles.invalidicon}  />
                                <Text style={{fontSize:deviceHeight * 2.5 / 100,fontWeight:'bold',color:'#000',marginTop:deviceHeight * 3 / 100,alignSelf:'center'}}>Invalid Ticket</Text>
                                <Text style={{fontSize:deviceHeight * 1.8 / 100,color:'#898d8c',marginTop:deviceHeight * 2 / 100,alignSelf:'center',textAlign: 'center'}}>{this.state.invalidReason}</Text>
                             </View>
                             <TouchableOpacity onPress={()=>this.ScanNext()} style={styles.btnNext}>
                                <Text style={{fontSize:deviceHeight * 2 / 100,color:'#fff'}}>Scan Next</Text>
                             </TouchableOpacity>
                        </View>:
                        <View style={{flex:1,flexDirection:'column',marginTop:30}}>
                           {/* <Text style={{fontSize:deviceHeight * 2 / 100,color:'#898d8c',alignSelf:'center'}}>Scan Bar Code</Text>
                           <View style={{flex:9,backgroundColor:'#C0C0C0',marginTop:deviceHeight * 2 / 100}}> */}
                            
                           <QRCodeScanner
                            topContent={
                             null
                            }
                                onRead={this.onSuccess}
                                showMarker={true}
                                ref={(node) => { this.scanner = node }}                            
                            />

                           {/* </View>           */}
                        </View>}
                      </View>
                    </View>              
                    <Spinner
                      visible={this.state.isLoading}
                      textContent={'Loading...'}
                      textStyle={styles.spinnerTextStyle}
                    /> 
                <FooterMenu navigation={navigation} name='Home'/>
            </Container>
        );
    }

    ScanEvents = (value)=> {
      // this.setState({EventdataSource:eventdata.data,DateSource:eventdata.data,isLoading: false});
      this.setState({ isLoading: true })
      // Toast.show({
      //   text:value,
      //   buttonText: "Okay",
      //   duration: 4000
      // });
      fetch(ApiConstants.BASE_URL+ApiConstants.ALLCHECK,{
         method: ApiConstants.METHOD_POST,
         headers:{
           'Accept': ApiConstants.CONTENT_TYPE,
           'Content-Type': ApiConstants.CONTENT_TYPE,
           'Authorization': token
         }, body: JSON.stringify({
          'client_id':this.state.clientId,
          'ticket_id': value
         })})
         .then((response) => response.json())
         .then((responseJson) => {
           console.log('Response SCAN '+JSON.stringify(responseJson));
           this.setState({ isLoading: false })
           if(responseJson.status === true) {
           // this.ScanEvents(4);
            //this.scanner.reactivate()
              setTimeout(() => {
                this.scanner.reactivate()
               }, 2000);

               var whoosh = new Sound('original_beep.mp3', Sound.MAIN_BUNDLE, (error) => {
                  if (error) {
                    console.log('failed to load the sound', error);
                    return;
                  }
                  // loaded successfully
                  console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
                
                  // Play the sound with an onEnd callback
                  whoosh.play((success) => {
                    if (success) {
                      console.log('successfully finished playing');
                    } else {
                      console.log('playback failed due to audio decoding errors');
                    }
                  });
               });
            Toast.show({
              text:responseJson.message,
              buttonText: "",
              duration: 2000
            });
           } else {
            // var whoosh = new Sound('beep_red.mp3', Sound.MAIN_BUNDLE, (error) => {
            //   if (error) {
            //     console.log('failed to load the sound', error);
            //     return;
            //   }
            //   // loaded successfully
            //   console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
            
            //   // Play the sound with an onEnd callback
            //   whoosh.play((success) => {
            //     if (success) {
            //       console.log('successfully finished playing');
            //     } else {
            //       console.log('playback failed due to audio decoding errors');
            //     }
            //   });
            // });
            // this.setState({ isScan: true, invalidReason:responseJson.message,ticketNumber:"Ticket No: "+responseJson.ticket_no});
            //  Toast.show({
            //    text: responseJson.message,
            //    buttonText: "Okay",
            //    duration: 2000
            //  });

            if(responseJson.code === 401) {
              this.logout();
            } else {
              var whoosh = new Sound('wrong_beep.mp3', Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                  console.log('failed to load the sound', error);
                  return;
                }
                // loaded successfully
                console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
              
                // Play the sound with an onEnd callback
                whoosh.play((success) => {
                  if (success) {
                    console.log('successfully finished playing');
                  } else {
                    console.log('playback failed due to audio decoding errors');
                  }
                });
              });
              this.setState({ isScan: true, invalidReason:responseJson.message,ticketNumber:"Ticket No: "+responseJson.ticket_no});
            }
           }
           //this.props.navigation.navigate('App');
           }).catch((error) =>{
             this.setState({ isLoading: false });
             setTimeout(() => {
              this.scanner.reactivate()
              }, 2000);
             return;
        });
    }
}

  var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center'
    },
    mainContent : {
        width:'100%',
        backgroundColor:'#fff'
    },
    centercard: {
        flexDirection:'column',
        backgroundColor:'white',
        maxWidth:'74%',
        borderRadius:deviceWidth * 3 / 100,
        padding:deviceHeight * 6 / 100,
        marginTop:deviceHeight * .8 / 100,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2, 
        elevation:6,
        shadowOffset: {
            height: 1,
            width: 1
        }
      },
      btnNext: {
        backgroundColor:'#ff4100',
        alignSelf:'center',
        marginTop:deviceHeight * 6 / 100,
        borderRadius:deviceWidth * 1.6 / 100,
        paddingLeft:deviceHeight * 2.2 / 100,
        paddingRight:deviceHeight * 2.2 / 100,
        paddingTop:deviceHeight * .8 / 100,
        paddingBottom:deviceHeight * .8 / 100,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2, 
        elevation:6,
        shadowOffset: {
            height: 1,
            width: 1
        }
      },
      invalidicon : {
        width:deviceHeight * 5.4 / 100,
        height: deviceHeight * 5.4 / 100,
        marginTop:deviceHeight * 3 / 100,
        alignSelf:'center',
      }
  });
