import React from "react"
import styles from './styles.module.css'
import { Link} from 'react-router-dom'
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { useEffect } from "react"
import { useState } from "react"
import Moredetails from "./Moredetails"
import { useNavigate } from "react-router-dom"
// import styles from "./styles.module.css"




export default function Home(){

    const [products , setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const navigateto = useNavigate()
    function  Moredetailshandler(item) {
        navigateto("/moredetails" , {
            state:{ 
                product_name:item.fields.product_name,
                product_price: item.fields.product_price ,
                product_dicount:item.fields.product_dicount,
                final_price:item.fields.final_price,
                product_quanity:item.fields.product_quanity,
                product_image:item.fields.product_image,
             },
        } )
    }
    

    function addtocarthandler() {
        alert("Sign up or login to add items to cart")
    }
 
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
               <Link title="login" className={styles.linkbtn} to={"/login"} >Log in </Link> 
               <Link  title="signup" className={styles.linkbtn} to={"/signup"} >Sign up</Link>
                <Link title="Cart" className={styles.linkbtn} to={"/cart"} > <FontAwesomeIcon icon={faCartShopping} /> </Link>
            </div>
        </div>

        <div className={styles.middlebar} >
           {
            loading ? <p>Items loading</p> : products.map((item)=> <div className={styles.itemcontainer} key={item.fields.product_name} > 
            <img className={styles.itemimage} src={`http://127.0.0.1:8000/media/${item.fields.product_image}`} alt={item.fields.product_name} />
             <p className={styles.containertxt}  ><strong>{item.fields.product_name}</strong> </p> 
             <p className={styles.containertxt} ><strong>Price:</strong>{item.fields.product_price}</p>
             <div className={styles.bottombtndiv} >
              <button onClick={addtocarthandler} className={styles.addtocartbtn} ><FontAwesomeIcon icon={faCartShopping} /></button>
              <button className={styles.addtocartbtn} onClick={()=>Moredetailshandler(item)} >See more</button>
             </div>
            
             </div> )
           }
        </div>
    </div>
}