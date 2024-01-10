import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
   
class List extends Component {
   state = {
      names: [
         {
            id: 0,
            name: 'Ben',
         },
         {
            id: 1,
            name: 'Susan',
         },
         {
            id: 2,
            name: 'Robert',
         },
         {
            id: 3,
            name: 'Mary',
         }
      ]
   }
   alertItemName = (item) => {
      alert(item.name)
   }
   render() {
      return (
         <View style={styles.container}>
            {
               this.state.names.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style={styles.button}
                     
                     onPress = {() => this.alertItemName(item)}>
                     <Text style = {styles.text}>
                        {item.name}
                     </Text>
                  </TouchableOpacity>
               ))
            }
         </View>
      )
   }
}
export default List

const styles = StyleSheet.create ({
   
   container: {
      width:'100%',
      height:600,
      justifyContent:"space-evenly",
      alignItems: 'center',
   },
   button:{
      width:'100%',
      padding: 10,
      margin:5,
      backgroundColor: '#d9f9b1',
      
      

   },
   text: {
      color: 'black',
      textAlign:'center'
   },

})