import { createSwitchNavigator, createAppContainer } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/native-tabs';
import { createStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/Auth/Login';
import AuthLoadingScreen from '../components/Auth/AuthLoadingScreen';
import Home from '../components/Home/Home';
import ScanBarcode from '../components/Home/ScanBarcode';
import ScanBarcodeAll from '../components/Home/ScanBarcodeAll';
import ChangePassword from '../components/More/ChangePassword';
import MyAccount from '../components/MyAccount/MyAccount';
import More from '../components/More/More';
import Forgotpwd from '../components/Auth/Forgotpwd';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

  const AppStack = createBottomTabNavigator(
      {
        Home:{screen: Home,
          navigationOptions: {
            tabBarVisible: false,
            useSafeAreaInsets: {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }
          }
        },
        ScanBarcode:{screen: ScanBarcode,
          navigationOptions: {
            tabBarVisible: false,
            useSafeAreaInsets: {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }
          }
        },
        ScanBarcodeAll:{screen: ScanBarcodeAll,
          navigationOptions: {
            tabBarVisible: false,
            useSafeAreaInsets: {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }
          }
        },
        MyAccount:{screen: MyAccount,
          navigationOptions: {
            tabBarVisible: false,
            useSafeAreaInsets: {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }
          }
        },
        ChangePassword:{screen: ChangePassword,
          navigationOptions: {
            tabBarVisible: false,
            useSafeAreaInsets: {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }
          }
        },
        More:{screen: More,
          navigationOptions: {
            tabBarVisible: false,
            useSafeAreaInsets: {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }
          }
        },
  }, {headerMode: 'none'});

    const AuthStack = createStackNavigator({
      Login:{screen: Login , navigationOptions: {
        header: null,
        useSafeAreaInsets: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }
        }},
      Forgotpwd:{screen: Forgotpwd , navigationOptions: {
        header: null,
        useSafeAreaInsets: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }
        }},
        
    });


    export default createAppContainer(createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
    ));
