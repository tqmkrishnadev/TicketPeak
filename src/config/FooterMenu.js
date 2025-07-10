import React, { Component } from 'react';
import {Footer,FooterTab, Button} from 'native-base';
import {Image,Text,Dimensions} from 'react-native';
import CONSTANTS from './Constants';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

export default class FooterMenu extends React.Component {

  constructor(props) {
      super(props);
  }

  render() {
    return (
      <Footer >
          <FooterTab style={{backgroundColor:"#FFF",shadowColor: '#f2f2f2',shadowOffset: { width: 0, height:13 },shadowOpacity: 0.8,shadowRadius: 2,elevation: 8}}>
             

              { this.props.name === 'Home' ? 
                <Button onPress={() => this.props.navigation.navigate('Home')}>
                   <Image source={require('../images//home-icon-active.png')} style={{width:deviceHeight * 2.2 / 100,height:deviceHeight * 2.2 / 100}} />
                   <Text style={{color:'#ff4100',fontSize:deviceHeight * 1.4 / 100,textTransform:'capitalize'}}>{CONSTANTS.HOME}</Text>
                </Button>
                 :
                <Button onPress={() => this.props.navigation.navigate('Home')}>
                   <Image source={require('../images//home-icon.png')} style={{width:deviceHeight * 2.2 / 100,height:deviceHeight * 2.2 / 100}} />
                   <Text style={{color:'#000',fontSize:deviceHeight * 1.4 / 100,textTransform:'capitalize'}}>{CONSTANTS.HOME}</Text>
               </Button>
              }

              { this.props.name === 'My Account' ? 
                <Button onPress={() => this.props.navigation.navigate('MyAccount')}>
                  <Image source={require('../images//account-active.png')} style={{width:deviceHeight * 2.2 / 100,height:deviceHeight * 2.2 / 100}} />
                  <Text style={{color:'#ff4100',fontSize:deviceHeight * 1.4 / 100}}>{CONSTANTS.MYACCOUNT}</Text>
                </Button>
                 :
                <Button onPress={() => this.props.navigation.navigate('MyAccount')}>
                  <Image source={require('../images//account.png')} style={{width:deviceHeight * 2.2 / 100,height:deviceHeight * 2.2 / 100}} />
                  <Text style={{color:'#000',fontSize:deviceHeight * 1.4 / 100}}>{CONSTANTS.MYACCOUNT}</Text>
                </Button>
              }

              { this.props.name === 'More' ? 
                <Button onPress={() => this.props.navigation.navigate('More',{isback:'no'})}>
                  <Image source={require('../images//more-active.png')} style={{width:deviceHeight * 2.2 / 100,height:deviceHeight * 2.2 / 100}} />
                  <Text style={{color:'#ff4100',fontSize:deviceHeight * 1.4 / 100}}>{CONSTANTS.MORE}</Text>
                </Button>
                 :
                <Button onPress={() => this.props.navigation.navigate('More',{isback:'no'})}>
                  <Image source={require('../images//more.png')} style={{width:deviceHeight * 2.2 / 100,height:deviceHeight * 2.2 / 100}} />
                  <Text style={{color:'#000',fontSize:deviceHeight * 1.4 / 100}}>{CONSTANTS.MORE}</Text>
                </Button>
              }
              
          </FooterTab>
      </Footer>
    );
  }
}