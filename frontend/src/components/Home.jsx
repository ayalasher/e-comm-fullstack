import React from "react"
import styles from './styles.module.css'
import { Link} from 'react-router-dom'
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { useEffect } from "react"
import { useState } from "react"
// import styles from "./styles.module.css"



export default function Home(){

    const [products , setProducts] = useState([])
    const [loading, setLoading] = useState(true)
 
    useEffect(()=>{
           axios.get("http://localhost:8000/fetchproducts/").then((response)=>{
          console.log(response.data);
          setProducts(response.data)
          setLoading(false)
       }).catch((err)=>{
           console.log(err);
           setLoading(true)
       })
   },[])
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
           {
            loading ? <p>Items loading</p> : products.map((item)=> <div className={styles.itemcontainer} key={item.fields.product_name} > 
            <img className={styles.itemimage} src={`http://127.0.0.1:8000/media/${item.fields.product_image}`} alt={item.fields.product_name} />
             <p  ><strong>{item.fields.product_name}</strong> </p> 
             <p><strong>Price:</strong>{item.fields.product_price}</p>
             <button className={styles.addtocartbtn} ><FontAwesomeIcon icon={faCartShopping} /></button>
             </div> )
           }
        </div>
    </div>
}