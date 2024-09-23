import styles from "./styles.module.css"
import {json, Link}  from 'react-router-dom'
import { useState } from "react"
import { useEffect } from "react"
import axios, {Axios} from 'axios'

export default function Login() {
    const [username , setusername] = useState("")
    const [userpassword, setuserpassword] = useState("")

    const loginfuntion = ()=>{
        // let  userlogin ;
        // let password ;
         data = axios.post("http://localhost:8000/userlogin/",{
            username: username,
            password: userpassword
        },{
            headers:{
                "Content-Type":"application/json"
            }
        }).then(()=>{
            // data =JSON.parse(upload)
            htrial = JSON.stringify(data)
            console.log(htrial);
            console.log('Testing');
            
            
        }).catch((err)=>{
            console.log(err);
            
        })
    }
    return <div> 

        <div className={styles.header} >
            <h1>M-shop</h1>
            {/* <p>Your online one stop shop</p> */}
        </div>


        


        <p className={styles.bordertesting} >Log into your account </p>
        <form >
            <fieldset className={styles.fieldset} >
                <div className={styles.inputdiv} >
                    <input className={styles.forminputs} type="text" name="username" id="username" placeholder="Enter username" onChange={(e)=>setusername(e.target.value)}  />
                    <br />
                    <br />
                    <input className={styles.forminputs} type="password" name="userpassword" id="userpassword" placeholder="Enter password" onChange={(e)=>setuserpassword(e.target.value)} />
                    <br />
                    <br />
                </div>
               <div className={styles.btndiv} >
                    <button onClick={loginfuntion} className={styles.submitbutton} >Log in</button>
                    <br />
                    <br />
                    <br />
               </div>

               <div className={styles.footerdiv} >
                  <p className={styles.footerdivtxt} >Have no account ? <Link className={styles.link} to={'/signup'} >Sign up</Link> </p>
               </div>
               
            </fieldset>
        </form>
    </div>
}