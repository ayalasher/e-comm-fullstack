import styles from './styles.module.css'
import {Link}  from 'react-router-dom'
export default function Signup() {
    return <div>
        <div className={styles.header} >
            <h1>M-shop</h1>
            {/* <p>Your online one stop shop</p> */}
        </div>


        


        <p className={styles.bordertesting} >Create an account </p>
        <form >
            <fieldset className={styles.fieldset} >
                <div className={styles.inputdiv} >
                    <input className={styles.forminputs} type="email" name="useremail" id="useremail" placeholder="Set email"  />
                    <br />
                    <br />
                    <input className={styles.forminputs} type="text" name='username'  id='username' placeholder='create username' />
                    <br />
                    <br />
                    <input className={styles.forminputs} type="password" name="userpassword" id="userpassword" placeholder="Enter password" />
                    <br />
                    <br />
                    <input className={styles.forminputs} type="password" name="cuserpassword" id="cuserpassword" placeholder="Confirm password" />
                    <br />
                    <br />
                </div>
               <div className={styles.btndiv} >
                    <button className={styles.submitbutton} >Sign up</button>
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