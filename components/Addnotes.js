import { useEffect, useState } from "react";
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Button} from "react-native";
import {openDatabase} from 'react-native-sqlite-storage'
import { Picker} from "@react-native-picker/picker";
import DatePicker from "react-native-date-picker";


const db=openDatabase({
    name:"NotesDB"
});

const Addnotes=({notesList,setNotesList,getNotes})=>{
    
    const [title,setTitle]=useState();
    const [description,setDescription]=useState();
    const [selectedValue, setSelectedValue] = useState('low');
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    




    const addNote=()=>{
        if(!title || !description){
            alert("enter the details");
            return;
        }
        db.transaction(txn=>{
            const query=`INSERT INTO notes(title,description,priority,viewed) VALUES(?,?,?,?)`;
            console.log(query)
            txn.executeSql(query,[title,description,selectedValue,false],
                (sqltxn,res)=>{
                    //console.log(`added ${JSON.stringify(res)}`);
                    getNotes();
        
                },(error)=>{
                    console.log(error.message)
                });
        })

        setTitle("");
        setDescription("")
        setSelectedValue('low')
    }

    return(

        <View  style={styles.container}>
        <View> 
        <Text style={styles.content}>Fill the details to add the Note</Text>
        </View>

            <View style={{marginVertical:20}}>
            <TextInput label="Title" style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} ></TextInput>
            <TextInput multiline={true} style={{...styles.input,height:200,overflow:"scroll"}} placeholder="Description" value={description} onChangeText={setDescription} ></TextInput>
            <View>
            <Text style={{marginVertical:20,...styles.content}}>Select an option:</Text>
            <Picker
             style={{height:"200",width:"100",}}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="low" value="low" />
                <Picker.Item label="medium" value="medium" />
                <Picker.Item label="high" value="high" />
            </Picker>
    </View>


    










            </View>
            <Button title="ADD" onPress={addNote} />


            







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
        marginVertical:20,
        borderRadius:30,

    }
    
    
})


export default Addnotes;