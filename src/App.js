import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import './App.css';

function App() {
  const [newTodo, setNewTodo] = useState([]);
  const [onGoingTodo, setOnGoingTodo] = useState([]);
  const [doneTodo, setDoneTodo] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showAddBtn, setShowAddtn] = useState(true);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');;
  const [, setRender] = useState(false);
  const [dateAndTime, setDateAndTime] = useState(new Date())
    
  useEffect(()=>{
    let timer = setInterval(()=>{
       setDateAndTime(new Date());
    },1000)
    return ()=>clearInterval(timer);
  },[])

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
        newTodo.unshift({
            todoTitle : title,
            todoDesc : desc,
            id : uuid(),
          })
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
        
  }

  const handleMoveToOngoingfromNew = (id) => {
        let movingToOngoingItem = newTodo.filter((item)=>{
          return item.id === id;
        })
        onGoingTodo.push({
            todoTitle : movingToOngoingItem[0].todoTitle,
            todoDesc : movingToOngoingItem[0].todoDesc,
            id : uuid(),
          });
        
        setRender((prevState)=>!prevState)

        let remainingNewTodo = newTodo.filter((item)=>{
          return item.id!==id;
        })
        setNewTodo(remainingNewTodo);

  }

  const handleMoveToDonefromNew = (id) => {
    let movingToDoneItem = newTodo.filter((item)=>{
      return item.id === id;
    })
    doneTodo.push({
      todoTitle : movingToDoneItem[0].todoTitle,
      todoDesc : movingToDoneItem[0].todoDesc,
      id : uuid(),
    });
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
 }

  const handleMoveToNewfromOngoing = (id)=> {
    let movingToNewItem = onGoingTodo.filter((item)=>{
      return item.id === id;
    })
    newTodo.push({
        todoTitle : movingToNewItem[0].todoTitle,
        todoDesc : movingToNewItem[0].todoDesc,
        id : uuid(),
      });
    setRender((prevState)=>!prevState)

    let remainingOnGoingTodo = onGoingTodo.filter((item)=>{
      return item.id!==id;
    })
    setOnGoingTodo(remainingOnGoingTodo);
  }

  const handleMoveToDonefromOngoing = (id)=> {
    let movingToDoneItem = onGoingTodo.filter((item)=>{
      return item.id === id;
    })
    doneTodo.push({
        todoTitle : movingToDoneItem[0].todoTitle,
        todoDesc : movingToDoneItem[0].todoDesc,
        id : uuid(),
      });
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
 }

  const handleMoveToNewfromDone = (id) => {
    let movingToNewItem = doneTodo.filter((item)=>{
      return item.id === id;
    })
    newTodo.push({
        todoTitle : movingToNewItem[0].todoTitle,
        todoDesc : movingToNewItem[0].todoDesc,
        id : uuid(),
      });

    setRender((prevState)=>!prevState)

    let remainingDoneTodo = doneTodo.filter((item)=>{
      return item.id!==id;
    })
    setDoneTodo(remainingDoneTodo);

  }
  const handleMoveToOnGoingfromDone = (id) => {
    let movingToOnGoingItem = doneTodo.filter((item)=>{
      return item.id === id;
    })
    
    onGoingTodo.push({
        todoTitle : movingToOnGoingItem[0].todoTitle,
        todoDesc : movingToOnGoingItem[0].todoDesc,
        id : uuid(),
      });
    
    setRender((prevState)=>!prevState)
  
    let remainingDoneTodo = doneTodo.filter((item)=>{
      return item.id!==id;
    })
    setDoneTodo(remainingDoneTodo);
  }

  const handleDateChange = (e, id) => {
    setRender((prevState)=>!prevState);
    const selectedTodo = onGoingTodo.filter((item)=>{
      return item.id === id;
    })
    selectedTodo[0].dateSelected = e.target.value;
  }

  return (
    <div className="AppParent">
       <h1>Todo List Application</h1>
       <div className="App">
        <div className="newParent">
            <h2>New Todo</h2>
            {newTodo.map((item)=>{
              return(
                <div className='newTodo' key={item.id} onContextMenu={(e)=> handleNewContextMenu(e, item.id)}>
                    <h4>Title : {item.todoTitle}</h4>
                    <p>Description : {item.todoDesc}</p>
                    {item.rightClick && <div className="movingOptionsParent">
                        <li className="movingOption" onClick={()=>handleMoveToOngoingfromNew(item.id)}>Move to Ongoing</li>
                        <li className="movingOption" onClick={()=>handleMoveToDonefromNew(item.id)}>Move to Done</li>
                    </div>}
              </div>
              )
            })}
            {showAddBtn && <button onClick={handleShowForm} className="addBtn">Add a Todo</button>}
            {showForm &&  <form onSubmit={handleSubmit}>
                <div className="formContent">
                    <div className="title">
                      <label>Todo Title : </label>
                      <input type='text' required onChange={handleTitle} placeholder='Type Todo Title'/>
                    </div>
                    <div className='desc'>
                      <label>Todo Desc. : </label>
                      <input type='text' required onChange={handleDesc} placeholder='Type Todo Description'/>
                    </div>
                    <div className="cancelSaveContainer">
                      <span onClick={handleCancel} className="cancelAdd">Cancel</span>
                      <button type='submit' className="saveBtn">Save Todo</button>
                    </div>
                </div>
            </form>}
        </div>

        <div className='onGoingParent'>
            <h2>Ongoing Todo</h2>
            {onGoingTodo.map((item)=>{
              return(
                <div className='onGoingTodo' key={item.id} onContextMenu={(e)=> handleOngoingContextMenu(e, item.id)}>
                    <h4>Title : {item.todoTitle}</h4>
                    <p>Description : {item.todoDesc}</p>
                    <p>End Time : <input type="datetime-local" onChange={(e)=>handleDateChange(e, item.id)} value={item.dateSelected?item.dateSelected:''}/></p>
                    {dateAndTime > new Date(item.dateSelected) && item.dateSelected && <p className="expireMsg">Overdue</p>}
                    {item.rightClick && <div className="movingOptionsParent">
                        <li className="movingOption" onClick={()=>handleMoveToNewfromOngoing(item.id)}>Move to New</li>
                        <li className="movingOption" onClick={()=>handleMoveToDonefromOngoing(item.id)}>Move to Done</li>
                    </div>}
              </div>
              )
            })}
        </div>

        <div className='doneParent'>
            <h2>Done Todo</h2>
            {doneTodo.map((item)=>{
              return(
                <div className='doneTodo' key={item.id} onContextMenu={(e)=> handleDoneContextMenu(e, item.id)}>
                    <h4>Title : {item.todoTitle}</h4>
                    <p>Description : {item.todoDesc}</p>
                    {item.rightClick && <div className="movingOptionsParent">
                        <li className="movingOption" onClick={()=>handleMoveToNewfromDone(item.id)}>Move to New</li>
                        <li className="movingOption" onClick={()=>handleMoveToOnGoingfromDone(item.id)}>Move to Ongoing</li>
                    </div>}
              </div>
              )
            })}
        </div>   
      </div>
    </div>
  );
}

export default App;
