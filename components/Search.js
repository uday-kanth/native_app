import { Text, View ,TextInput, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { elevation } from "./common/styles";
import { useState } from "react";


const Search=({SetTerm})=>{

    const [input,setInput]=useState("")

    const handleEnter=()=>{
        if(!input)return
        SetTerm(input);
        setInput("");
    }

    return(

        <View style={[styles.container,styles.elevation]}>
        <Icon name="search" size={25} style={{marginTop:10}}/>
        <TextInput  value={input} 
                    placeholder="title of Note"
                    onChangeText={(text)=>{setInput(text);}}
                    onEndEditing={handleEnter} />
        </View>


    )


}

const styles=StyleSheet.create({

    container:{
        flexDirection:'row',
        marginHorizontal:20,
        marginTop:5,
        padding:10,
        backgroundColor:"white",
        borderRadius:40,
    
    },
    elevation,
    input:{
        marginLeft:10,
        fontSize:20,
    }


})




export default Search;