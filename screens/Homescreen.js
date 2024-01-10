import { StyleSheet, View ,TouchableOpacity,Text,StatusBar} from "react-native"
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
  },[notesList,page]);
  const [notesList,setNotesList]=useState([])
  const [completedList,setCompletedList]=useState([])
  
  const [term,SetTerm]=useState("");
  
  const createTables=()=>{
    
    db.transaction(txn=>{
      txn.executeSql(
          `create table if not exists notes(id INTEGER PRIMARY KEY AUTOINCREMENT,title VARCHAR(20),description TEXT , priority VARCHAR(20),viewed BOOLEAN,completed BOOLEAN)`,
          [],
          (sqltxn,res)=>{
              console.log("table created successfully")
          },
          (error)=>{
              console.log("there is an error in normal table creation"+error.message)

          }
          )
      })
  }


  const createTableCompleted=()=>{
    
    db.transaction(txn=>{
      txn.executeSql(
          `create table if not exists completed(id INTEGER PRIMARY KEY AUTOINCREMENT,title VARCHAR(20),description TEXT, priority VARCHAR(20),viewed BOOLEAN,completed BOOLEAN)`,
          [],
          (sqltxn,res)=>{
              console.log("table created successfully")
          },
          (error)=>{
              console.log("there is an error in complete table creation")

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
                results.push({id:item.id,title:item.title,description:item.description,priority:item.priority,viewed:item.viewed,completed:item.completed})
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
                results.push({id:item.id,title:item.title,description:item.description,priority:item.priority,viewed:item.viewed,completed:item.completed})
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
        <StatusBar backgroundColor="#03045e" barStyle="light-content" />

{page===1 &&  <View>

        {/* <Header></Header> */}
        <Bar page={page} setPage={setPage}></Bar>
        <Search SetTerm={SetTerm} ></Search>
         {/* <Category CategoryList={CategoryList} SetTerm={SetTerm} term={term}/> */}

        <Tasks term={term} status={page} getNotes={getNotes}></Tasks> 
</View>
}

{page===0 &&
<View>
<Bar setPage={setPage} page={page}></Bar>
<Addnotes notesList={notesList} setNotesList={setNotesList} getNotes={getNotes} ></Addnotes>


</View>
}

{page===2 &&
<View>
<Bar page={page} setPage={setPage}></Bar>
<Search SetTerm={SetTerm} ></Search>
<Tasks term={term} status={page} getNotes={getNotes}></Tasks>
</View>
}

        
      </View>
</SafeAreaView>
    )
}

const style=StyleSheet.create({
    container:{
        backgroundColor:"#caf0f8",
        color:"black",
        height:"100%",
    }
})


export default HomeScreen