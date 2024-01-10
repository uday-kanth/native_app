import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { elevation } from "./common/styles";
import { withNavigation } from "react-navigation";
import {openDatabase} from 'react-native-sqlite-storage'

const db=openDatabase({
    name:"NotesDB"
});

const TaskItem = ({ taskdata,getNotes, navigation }) => {
  const [priorityColor, setPriorityColor] = useState("");

  useEffect(() => {
    if (taskdata.priority === "low") {
      setPriorityColor('green'); // Set color for low priority
    } else if (taskdata.priority === "medium") {
      setPriorityColor('#ffb703'); // Set color for medium priority
    } else {
      setPriorityColor('red'); // Set color for high priority
    }
  }, [taskdata.priority]);


  const markView=async()=>{
    await db.transaction(txn=>{
        const query=`UPDATE notes SET viewed = true WHERE id = ${taskdata.id};`;
        //console.log(query)
        txn.executeSql(query,[],
            (sqltxn,res)=>{
                //console.log(`added ${JSON.stringify(res)}`);
    
            },(error)=>{
                console.log(error.message)
            });
    })
  }






  return (
    <TouchableOpacity onPress={() => {markView();getNotes(); navigation.navigate("Task", taskdata); }}>
      <View style={[style.container, style.elevation]}>
        <View style={{ backgroundColor: priorityColor, ...style.priorityBox }}>
          <Text style={style.priority}></Text>
        </View>
        <View style={style.infocontainer}>
          <Text style={style.header}>{taskdata.title}</Text>
        </View>

        {taskdata.viewed===0 && <View>
            <Text style={{color:"green",fontSize:20}}>new</Text>
        </View>}

      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  elevation,
  container: {
    backgroundColor: "white",
    height: 100,
    alignSelf: "stretch",
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
  },
  infocontainer: {
    padding: 15,
    flex: 1,
    alignItems: "center",
    color: "black",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  priorityBox: {
    marginHorizontal: 10,
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 25, // Set border radius half of width and height for a circle
    marginHorizontal: 10,
    overflow:"hidden",
  },
  priority: {
  },
});

export default withNavigation(TaskItem);
