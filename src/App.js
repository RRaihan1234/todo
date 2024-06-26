import { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker'
import './App.css';
import data from '../src/data.json'

function App() {
  const [newTodo, setNewTodo] = useState([]);
  const [onGoingTodo, setOnGoingTodo] = useState([]);
  const [doneTodo, setDoneTodo] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showAddBtn, setShowAddtn] = useState(true);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [rightClick, setRightClick] = useState(false);
  const [render, setRender] = useState(false);
  const [date,setDate] = useState();
  const [expire, setExpire] = useState(false);
  const [dateAndTime, setDateAndTime] = useState(new Date());

  const handleShowForm = () => {
        setShowForm(true)
        setShowAddtn(false)
  }

  const handleCancel = () => {
        setShowAddtn(true);
        setShowForm(false)
  }

  const handleTitle = (e) => {
        setTitle(e.target.value)
  }
  const handleDesc = (e) => {
        setDesc(e.target.value)
  }

  const handleSubmit = (e) => {
        e.preventDefault();
        let lengthMinusOne = newTodo.length - 1;
        console.log(newTodo.length);
        console.log(newTodo)
        if(lengthMinusOne === -1){
          newTodo.unshift({
            todoTitle : title,
            todoDesc : desc,
            id : 1
          })
        }else{
          newTodo.unshift({
            todoTitle : title,
            todoDesc : desc,
            id : newTodo[0].id + 1
          })
        }
        console.log(newTodo);
        setShowForm(false);
        setShowAddtn(true);
  }

  const handleNewContextMenu = (e,id) => {
        e.preventDefault();
        let rightCilckedItem = newTodo.filter((item)=>{
            return item.id===id;
        })
        if(rightCilckedItem[0].rightClick){
           rightCilckedItem[0].rightClick = false;
        }else{
          rightCilckedItem[0].rightClick = true;
        }
        setRender((prevState)=>!prevState);
        console.log(newTodo)
  }

  const handleMoveToOngoingfromNew = (id) => {
        let lengthMinusOne = onGoingTodo.length - 1;
        let movingToOngoingItem = newTodo.filter((item)=>{
          return item.id === id;
        })
        if(lengthMinusOne === -1){
          onGoingTodo.push({
            todoTitle : movingToOngoingItem[0].todoTitle,
            todoDesc : movingToOngoingItem[0].todoDesc,
            id : 1
          });
        }else{
          onGoingTodo.push({
            todoTitle : movingToOngoingItem[0].todoTitle,
            todoDesc : movingToOngoingItem[0].todoDesc,
            id : onGoingTodo[lengthMinusOne].id + 1
          });
        }
        setRender((prevState)=>!prevState)

        let remainingNewTodo = newTodo.filter((item)=>{
          return item.id!==id;
        })
        setNewTodo(remainingNewTodo);

  }

  const handleMoveToDonefromNew = (id) => {
   
    let lengthMinusOne = doneTodo.length - 1;
    let movingToDoneItem = newTodo.filter((item)=>{
      return item.id === id;
    })
   if(lengthMinusOne === -1){
    doneTodo.push({
      todoTitle : movingToDoneItem[0].todoTitle,
      todoDesc : movingToDoneItem[0].todoDesc,
      id : 1
    });
   }else{
    doneTodo.push({
      todoTitle : movingToDoneItem[0].todoTitle,
      todoDesc : movingToDoneItem[0].todoDesc,
      id : doneTodo[lengthMinusOne].id + 1
    });
   }
    setRender((prevState)=>!prevState)

    let remainingNewTodo = newTodo.filter((item)=>{
      return item.id!==id;
    })
    setNewTodo(remainingNewTodo);

}

 const handleOngoingContextMenu = (e,id)=> {
      e.preventDefault();
      let rightCilckedItem = onGoingTodo.filter((item)=>{
          return item.id===id;
      })
      if(rightCilckedItem[0].rightClick){
        rightCilckedItem[0].rightClick = false;
      }else{
        rightCilckedItem[0].rightClick = true;
      }
      setRender((prevState)=>!prevState);
      console.log(onGoingTodo)
 }

  const handleMoveToNewfromOngoing = (id)=> {
    let lengthMinusOne = newTodo.length - 1;
    let movingToNewItem = onGoingTodo.filter((item)=>{
      return item.id === id;
    })
    if(lengthMinusOne === -1){
      newTodo.push({
        todoTitle : movingToNewItem[0].todoTitle,
        todoDesc : movingToNewItem[0].todoDesc,
        id : 1
      });
    }else{
      newTodo.push({
        todoTitle : movingToNewItem[0].todoTitle,
        todoDesc : movingToNewItem[0].todoDesc,
        id : newTodo[lengthMinusOne].id + 1
      });
    }
    setRender((prevState)=>!prevState)

    let remainingOnGoingTodo = onGoingTodo.filter((item)=>{
      return item.id!==id;
    })
    setOnGoingTodo(remainingOnGoingTodo);
  }

  const handleMoveToDonefromOngoing = (id)=> {
    let lengthMinusOne = doneTodo.length - 1;
    let movingToDoneItem = onGoingTodo.filter((item)=>{
      return item.id === id;
    })
    
    if(lengthMinusOne === -1){
      doneTodo.push({
        todoTitle : movingToDoneItem[0].todoTitle,
        todoDesc : movingToDoneItem[0].todoDesc,
        id : 1
      });
    }else{
      doneTodo.push({
        todoTitle : movingToDoneItem[0].todoTitle,
        todoDesc : movingToDoneItem[0].todoDesc,
        id : doneTodo[lengthMinusOne].id + 1
      });
    }
    setRender((prevState)=>!prevState)
    

    let remainingOnGoingTodo = onGoingTodo.filter((item)=>{
      return item.id!==id;
    })
    setOnGoingTodo(remainingOnGoingTodo);
  }
  
  const handleDoneContextMenu = (e,id)=> {
    e.preventDefault();
    let rightCilckedItem = doneTodo.filter((item)=>{
        return item.id===id;
    })
    if(rightCilckedItem[0].rightClick){
      rightCilckedItem[0].rightClick = false;
    }else{
      rightCilckedItem[0].rightClick = true;
    }
    setRender((prevState)=>!prevState);
    console.log(doneTodo)
 }

  const handleMoveToNewfromDone = (id) => {

    let lengthMinusOne = newTodo.length - 1;
    let movingToNewItem = doneTodo.filter((item)=>{
      return item.id === id;
    })
    
    if(lengthMinusOne === -1){
      newTodo.push({
        todoTitle : movingToNewItem[0].todoTitle,
        todoDesc : movingToNewItem[0].todoDesc,
        id : 1
      });
    }else{
      newTodo.push({
        todoTitle : movingToNewItem[0].todoTitle,
        todoDesc : movingToNewItem[0].todoDesc,
        id : newTodo[lengthMinusOne].id + 1
      });
    }
    setRender((prevState)=>!prevState)
    

    let remainingDoneTodo = doneTodo.filter((item)=>{
      return item.id!==id;
    })
    setDoneTodo(remainingDoneTodo);

  }
  const handleMoveToOnGoingfromDone = (id) => {
    let lengthMinusOne = onGoingTodo.length - 1;
    let movingToOnGoingItem = doneTodo.filter((item)=>{
      return item.id === id;
    })
    
    if(lengthMinusOne === -1){
      onGoingTodo.push({
        todoTitle : movingToOnGoingItem[0].todoTitle,
        todoDesc : movingToOnGoingItem[0].todoDesc,
        id : 1
      });
    }else{
      onGoingTodo.push({
        todoTitle : movingToOnGoingItem[0].todoTitle,
        todoDesc : movingToOnGoingItem[0].todoDesc,
        id : onGoingTodo[lengthMinusOne].id + 1
      });
    }
    setRender((prevState)=>!prevState)
    

    let remainingDoneTodo = doneTodo.filter((item)=>{
      return item.id!==id;
    })
    setDoneTodo(remainingDoneTodo);
  }

  const handleDateChange = (e, id) => {
    console.log(id)
    setDate(e.target.value)
    console.log(e.target.value)
  }

  useEffect(()=>{
    /* let timer = setInterval(()=>{
      setDateAndTime(new Date());
    },1000)
    console.log(timer)
    console.log(dateAndTime) */
    console.log(date);
    console.log(new Date);
    console.log(new Date(date))
    if(new Date() > new Date(date)){
      setExpire(true);
    }else{
      setExpire(false);
    }
  })
  

  return (
    <div className="App">
       <div className="newParent">
          <h3>New</h3>
          {newTodo.map((item)=>{
            return(
              <div className='newTodo' key={Math.random()} onContextMenu={(e)=> handleNewContextMenu(e, item.id)}>
                  <h5>{item.todoTitle}</h5>
                  <p>{item.todoDesc}</p>
                  {item.rightClick && <div className="movingOptionsParent">
                       <li className="movingOption" onClick={()=>handleMoveToOngoingfromNew(item.id)}>Move to Ongoing</li>
                       <li className="movingOption" onClick={()=>handleMoveToDonefromNew(item.id)}>Move to Done</li>
                  </div>}
             </div>
            )
          })}
          {showAddBtn && <button onClick={handleShowForm}>Add a Todo</button>}
          {showForm &&  <form onSubmit={handleSubmit}>
              <div>
                <label>Todo Title : </label>
                <input type='text' required onChange={handleTitle}/>
              </div>
              <div>
                <label>Todo Description : </label>
                <input type='text' required onChange={handleDesc}/>
              </div>
              <span onClick={handleCancel}>Cancel</span>
              <button type='submit'>Save Todo</button>
          </form>}
       </div>

       <div className='onGoingParent'>
          <h3>Ongoing</h3>
          {onGoingTodo.map((item)=>{
            return(
              <div className='onGoingTodo' key={Math.random()} onContextMenu={(e)=> handleOngoingContextMenu(e, item.id)}>
                  <h5>{item.todoTitle}</h5>
                  <p>{item.todoDesc}</p>
                  <p>End Time : <input type="datetime-local" onChange={(e)=>handleDateChange(e, item.id)} value={date}/></p>
                  {expire && <p className="expireMsg">Overdue</p>}
                  {item.rightClick && <div className="movingOptionsParent">
                       <li className="movingOption" onClick={()=>handleMoveToNewfromOngoing(item.id)}>Move to New</li>
                       <li className="movingOption" onClick={()=>handleMoveToDonefromOngoing(item.id)}>Move to Done</li>
                  </div>}
             </div>
            )
          })}
       </div>

       <div className='doneParent'>
          <h3>Done</h3>
          {doneTodo.map((item)=>{
            return(
              <div className='doneTodo' key={Math.random()} onContextMenu={(e)=> handleDoneContextMenu(e, item.id)}>
                  <h5>{item.todoTitle}</h5>
                  <p>{item.todoDesc}</p>
                  {item.rightClick && <div className="movingOptionsParent">
                       <li className="movingOption" onClick={()=>handleMoveToNewfromDone(item.id)}>Move to New</li>
                       <li className="movingOption" onClick={()=>handleMoveToOnGoingfromDone(item.id)}>Move to Ongoing</li>
                  </div>}
             </div>
            )
          })}
       </div>
    </div>
  );
}

export default App;
