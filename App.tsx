import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./screens/Homescreen";
import { createAppContainer } from "react-navigation";
import Taskscreen from "./screens/Taskscreen";


const navigator=createStackNavigator({
  Home:HomeScreen,
  Task:Taskscreen
},
{
  initialRouteName:"Home",
  defaultNavigationOptions:{
    title:"My_Note",
  }
},


);

export default createAppContainer(navigator);