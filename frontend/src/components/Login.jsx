import styles from "./styles.module.css"
import {json, Link}  from 'react-router-dom'
import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"



export default function Login() {
    const [username , setusername] = useState("")
    const [userpassword, setuserpassword] = useState("")
    const [auth , setauth] = useState(false)

    const loginfuntion = async  ()=>{
        await  axios.post("http://localhost:8000/userlogin/",{
            "username":username,
            "userpassword":userpassword,

         }).then((response)=>{    
        console.log(response.data);
        setauth(true)
        console.log("Hello");
        const navigateto = useNavigate()
        navigateto("/landingpage")
        }).catch((err)=>{
            console.log(err);
            console.log("Error fetching data");
            setauth(false)
        }) ; 
    }

    
    

    useEffect(()=>{
        if (auth==true) {
            alert("User logged in ")
        }
    },[])
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