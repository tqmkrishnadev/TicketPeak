// login screen 
import React, { Component } from 'react';
import { StyleSheet, Image, View, Text,Platform,Dimensions,TouchableOpacity,Alert, FlatList} from 'react-native';
import CONSTANTS from '../../config/Constants';
import ApiConstants from '../../config/ApiConstants';
import Spinner from 'react-native-loading-spinner-overlay';
import FooterMenu from '../../config/FooterMenu';
import HeaderApp from '../../config/HeaderApp';
import { Button } from 'react-native-elements'
import {Toast } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { Container,Content,Card,CardItem} from 'native-base';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import eventdata from './eventlist.json';
import { SafeAreaView } from 'react-native-safe-area-context';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

export default class Home extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        email: '',moreClickIndex:0,moreClickEventdateId:0,
        password: '',visiblePopUp:false,clientId:'',isFetching: false,
        isConnected:'yes',isLoading: false,EventdataSource: [],DateSource:[]
      }
    }
    
    componentWillMount() {
        setTimeout(() => {
            this.image = (<Image source={require('../../images//header-bg.png')} resizeMode={"cover"} style={{height:'4.8%',width:'100%'}}/>);
        }, 1000);
       
    }

    componentDidMount() {
      this.willBlurListener = this.props.navigation.addListener('willFocus', () => {
        this.getAccessToken('yes');
      });
     
      
    }

    componentWillUnmount() {
      
    //  this.unsubscribe();
    }

    getAccessToken = async(internetcheck) => {
      this.setState({isLoading:true},() => {
        if(internetcheck == 'yes') {
         this.getClientId();
        } else {
          this.setState({ isLoading: false });
          Toast.show({text: CONSTANTS.NO_INTERNET,buttonText: "Okay",duration: 3000});
        }
      });
    }

    getClientId = async() => {
      const value = await AsyncStorage.getItem('client_id');
      const token = await AsyncStorage.getItem('token');
      if (value !== null) {
        this.GetAllEvents(value,token);
      } else {
        Toast.show({text: 'Clinet Id is not available',buttonText: "Okay",duration: 3000});
      }
    }

    GetAllEvents = (value,token)=> {
     // this.setState({EventdataSource:eventdata.data,DateSource:eventdata.data,isLoading: false});
     //Toast.show({text: token,buttonText: "Okay",duration: 3000});
     this.setState({ isLoading: true })
     fetch(ApiConstants.BASE_URL+ApiConstants.CLIENTS+value+"/"+ApiConstants.EVENTS,{
        method: ApiConstants.METHOD_GET,
        headers:{
          'Accept': ApiConstants.CONTENT_TYPE,
          'Content-Type': ApiConstants.CONTENT_TYPE,
          'Authorization': token
        },
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('Response LOGIN '+JSON.stringify(responseJson));
          this.setState({isLoading: false,clientId:value,isFetching: false})
          if(responseJson.status === true) {
            this.setState({EventdataSource:responseJson.event,DateSource:responseJson.event.more,isLoading: false});
          //  this.setState({EventdataSource:responseJson.event,DateSource:eventdata.data,isLoading: false});
            //AsyncStorage.setItem('username',this.state.email);
            //console.log('massege',AlldataSource);
          } else {
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

    onRefresh() {
      this.setState({isFetching: true,},() => {
        this.getClientId();
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

  setTopSafeArea() {
    return Platform.OS === 'ios'? 'top':'';
  }

  setTopSafeAreaMargin() {
    return Platform.OS === 'ios'? -30:0;
  }
    
    setHeadersize() {
      return Platform.OS === 'ios'? 14:14;
    }

    setsize() {
      return Platform.OS === 'ios'? 5.5:10.8;
    }

    
    render() {
      const { navigation } = this.props;
          return (
                  <SafeAreaView style={{flex: 1,backgroundColor:'#002941'}} edges={[this.setTopSafeArea(),'left', 'right']}>
              <Container style={{backgroundColor:"#fff"}}>
                  <HeaderApp navigation={navigation} name='Home'/>
                  {/* <Image source={require('../../images//header-bg.png')} style={{height:'4.8%',width:'100%'}}></Image> */}
                  
                  <View style={styles.mainContent}>
                    <FlatList
                      style={{backgroundColor:'transparent',marginTop:8}}
                      data={this.state.EventdataSource}
                      renderItem={this.renderRow}
                      // onRefresh={() => this.onRefresh()}
                      // refreshing={this.state.isFetching}
                      keyExtractor={(item, index) => index.toString()}
                    />

                    <Spinner
                      visible={this.state.isLoading}
                      textContent={'Loading...'}
                      textStyle={styles.spinnerTextStyle}
                    /> 
                    <Dialog
                    dialogStyle={{backgroundColor:'transparent'}}
                    width={.72}
                    height={.50}
                    visible={this.state.visiblePopUp}>
                    <DialogContent style={styles.centercard}>
                    <Image source={require('../../images//calender-icon.png')} style={styles.calendaricon}  />
                        <View style={{flex:8,justifyContent:'center',alignContent:'center',flexDirection:'column'}}>
                          <Text style={{color:'#000000',textAlign:'center',fontSize:deviceHeight * 2.6 / 100,fontWeight:'bold',marginTop:-deviceHeight * 2.1 / 100}}>
                              Event Date
                          </Text>
                          <FlatList
                            style={{backgroundColor:'transparent',marginTop:6}}
                            data={this.state.DateSource}
                            renderItem={this.renderRowDate}
                            keyExtractor={(item, index) => index.toString()}
                          />
                        </View>
                       
                        <View style={{flex:2,flexDirection:'row',marginBottom:-deviceHeight * 2.2 / 100,justifyContent:'center'}}>
                          <TouchableOpacity style={{width:'30%',paddingTop:deviceHeight * .8 / 100,paddingBottom:deviceHeight * .8 / 100,backgroundColor:'#C0C0C0',justifyContent:'center',borderRadius:10,alignSelf:'center'}} onPress={()=>this.ClickClose()}>
                            <Text style={{color:'#ffffff',alignSelf:'center',fontSize:deviceHeight * 2 / 100}}>
                                Close
                            </Text>
                          </TouchableOpacity>
                        </View>
                    </DialogContent>
                  </Dialog>
                  </View>
                  <FooterMenu navigation={navigation} name='Home'/>
              </Container>
              </SafeAreaView>
          );
    }

    renderRowDate = ({item,index}) => {
      return (
        <View style={{flex:1,backgroundColor:'transparent'}}>   
          <TouchableOpacity onPress={()=>this.moreRowClick(item,index)}>             
            <Card style={{flex:1,backgroundColor:'transparent',borderRadius:2}}>
                <CardItem style={{backgroundColor:this.setMoreItemBackground({item})}}>
                  <View style={{flex:1,backgroundColor: 'transparent'}}>
                    <Text style={{fontSize:deviceHeight * 1.7 / 100,color:'#898d8c'}}>{item.event_date_time}</Text>
                  </View>
                </CardItem>
            </Card>
          </TouchableOpacity>   
        </View>
      )
    }

    setMoreItemBackground({item}) {
      return item.event_dates_id === this.state.moreClickEventdateId ? '#eceeef':'#FFFFFF';
     }

    moreRowClick(item,index) {
      const {EventdataSource,moreClickIndex} = this.state;
      const eventItem = EventdataSource[moreClickIndex];
     // eventItem.selected_start_date = item.start_date;
      eventItem.selected_event_dates_id = item.event_dates_id;
      eventItem.selected_event_date_time = item.event_date_time;
      eventItem.selected_number_seats = item.number_seats;
      eventItem.selected_taken_seats = item.taken_seats;
      this.setState({EventdataSource,visiblePopUp:false});
    }

    ClickClose() {
      this.setState({DateSource:[],visiblePopUp:false});
    }

    renderRow = ({item,index}) => {
      return (
          <View style={{flex:1,backgroundColor:'transparent'}}> 
           {/* <Card style={{flex:1,backgroundColor:'transparent',borderRadius:2}}>
              <CardItem style={{backgroundColor:'#f5fafe'}}> */}
                <View style={styles.Cardcard}>
                    <View style={{flex:1,backgroundColor:'transparent',flexDirection:'column'}}>
                      <Text style={{fontSize:deviceHeight * 1.9 / 100,fontWeight:'bold',color:'#000'}}>{item.event_name}</Text>

                      <View style={{flexDirection:'row',marginTop:2,flex:1}}>
                      <Text style={{width:deviceWidth * 26 / 100,fontSize:deviceHeight * 1.6 / 100,color:'#898d8c'}}>{item.selected_event_date_time}</Text>
                       {/* <Text style={{fontSize:deviceHeight * 1.6 / 100,color:'#898d8c'}}>{item.selected_start_date+ ", "+item.selected_start_date_time}</Text> */}
                           {item.more.length > 1 ? <TouchableOpacity onPress={()=>this.moreClick(item.more,item.event_name,index,item.selected_event_dates_id,item.selected_event_date_time)}>
                        <Text style={{fontSize:deviceHeight * 1.6 / 100,color:'#002941', textDecorationLine: 'underline'}}>more...</Text>
                       </TouchableOpacity>  : null}
                      </View>
                    </View>               
                    <View style={{flex:1,backgroundColor:'transparent',flexDirection:'column',justifyContent:'center'}}>
                      <Text style={{fontSize:deviceHeight * 1.4 / 100,color:'#898d8c', alignSelf:'flex-end'}}>{"Redeemed:"+ item.selected_number_seats+"/"+item.selected_taken_seats}</Text>
                      <TouchableOpacity style={styles.btnCheckin} onPress={()=>this.CheckInClick(item)}>
                        <Text style={{fontSize:deviceHeight * 1.6 / 100,fontWeight:'bold',color:'#fff'}}>Check In</Text>
                      </TouchableOpacity>
                    </View>
                </View>
              {/* </CardItem>
            </Card> */}
          </View>
      )
    } 

    // SignUp password screen call
    CheckInClick(item) {
     // this.props.navigation.navigate('ScanBarcode');
      this.props.navigation.navigate('ScanBarcode',{
        evenDateId : item.selected_event_dates_id,
        clientId : this.state.clientId,
       // startDate : item.selected_start_date,
        startDateTime : item.selected_event_date_time,
        eventName : item.event_name
      });
    }

    moreClick(moreArray,eventname,index,eventid,startdateTime) {
      this.setState({DateSource:moreArray,visiblePopUp:true,moreClickIndex:index,moreClickEventdateId:eventid});
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
      backgroundColor:'#fff',
      marginTop:0,
      paddingLeft:deviceWidth * 3 / 100,
      paddingRight:deviceWidth * 3 / 100,
      flex:1,
     
    },
    btnCheckin: {
      backgroundColor:'#ff4100',
      alignSelf:'flex-end',
      marginTop:4,
      borderRadius:deviceWidth * 1 / 100,
      paddingLeft:deviceHeight * 1.4 / 100,
      paddingRight:deviceHeight * 1.4 / 100,
      paddingTop:deviceHeight * .4 / 100,
      paddingBottom:deviceHeight * .4 / 100,
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 2, 
      elevation:6,
      shadowOffset: {
          height: 1,
          width: 1
      }
    },
    centercard: {
      flex:1,
      flexDirection:'column',
      backgroundColor:'white',
      borderRadius:deviceWidth * 3.4 / 100,
      padding:deviceHeight * 7 / 100,
      marginTop:deviceHeight * 4.4 / 100,
      shadowColor: "#000000",
    },
    Cardcard: {
      flex:1,
      flexDirection:'row',
      backgroundColor:'#f6faff',
      borderRadius:deviceWidth * 1.4 / 100,
      borderColor:'#e6eef9',
      borderWidth:1,
      padding:deviceHeight * 1.6 / 100,
      marginTop:deviceHeight * 1.4 / 100
    },
    calendaricon : {
      width:deviceHeight * 7.4 / 100,
      height: deviceHeight * 7.4 / 100,
      alignSelf:'center',
      position:'absolute',
      marginTop: -deviceHeight * 4.0 / 100
    },
    spinnerTextStyle: {
      color: '#FFF',
      justifyContent: 'center',  
    }
  });
