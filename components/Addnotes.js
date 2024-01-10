import { useEffect, useState } from "react";
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Button} from "react-native";
import {openDatabase} from 'react-native-sqlite-storage'
import { Picker} from "@react-native-picker/picker";


const db=openDatabase({
    name:"NotesDB"
});

const Addnotes=({notesList,setNotesList,getNotes})=>{
    
    const [title,setTitle]=useState();
    const [description,setDescription]=useState();
    const [selectedValue, setSelectedValue] = useState('');
    const addNote=()=>{
        if(!title || !description){
            alert("enter the details");
            return;
        }
        db.transaction(txn=>{
            const query=`INSERT INTO notes(title,description) VALUES(?,?)`;
            console.log(query)
            txn.executeSql(query,[title,description],
                (sqltxn,res)=>{
                    //console.log(`added ${JSON.stringify(res)}`);
                    getNotes();
        
                },(error)=>{
                    console.log(error.message)
                });
        })
    }

    return(

        <View  style={styles.container}>
        <View> 
        <Text style={styles.content}>Fill the details to add the Note</Text>
        </View>

            <View>
            <TextInput label="Title" style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} ></TextInput>
            <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} ></TextInput>
            <View>
            <Text style={styles.content}>Select an option:</Text>
            <Picker
             style={{height:"200",width:"100"}}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="low" value="low" />
                <Picker.Item label="medium" value="medium" />
                <Picker.Item label="high" value="high" />
            </Picker>
            <Text style={styles.content}>Selected Value: {selectedValue}</Text>
    </View>
            <Button title="ADD" onPress={addNote} />
            </View>
        </View>



    )
}

const styles=StyleSheet.create({

    container:{
        marginTop:10,
        marginHorizontal:20,
        color:"black"
    },

    light_header_text:{
        fontSize:30,
        color:"black"
    },
    bold_header_text:{
        fontSize:40,
        fontWeight:"bold",
        color:"black"
    },
    content:{
        color:"black",
        fontSize:20,
    },
    input:{
        fontSize: 20, // Adjust the font size as needed
        height: 50,   // Adjust the height as needed
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginVertical:10,
        borderRadius:30,

    }
    
    
})


export default Addnotes;