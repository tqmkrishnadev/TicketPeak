// login screen 
import React, { Component } from 'react';
import { StyleSheet, Image, View, Text,TextInput,Dimensions,TouchableOpacity,Alert, Linking} from 'react-native';
import CONSTANTS from '../../config/Constants';
import ApiConstants from '../../config/ApiConstants';
import Spinner from 'react-native-loading-spinner-overlay';
import FooterMenu from '../../config/FooterMenu';
import HeaderApp from '../../config/HeaderApp';
import AsyncStorage from '@react-native-community/async-storage';
import { Container,Content,Card,CardItem} from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import {Toast } from 'native-base';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var evenDateId,clientId;
var Sound = require('react-native-sound');
var token = '';

export default class ScanBarcode extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        isConnected:'yes',isLoading: false,isScan:false,invalidReason:'',ticketNumber:'',startDateTime:'',eventName:''
      }

      setTimeout(() => {
      //  this.setState({ isScan: true });
       }, 2000);
    }

    componentDidMount() { 
      Sound.setCategory('Playback'); 
      this.willBlurListener = this.props.navigation.addListener('willFocus', () => {
       this.setState({ isScan: false, 
       startDateTime: this.props.navigation.getParam('startDateTime', '0'),eventName:this.props.navigation.getParam('eventName', '0')});
       evenDateId = this.props.navigation.getParam('evenDateId', '0');
       clientId = this.props.navigation.getParam('clientId', '0');

      //  Toast.show({
      //   text:evenDateId+"Success"+clientId,
      //   buttonText: "Okay",
      //   duration: 4000
      //  });
      // setTimeout(() => {
       // this.scanner.reactivate()
     //    }, 4000);

      this.getToken();
      });
    }

    getToken = async() => {
      token = await AsyncStorage.getItem('token');
    }

    onSuccess = e => {
      // Linking.openURL(e.data).catch(err =>
      //   console.error('An error occured', err)
      // );
      // Toast.show({
      //   text: e.data,
      //   buttonText: "Okay",
      //   duration: 3000
      // });

      this.ScanEvents(e.data);
    };

    ScanNext() {
      this.setState({ isScan: false});
    }
    
    render() {
    const { navigation } = this.props;
        return (
            <Container style={{backgroundColor:"#f0f0f0"}}>
                <HeaderApp navigation={navigation} name='Scan'/>

                    <View style={{flex:1,flexDirection:'column'}}>
                      <View style={{ backgroundColor:'#fff',alignItems:'center',flex:1.8,paddingTop:deviceHeight * 3.2 / 100,paddingBottom:deviceHeight * 3 / 100}}>
                        <Text style={{fontSize:deviceHeight * 2.5 / 100,fontWeight:'bold',color:'#000'}}>{this.state.eventName}</Text>
                        <Text style={{fontSize:deviceHeight * 1.8 / 100,color:'#898d8c',marginTop:deviceHeight * 1 / 100}}>{this.state.startDateTime}</Text>

                        {this.state.isScan ?null:<Text style={{fontSize:deviceHeight * 2 / 100,color:'#898d8c',marginTop:'auto'}}>Scan Code</Text>}
                      </View>
                      <View style={{ backgroundColor:'#fff',flex:8.2,paddingTop:deviceHeight * 1 / 100,paddingBottom:deviceHeight * 1 / 100}}>
                        {this.state.isScan ? 
                        <View style={{alignItems:'center'}}>
                             <View style={styles.centercard}>
                                <Text style={{fontSize:deviceHeight * 1.8 / 100,color:'#898d8c',textAlign: 'center',alignSelf:'center'}}>{this.state.ticketNumber}</Text>
                                <Image source={require('../../images//cross-icon.png')} style={styles.validicon}  />
                                <Text style={{fontSize:deviceHeight * 2.5 / 100,fontWeight:'bold',color:'#000',marginTop:deviceHeight * 3 / 100,alignSelf:'center'}}>Invalid Ticket</Text>
                                <Text style={{fontSize:deviceHeight * 1.8 / 100,color:'#898d8c',marginTop:deviceHeight * 2 / 100,alignSelf:'center',textAlign: 'center'}}>{this.state.invalidReason}</Text>
                             </View>
                             <TouchableOpacity onPress={()=>this.ScanNext()} style={styles.btnNext}>
                                <Text style={{fontSize:deviceHeight * 2 / 100,color:'#fff'}}>Scan Next</Text>
                             </TouchableOpacity>
                        </View>:
                        <View style={{flex:1,flexDirection:'column',marginTop:30}}>
                           {/* <Text style={{fontSize:deviceHeight * 2 / 100,color:'#898d8c',alignSelf:'center'}}>Scan Bar Code</Text> */}
                           {/* <View style={{flex:1,backgroundColor:'#fff',marginTop:deviceHeight * 2 / 100}}> */}

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


    ScanEvents = (value)=> {
      // this.setState({EventdataSource:eventdata.data,DateSource:eventdata.data,isLoading: false});
      this.setState({ isLoading: true })
      // Toast.show({
      //   text:value,
      //   buttonText: "Okay",
      //   duration: 4000
      // });
      fetch(ApiConstants.BASE_URL+ApiConstants.CHECK,{
         method: ApiConstants.METHOD_POST,
         headers:{
           'Accept': ApiConstants.CONTENT_TYPE,
           'Content-Type': ApiConstants.CONTENT_TYPE,
           'Authorization': token
         }, body: JSON.stringify({
          'client_id':clientId,
          'event_date_id':evenDateId,
          'ticket_id': value
         })})
         .then((response) => response.json())
         .then((responseJson) => {
           console.log('Response SCAN '+JSON.stringify(responseJson));
           this.setState({ isLoading: false })
           if(responseJson.status === true) {
           // this.ScanEvents(4);
            setTimeout(() => {
            this.scanner.reactivate()
            }, 2000);
           // this.scanner.reactivate()


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
              text: responseJson.message,
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
            // this.setState({isScan:true,invalidReason:responseJson.message,ticketNumber:"Ticket No: "+responseJson.ticket_no});
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
              this.setState({isScan:true,invalidReason:responseJson.message,ticketNumber:"Ticket No: "+responseJson.ticket_no});
            }
           }
           //this.props.navigation.navigate('App');
           }).catch((error) =>{
            setTimeout(() => {
              this.scanner.reactivate()
              }, 2000);
             this.setState({ isLoading: false });
             return;
        });
    }
}

  var styles = StyleSheet.create({
    buttonTouchable: {
      padding: 16
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
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
        maxWidth:'70%',
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
      validicon : {
        width:deviceHeight * 5.4 / 100,
        height: deviceHeight * 5.4 / 100,
        marginTop:deviceHeight * 3 / 100,
        alignSelf:'center',
      },
      spinnerTextStyle: {
        color: '#FFF',
        justifyContent: 'center',  
      }
  });
