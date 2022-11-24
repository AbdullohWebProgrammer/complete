import React, {useState, useEffect} from 'react';
import Web3Modal from "web3modal";
import { ethers } from "ethers";

//INTERNAL Import

import {toDoListAddress, toDoListABI} from './constants';

    export const ToDoListContext = React.createContext();

    export const ToDoListProvider = ({children}) => {
        const [currentAccount, setCurrentAccount] = useState('');
        const [error, setError] = useState("no error");
        const [allToDoList, setAllToDoList] = useState([]);
        const [myList, setMyList] = useState([]);
        
        const [allAddress, setAllAddress] = useState([]);

        //--------CONNECTING METAMASK
        const checkIfWalletIsConnect = async () => {
            if(!ethereum) return setError("please install metamask")

            const account = await ethereum.request({method: "eth_accounts"})

            if(account.length) {
                setCurrentAccount(account[0]);
            } else {
                setError("Please Install Metamask & connect, reload")
            }
        }

        //--------CONNECT WALLET
        const connectWallet = async () => {
            if(!ethereum) return setError("please install metamask");

            const account = await ethereum.request({method: "eth_requestAccounts"});

            setCurrentAccount(account[0]);
        }

        // INTERACTING WITH SMART CONTRACT
        const toDoList = async (message) => {            
            try {
                // CONNECTING WITH SMART CONTRACT
                const web3modal = new Web3Modal();
                const connection = await web3modal.connect();
                const provider = new ethers.providers.Web3Provider(connection);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(toDoListAddress, toDoListABI, signer);
                const createList = await contract.createList(message);
                createList.wait();
                console.log(createList);
            } catch (error) {
                setError("Something is wrong with creating list");
            }
        }

        const getToDoList = async () => {            
            try {
                // CONNECTING WITH SMART CONTRACT
                const web3modal = new Web3Modal();
                const connection = await web3modal.connect();
                const provider = new ethers.providers.Web3Provider(connection);
                const signer = provider.getSigner();                
                const contract = new ethers.Contract(toDoListAddress, toDoListABI, signer);
                
                // GET DATA 
                const getAllAddress = await contract.getAddress();
                setAllAddress(getAllAddress);

                getAllAddress.map(async (el) => {
                    const getSingleData = await contract.getCreatorData(el);                 
                    allToDoList.push(getToDoList);
                    console.log(getSingleData);
                });
                setMyList(await contract.getMessage())                
            } catch (err) {
                console.log(err);
                setError("Something is wrong with getting data");
            }
        }

        // CHANGE STATE OF TODOLIST TO FALSE TO TRUE
        const change = async (address) => {
            try {
                // CONNECTING WITH SMART CONTRACT
                const web3modal = new Web3Modal();
                const connection = await web3modal.connect();
                const provider = new ethers.providers.Web3Provider(connection);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(toDoListAddress, toDoListABI, signer);
                const state = await contract.toggle(address);
                state.wait();
                console.log(state);
            } catch(error) {
                setError("Something is wrong with changing status");
            }
        }

        // useEffect(() => {
        //     checkIfWalletIsConnect();
        // })

        return(
            <ToDoListContext.Provider value={{
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
                }}
            >
                {children}
            </ToDoListContext.Provider>
        )
    }

const ToDoListApp = () => {
    return (
        <div>ToDoListApp</div>
    )
}

export default ToDoListApp;