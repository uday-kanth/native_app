import Categoryitems from "./Categoryitems"
import {FlatList,TouchableOpacity, View} from 'react-native'
const Category=({CategoryList,SetTerm,term})=>{

    return(
        <View>
        <FlatList 
        showsHorizontalScrollIndicator={false} 
        horizontal={true} 
        data={CategoryList} 
        renderItem={({item,index})=>{
          return (
          <TouchableOpacity onPress={()=>{SetTerm(item.name)}}>
          <Categoryitems name={item.name} 
                  imageurl={item.imageurl} 
                  index={index} 
                  active={term===item.name}  
                   /></TouchableOpacity>)
                  }}
        keyExtractor={(category)=>category.name}
        
        /></View>
        
    )


}

export default Category;