import { View ,Text, StyleSheet,TouchableOpacity} from "react-native"
import { elevation } from "./common/styles"
import { withNavigation } from "react-navigation"



const TaskItem=({taskdata,navigation})=>{

    return(
        
        <TouchableOpacity onPress={()=>{navigation.navigate("Task",taskdata)}}>
        <View style={[style.container,style.elevation]}>

            <View style={style.infocontainer}>
                <Text style={style.header}>{taskdata.title}</Text>
            </View>

        </View></TouchableOpacity>

    )



}

const style=StyleSheet.create({
    elevation,
    container:{
        backgroundColor:"white",
        height:100,
        alignSelf:"stretch",
        marginVertical:15,
        flexDirection:"row",
        alignItems:"center",
        borderRadius:100,
        justifyContent:"center",

    },
    infocontainer:{
        padding:15,
        flex:1,
        alignItems:"center",
        color:"black"
    },
    header:{
        fontSize:20,
        fontWeight:"bold",
        color:"black"
    }
    
})


export default withNavigation(TaskItem);