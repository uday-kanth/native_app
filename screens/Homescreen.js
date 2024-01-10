import { StyleSheet, View ,TouchableOpacity,Text} from "react-native"
import Header from "../components/Header"
import Search from "../components/Search"
import Category from "../components/Category"
import Tasks from "../components/Tasks"
import { SafeAreaView } from "react-navigation"
import {useEffect, useState} from 'react';
import Addnotes from "../components/Addnotes"
import {openDatabase} from 'react-native-sqlite-storage'
import Bar from "../components/Bar"

const db=openDatabase({
    name:"NotesDB"
});

const HomeScreen=()=>{
  useEffect(()=>{
    createTables();
    createTableCompleted();
  },[]);

const  [page,setPage]=useState(1);

  useEffect(()=>{
    getNotes();
  },[notesList]);
  const [notesList,setNotesList]=useState([])
  const [completedList,setCompletedList]=useState([])
  
  const [term,SetTerm]=useState("");
  
  const createTables=()=>{
    
    db.transaction(txn=>{
      txn.executeSql(
          `create table if not exists notes(id INTEGER PRIMARY KEY AUTOINCREMENT,title VARCHAR(20),description TEXT)`,
          [],
          (sqltxn,res)=>{
              console.log("table created successfully")
          },
          (error)=>{
              console.log("there is an error")

          }
          )
      })
  }


  const createTableCompleted=()=>{
    
    db.transaction(txn=>{
      txn.executeSql(
          `create table if not exists completed(id INTEGER PRIMARY KEY AUTOINCREMENT,title VARCHAR(20),description TEXT)`,
          [],
          (sqltxn,res)=>{
              console.log("table created successfully")
          },
          (error)=>{
              console.log("there is an error")

          }
          )
      })
  }









  const getNotes=()=>{
  
      db.transaction(txn=>{
        txn.executeSql(
        `SELECT * FROM notes ORDER BY id DESC`,
        [],
        (sqltxn,res)=>{
            console.log("table RECEIVED successfully")
            let len=res.rows.length;
            console.log(len)
            if(len>0){
              let results=[]
              for(let i=0;i<len;i++){
                let item=res.rows.item(i);
                results.push({id:item.id,title:item.title,description:item.description})
              }
              // console.log(" haha" + results)
              
              setNotesList((prevNotesList) => [...prevNotesList, ...results]);
            }
        },
        (error)=>{
            console.log("there is an error")
  
        }
        )
        
    })
      
    }






    const getCompletedNotes=()=>{
  
      db.transaction(txn=>{
        txn.executeSql(
        `SELECT * FROM completed ORDER BY id DESC`,
        [],
        (sqltxn,res)=>{
            console.log("table RECEIVED successfully")
            let len=res.rows.length;
            console.log(len)
            if(len>0){
              let results=[]
              for(let i=0;i<len;i++){
                let item=res.rows.item(i);
                results.push({id:item.id,title:item.title,description:item.description})
              }
              // console.log(" haha" + results)
              
              setCompletedList((prevCompletedList) => [...prevCompletedList, ...results]);
            }
        },
        (error)=>{
            console.log("there is an error")
  
        }
        )
        
    })
      
    }



  






// const CategoryList=[
// {
//   name:"homework",
//   imageurl:require("../assets/images/burger.png")

// },
// {
//   name:"food",
//   imageurl:require("../assets/images/pizza.png")

// },
// {
//   name:"water",
//   imageurl:require("../assets/images/soda.png")

// },
// {
//   name:"snacks",
//   imageurl:require("../assets/images/cake.png")

// },
// {
//   name:"laundry",
//   imageurl:require("../assets/images/burger.png")

// },
// {
//   name:"fix lights",
//   imageurl:require("../assets/images/pizza.png")

// },
// {
//   name:"dark",
//   imageurl:require("../assets/images/soda.png")

// },
// {
//   name:"grass",
//   imageurl:require("../assets/images/cake.png")

// }

// ]




    return(
        
<SafeAreaView>
        <View style={style.container}>

{page===1 &&  <View>

        <Header></Header>
        <Search SetTerm={SetTerm} ></Search>
         {/* <Category CategoryList={CategoryList} SetTerm={SetTerm} term={term}/> */}

        <Bar setPage={setPage}></Bar>
        <Tasks term={term} status={page}></Tasks> 
</View>
}

{page===0 &&
<View>
<Bar setPage={setPage}></Bar>
<Addnotes notesList={notesList} setNotesList={setNotesList} getNotes={getNotes} ></Addnotes>


</View>
}

{page===2 &&
<View>
<Search SetTerm={SetTerm} ></Search>
<Bar setPage={setPage}></Bar>
<Tasks term={term} status={page}></Tasks>
</View>
}

        
      </View>
</SafeAreaView>
    )
}

const style=StyleSheet.create({
    container:{
        backgroundColor:"#f5ebe0",
        color:"black"
    }
})


export default HomeScreen