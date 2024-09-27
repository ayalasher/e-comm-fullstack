import React from "react"
import styles from './styles.module.css'
import {Link} from 'react-router-dom'
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { useEffect } from "react"
import { useState } from "react"



export default function Home(){

    const [products , setProducts] = useState([])

    useEffect(()=>{
        let data = axios.get("http://localhost:8000/fetchproducts").then((response)=>{
           console.log(response);
           console.log(data);
           setProducts(data)
           console.log(products);
           
       }).catch((err)=>{
           console.log(err);
           
       })
   },[products])
    return <div>
        <div className={styles.topbar} >
            <div className={styles.header} >
                <h3>M-shop</h3>
            </div>

            <div className={styles.btnsections} >
               <Link className={styles.linkbtn} to={"/login"} >Log in </Link> 
               <Link  className={styles.linkbtn} to={"/signup"} >Sign up</Link>
                <Link  className={styles.linkbtn} to={"/cart"} > <FontAwesomeIcon icon={faCartShopping} /> </Link>
            </div>
        </div>

        <div className={styles.middlebar} >
           
        </div>
    </div>
}