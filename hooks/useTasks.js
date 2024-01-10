import { useState } from "react"
import poki from "../api/poki"
import {openDatabase} from 'react-native-sqlite-storage'
const db=openDatabase({
    name:"NotesDB"
});
export default()=>{
    const [result,setResult]=useState({data:null,loading:false,error:null})

    const searchTask=async(index,status)=>{

        const tableName=status===1?"notes":"completed"

        setResult({
            data:null,
            loading:true,
            error:false

        })
   
        try{
            let query=`SELECT * FROM ${tableName} WHERE title like '%${index}%'`
            const response=[]
            const getNotes=()=>{
  
                db.transaction(txn=>{
                  txn.executeSql(
                  query,
                  [],
                  (sqltxn,res)=>{
                      console.log("table RECEIVED successfully")
                      let len=res.rows.length;
                      console.log(len)
                      if(len>0){
                        
                        for(let i=0;i<len;i++){
                          let item=res.rows.item(i);
                          response.push({id:item.id,title:item.title,description:item.description,priority:item.priority,viewed:item.viewed,completed:item.completed})
                        }
                      }
                  },
                  (error)=>{
                      console.log("there is an error in useTasks"+error.message)
            
                  }
                  )
                  
              })
                
              }
              getNotes()

        setResult({
            data:response,
            loading:false,
            error:null
        })
        //console.log(response.data.pokemon)
    }catch(error){
        setResult({
            data:null,
            loading:false,
            error:"something went wrong"
        })
       // console.log("something went wrong")
    }

    
}
return [result,searchTask]

}