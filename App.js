import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MainScreen from "./src/screens/MainScreen";
import WatchlistScreen from "./src/screens/WatchlistScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
 

const StackNavigator = createStackNavigator(
  {
  
    Main:MainScreen,
    WatchList:WatchlistScreen,
    History:HistoryScreen
  },
  {
    initialRouteName: "Main",
    defaultNavigationOptions: {
      title: "Currency Converter",
    },
  }
);
const AppContainer=createAppContainer(StackNavigator)
const App = () => {
  return (

  <AppContainer/>
 
  )
};

export default App;
 
