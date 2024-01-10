import { View,Text,StyleSheet,TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-navigation"
import {openDatabase} from 'react-native-sqlite-storage'
import { useEffect } from "react";
const db=openDatabase({
    name:"NotesDB"
});

const Taskscreen=({navigation})=>{
    const title=navigation.getParam("title")
    const description=navigation.getParam("description")
    const priority=navigation.getParam("priority")
    const index=navigation.getParam('id')
    const completed=navigation.getParam('completed')


    console.log(completed)

    const addNoteCompleted=async()=>{

        await db.transaction(txn=>{
            const query=`INSERT INTO completed(title,description,priority,viewed,completed) VALUES(?,?,?,?,?)`;
            //console.log(query)
            txn.executeSql(query,[title,description,priority,true,true],
                (sqltxn,res)=>{
                    //console.log(`added ${JSON.stringify(res)}`);
        
                },(error)=>{
                    console.log(error.message)
                });
        })

    }




    let query=`DELETE FROM notes WHERE id=${index}`
    const response=[]
    const deleteNote=async (status)=>{

        db.transaction(txn=>{
          txn.executeSql(
          query,
          [],
          (sqltxn,res)=>{
            if(status){
            addNoteCompleted();
            }
              console.log("row deleted successfully")
          },
          (error)=>{
              console.log("there is an error in delete ")
    
          }
          )
          
      })
        
      }






    return(
              
<SafeAreaView>
        <View style={style.container}>
        <Text style={style.title}>{title}</Text>
        <View>
            <Text style={style.description}>{description}</Text>
        </View>

        <View style={style.taskbtn}>
        <TouchableOpacity onPress={()=>{navigation.navigate("Home")}}>
        <View style={style.button}>
        <Text style={{color:"black"}}>Back</Text>
        </View>
        </TouchableOpacity>
{   completed===0 &&
        <TouchableOpacity onPress={()=>{deleteNote(1)}}>
        <View style={style.button}>
        <Text style={{color:"black"}}>Mark as Complete</Text>
        </View>
        </TouchableOpacity>

}

{ completed===0 &&

        <TouchableOpacity onPress={()=>{deleteNote()}}>
        <View style={style.button}>
        <Text style={{color:"black"}}>Delete</Text>
        </View>
        </TouchableOpacity>
}

        

        
        </View>

        
      </View>
</SafeAreaView>
    )
}
const style=StyleSheet.create({
    container:{
        backgroundColor:"#f5ebe0",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        
    },
    title:{
        fontWeight:"bold",
        fontSize:30,
        marginVertical:30,
        color:"black"
    },
    description:{
        fontSize:20,
        marginVertical:10,
        color:"black"
    },
    button:{
        backgroundColor:"#d6ccc2",
        borderRadius:30,
        justifyContent:"center",
        alignItems:"center",
        margin:20,
        padding:20,
        color:"black"
    },

    taskbtn:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        marginHorizontal:20,
    }








})
export default Taskscreen;