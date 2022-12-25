import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import componentScreen from "./src/screens/componentScreen";
import ListScreen from "./src/screens/List";
import ImageScreen from "./src/screens/imageScreen";
import CounterScreen from "./src/screens/counterScreen";
import ColorScreen from "./src/screens/colorSreen";
import SquareScreen from "./src/screens/squareScreen";
import TextSreen from "./src/screens/textScreen";
import {store} from './redux/store'
import { Provider } from "react-redux";

const StackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Component:componentScreen,
    List:ListScreen,
    Image:ImageScreen,
    Counter:CounterScreen,
    Color:ColorScreen,
    Square:SquareScreen,
    Text:TextSreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);
const AppContainer=createAppContainer(StackNavigator)
const App = () => {
  return (
<Provider store={store}>
  <AppContainer/>
  </Provider>
  )
};

export default App;
 
