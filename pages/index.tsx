import React, {useState, useEffect, useContext} from 'react';
import { MdVerified } from "react-icons/md";
import { RiSendPlaneFill, RiCloseLine } from "react-icons/ri";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import Image from 'next/image';
// import {MdVerified} from 

//INTERNAL IMPORT
import { ToDoListContext } from "../context/ToDoListApp";
import Style from "../styles/index.module.css";
import Data from "../components/Data";
import Loading from "../loading.gif";

const Home = () => {
  const [message, setMessage] = useState('')  

  const {
    checkIfWalletIsConnect, 
                    connectWallet, 
                    toDoList, 
                    getToDoList, 
                    change,
                    currentAccount,
                    error,
                    allToDoList,
                    myList,
                    allAddress,
   } = useContext(ToDoListContext);

   console.log(myList);
   console.log(error);

  useEffect(() => {
    checkIfWalletIsConnect();
    getToDoList();
  }, [])
  return (
    <div className={Style.home}>
      <div className={Style.navBar}>
        <Image src={Loading} alt="Logo" width={50} height={50}/>
        <div className={Style.connect}>
          {!currentAccount ? (
            <button onClick={()=> connectWallet()}>Connect wallet</button>
          ) : (
            <button> {currentAccount.slice(0, 20)}...</button>
          )}
        </div>
      </div>
      <div className={Style.home_box}>
          <div className={Style.home_completed}>
            <h2>ToDo History List</h2>
            <div>
              {myList.map((el: any, i: any)=> (
                <div className={Style.home_completed_list}>
                  <MdVerified className={Style.iconColor}></MdVerified>
                  <p>{el.slice(0, 30)}..</p>
                </div>
              ))
              }
            </div>
          </div>
          <div className={Style.home_create}>
            <div className={Style.home_create_box}>
              <h2>Create Blockchain ToDoList</h2>
              <div className={Style.home_create_input}>
                <input type='Text' placeholder="Ether your todo" onChange={(e) => setMessage(e.target.value)}/>

                {currentAccount ? (
                  <button onClick={() => toDoList(message)}>
                    <RiSendPlaneFill className={Style.iconBlak}/>
                  </button>                  
                ) : (
                  <button onClick={() => connectWallet()}>
                    <RiSendPlaneFill className={Style.iconBlak}/>
                  </button>                  
                )}
              </div>
              {/* <Data
                allToDoList={allToDoList}
                allAddress={allAddress}
                myList={myList}
              /> */}
            </div>
          </div>
      </div>
    </div>
  )
}

export default Home