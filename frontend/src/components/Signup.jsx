import styles from './styles.module.css'
import { Link}  from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"



export default function Signup() {
    const [useremail,setuseremail] = useState("")
    const [username,setusername] =   useState("")
    const [userpassword , setuserpassword ] = useState("")
    const [cuserpassword , setcuserpassword] = useState("")
    const [isauth , setisauth] = useState(false)
    const navigateto = useNavigate();



    function handlesubmit(e) {
        e.preventDefault()
    }

   


   
    const signupfuntion = async ()=>{
            if (userpassword==cuserpassword) {
                try {
                    const response =  await axios.post('http://localhost:8000/createuser/',{
                        "username":username,
                        "useremail":useremail,
                        "userpassword":userpassword
                     } ,{
                         headers:{
                             "Content-Type":"application/json"
                         },
                         withCredentials:true
     
                     } )
                       console.log(response.data);
                       setisauth(true)
                       
                       navigateto("/landingpage", {
                         state:{
                             USERNAME:response.data.username,
                             USEREMAIL:response.data.useremail
                         }
                       } ) 
                } catch{
                    console.error("Error fetching data:");
                    setisauth(false)
                }
            }else{
                alert("Passwords not equal")
            }
        


         
    }
    return <div>
        <div className={styles.header} >
            <h3>M-shop</h3>
            {/* <p>Your online one stop shop</p> */}
        </div>


        


        <p className={styles.bordertesting} >Create an account </p>
        <form typeof='submit' onSubmit={handlesubmit} >
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
                    <button onClick={signupfuntion}  className={styles.submitbutton} >Sign up</button>
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