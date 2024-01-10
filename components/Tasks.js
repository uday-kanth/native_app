import { View,Text,StyleSheet ,FlatList} from "react-native";
import useTasks from "../hooks/useTasks";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import TaskItem from "./TaskItem";



const Tasks=({term,status,getNotes})=>{
 
const [{data,loading,error},searchTask]=useTasks();
useEffect(()=>{
searchTask(term,status)
},[term,status])

console.log({data,loading,error})

if(loading){
return(
    <ActivityIndicator size={"large"} margin={30}/>
)

}

else if(error){
    return(
        <View style={style.container}>
        <Text style={style.header}>{error}</Text>

        </View>
    )
}


else{

    return(
        <View style={style.container}>
           <Text style={style.header}>Tasks</Text>
           <FlatList data={data} 
           style={{marginVertical:30}}
           renderItem={({item})=>{ console.log(item); return( <TaskItem taskdata={item} getNotes={getNotes}></TaskItem>)}}
           keyExtractor={(item)=>item.id}
            />
        </View>
    )
}


}


const style=StyleSheet.create({

container:{
    
    marginHorizontal:25,
    marginVertical:15,
    color:"black"
   
},

header:{
    fontWeight:"bold",
    fontSize:20,
    paddingBottom:10,
    color:"black"

}


})



export default Tasks;