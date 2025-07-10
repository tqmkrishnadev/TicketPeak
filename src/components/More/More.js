// login screen
import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Platform,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import CONSTANTS from '../../config/Constants';
import ApiConstants from '../../config/ApiConstants';
import Spinner from 'react-native-loading-spinner-overlay';
import {Toast} from 'native-base';
import FooterMenu from '../../config/FooterMenu';
import HeaderApp from '../../config/HeaderApp';
import {Container, Content, Card, CardItem} from 'native-base';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
export default class More extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: 'yes',
      isLoading: false,
      visiblePopUp: false,
    };
  }

  setTopSafeArea() {
    return Platform.OS === 'ios' ? 'top' : '';
  }

  setTopSafeAreaMargin() {
    return Platform.OS === 'ios' ? -30 : 0;
  }

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#002941'}}
        edges={[this.setTopSafeArea(), 'left', 'right']}>
        <Container style={{backgroundColor: '#fff'}}>
          <HeaderApp navigation={navigation} name="More" />
           {/* <Image source={require('../../images//header-bg.png')} style={{height:'4.8%',width:'100%'}}></Image>  */}

          <Content padder style={styles.mainContent}>
            <View
              style={{
                flex: 1,
                marginTop: 8,
                flexDirection: 'column',
                paddingTop: (deviceHeight * 1.1) / 100,
              }}>
              <TouchableOpacity onPress={() => this.CpClick()}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      marginLeft: (deviceHeight * 1.2) / 100,
                      fontSize: (deviceHeight * 2.2) / 100,
                      fontWeight: 'bold',
                      color: '#000',
                    }}>
                    Change Password
                  </Text>
                  <Image
                    source={require('../../images//next.png')}
                    style={{
                      height: (deviceHeight * 2.4) / 100,
                      width: (deviceHeight * 2.4) / 100,
                      marginRight: (deviceHeight * 1.4) / 100,
                    }}></Image>
                </View>
                <View
                  style={{
                    backgroundColor: '#C0C0C0',
                    marginTop: (deviceHeight * 2.4) / 100,
                    height: 1,
                  }}></View>
              </TouchableOpacity>
            </View>
            {/* Privacy policy view */}
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                paddingTop: (deviceHeight * 2.5) / 100,
              }}>
              <TouchableOpacity onPress={() => this.onClickPP()}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      marginLeft: (deviceHeight * 1.2) / 100,
                      fontSize: (deviceHeight * 2.2) / 100,
                      fontWeight: 'bold',
                      color: '#000',
                    }}>
                    Privacy Policy
                  </Text>
                  <Image
                    source={require('../../images//next.png')}
                    style={{
                      height: (deviceHeight * 2.4) / 100,
                      width: (deviceHeight * 2.4) / 100,
                      marginRight: (deviceHeight * 1.4) / 100,
                    }}></Image>
                </View>
                <View
                  style={{
                    backgroundColor: '#C0C0C0',
                    marginTop: (deviceHeight * 2.5) / 100,
                    height: 1,
                  }}></View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                paddingTop: (deviceHeight * 2.5) / 100,
              }}>
              <TouchableOpacity onPress={() => this.LogoutClick()}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      marginLeft: (deviceHeight * 1.2) / 100,
                      fontSize: (deviceHeight * 2.2) / 100,
                      fontWeight: 'bold',
                      color: '#000',
                    }}>
                    Log Out
                  </Text>
                  <Image
                    source={require('../../images//next.png')}
                    style={{
                      height: (deviceHeight * 2.4) / 100,
                      width: (deviceHeight * 2.4) / 100,
                      marginRight: (deviceHeight * 1.4) / 100,
                    }}></Image>
                </View>
                <View
                  style={{
                    backgroundColor: '#C0C0C0',
                    marginTop: (deviceHeight * 2.5) / 100,
                    height: 1,
                  }}></View>
              </TouchableOpacity>
            </View>
            <Dialog
              dialogStyle={{backgroundColor: '#ffffff'}}
              width={0.72}
              height={0.24}
              visible={this.state.visiblePopUp}>
              <DialogContent
                style={{flex: 1, width: '100%', flexDirection: 'column'}}>
                <View
                  style={{
                    flex: 6,
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      textAlign: 'center',
                      fontSize: (deviceHeight * 2.2) / 100,
                      fontWeight: 'bold',
                    }}>
                    Are you sure want to Log Out?
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#C0C0C0',
                    width: '100%',
                    height: 1,
                  }}></View>
                <View
                  style={{
                    flex: 4,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: (-deviceHeight * 2.2) / 100,
                    marginTop: 5,
                  }}>
                  <TouchableOpacity
                    style={{
                      width: '30%',
                      paddingTop: 10,
                      paddingBottom: 10,
                      backgroundColor: '#C0C0C0',
                      justifyContent: 'center',
                      borderRadius: 6,
                      alignSelf: 'center',
                      marginLeft: '17%',
                    }}
                    onPress={() => this.ClickLogoutNo()}>
                    <Text
                      style={{
                        color: '#ffffff',
                        alignSelf: 'center',
                        fontSize: (deviceHeight * 2) / 100,
                      }}>
                      No
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: '30%',
                      paddingTop: 10,
                      paddingBottom: 10,
                      backgroundColor: '#ff4100',
                      justifyContent: 'center',
                      borderRadius: 6,
                      alignSelf: 'center',
                      marginRight: '17%',
                    }}
                    onPress={() => this.ClickLogoutYes()}>
                    <Text
                      style={{
                        color: '#ffffff',
                        alignSelf: 'center',
                        fontSize: (deviceHeight * 2) / 100,
                      }}>
                      Yes
                    </Text>
                  </TouchableOpacity>
                </View>
              </DialogContent>
            </Dialog>
          </Content>
          <FooterMenu navigation={navigation} name="More" />
        </Container>
      </SafeAreaView>
    );
  }

  CpClick() {
    this.props.navigation.navigate('ChangePassword');
  }

  LogoutClick() {
    this.setState({visiblePopUp: true});
  }

  ClickLogoutNo() {
    this.setState({visiblePopUp: false});
  }

  onClickPP = async () => {
    const url = 'https://ticketpeak.com/privacy-policy/';
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);
    console.log('Checkbox is checked:', this.state.isChecked);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  logout = () => {
    AsyncStorage.clear();
    Toast.show({
      text: 'Successfully Logged out.',
      buttonText: 'Okay',
      duration: 3000,
    });
    setTimeout(() => {
      this.props.navigation.navigate('Auth');
    }, 1200);
  };

  ClickLogoutYes() {
    this.setState({visiblePopUp: false}, () => {
      // setTimeout(() => {
      //   this.props.navigation.navigate('Auth');
      //  }, 1000);
      this.logout();
    });
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  mainContent: {
    width: '100%',
    flex: 1,
    marginTop: 0,
    backgroundColor: '#fff',
  },
});
