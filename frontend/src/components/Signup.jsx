import styles from './styles.module.css'
import {Link}  from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
export default function Signup() {
    const [useremail,setuseremail] = useState("")
    const [username,setusername] =   useState("")
    const [userpassword , setuserpassword ] = useState("")
    const [cuserpassword , setcuserpassword] = useState("")


    let dataobject = {
        useremail:useremail,
        username:username,
        userpassword:userpassword
    }

    const signupfuntion = async ()=>{
       if (userpassword==cuserpassword) {
        let newuser = await axios.post('http://localhost:8000/createuser/',dataobject,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then(()=>{
            console.log(newuser);
            
            
        }).catch((err)=>{
            console.log(err);
            
        })
       }const outcome =await newuser.data;
       console.log(outcome);
       
    }
    return <div>
        <div className={styles.header} >
            <h1>M-shop</h1>
            {/* <p>Your online one stop shop</p> */}
        </div>


        


        <p className={styles.bordertesting} >Create an account </p>
        <form >
            <fieldset className={styles.fieldset} >
                <div className={styles.inputdiv} >
                    <input className={styles.forminputs} type="email" name="useremail" id="useremail" placeholder="Set email" onChange={(e)=>setuseremail(e.target.value)}  />
                    <br />
                    <br />
                    <input className={styles.forminputs} type="text" name='username'  id='username' placeholder='create username' onChange={(e)=>setusername(e.target.value)} />
                    <br />
                    <br />
                    <input className={styles.forminputs} type="password" name="userpassword" id="userpassword" placeholder="Enter password" onChange={(e)=>setuserpassword(e.target.value)} />
                    <br />
                    <br />
                    <input className={styles.forminputs} type="password" name="cuserpassword" id="cuserpassword" placeholder="Confirm password" onChange={(e)=>setcuserpassword(e.target.value)} />
                    <br />
                    <br />
                </div>
               <div className={styles.btndiv} >
                    <button onClick={signupfuntion} type='submit' className={styles.submitbutton} >Sign up</button>
                    <br />
                    <br />
               </div>

               <div className={styles.footerdiv} >
                  <p className={styles.footerdivtxt} >Have an account ? <Link className={styles.link} to={'/login'} >Log in</Link> </p>
               </div>
               
            </fieldset>
        </form>
    </div>
}