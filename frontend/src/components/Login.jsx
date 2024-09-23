import styles from "./styles.module.css"
import {Link}  from 'react-router-dom'

export default function Login() {
    return <div>

        <div className={styles.header} >
            <h1>M-shop</h1>
            {/* <p>Your online one stop shop</p> */}
        </div>


        


        <p className={styles.bordertesting} >Log into your account </p>
        <form >
            <fieldset className={styles.fieldset} >
                <div className={styles.inputdiv} >
                    <input className={styles.forminputs} type="text" name="useremail" id="useremail" placeholder="Enter email"  />
                    <br />
                    <br />
                    <input className={styles.forminputs} type="password" name="userpassword" id="userpassword" placeholder="Enter password" />
                    <br />
                    <br />
                </div>
               <div className={styles.btndiv} >
                    <button className={styles.submitbutton} >Log in</button>
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