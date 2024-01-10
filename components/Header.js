import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const Header=()=>{

    const [date,setDate]=useState(new Date());

    return(

        <View  style={styles.container}>
            <Text style={styles.light_header_text}>[name of the person]</Text>
            {/* <Text style={styles.bold_header_text} >{""+date.getDate()+"/"+date.getUTCMonth()+"/"+date.getFullYear()}</Text> */}
        </View>



    )
}

const styles=StyleSheet.create({

    container:{
        marginTop:10,
        marginHorizontal:20,
    },

    light_header_text:{
        fontSize:30,
    },
    bold_header_text:{
        fontSize:40,
        fontWeight:"bold",
    }
    
})


export default Header;