import { View ,Text, StyleSheet,TouchableOpacity} from "react-native"
import { elevation } from "./common/styles"
import { withNavigation } from "react-navigation"



const Bar=({setPage})=>{

    return(
        
        <View style={style.Bar}>

        <TouchableOpacity onPress={()=>{setPage(0)}}>
          <View>
            <Text style={style.Baritem}>New</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setPage(1)}}>
          <View>
            <Text style={style.Baritem}>On going</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setPage(2)}}>
          <View>
            <Text style={style.Baritem}>Completed</Text>
          </View>
        </TouchableOpacity>
        


        </View>

    )



}

const style=StyleSheet.create({
    Bar:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        backgroundColor:"#0077b6",
        fontSize:20,
        marginVertical:20,
  
  
  
      },
      Baritem:{
        margin:10,
        padding:10,
        fontSize:20,
        color:"white",
        fontWeight:"500"
      }
    
})


export default Bar;