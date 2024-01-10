import { Image, StyleSheet, Text, View } from "react-native";
import { elevation } from "./common/styles";

 
function Categoryitems ({name,imageurl,index,active}){
    return(
    <View style={[styles.container,styles.elevation,index===0? {marginLeft:25} : {marginLeft:15},active?{backgroundColor:"rgb(241,186,87)"}:{backgroundColor:"white"}]}>
    <View style={styles.imagecontainer}>
        <Image style={styles.image} source={imageurl}/>
    </View>

    <Text style={styles.tag}>{name}</Text>
    </View>        
    )
}

const styles=StyleSheet.create({
container:{
    backgroundColor:"white",
    height:110,
    width:70,
    borderRadius:50,
    // marginHorizontal:25,
    marginVertical:15,
    justifyContent:"center",
    alignItems:"center",






},elevation,
image:{
    width:35,
    height:35,
},
imagecontainer:{
    width:50,
    height:50,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"white",
    borderRadius:50,
    marginTop:5,
},
tag:{
    fontWeight:"bold",
},

})

export default Categoryitems;