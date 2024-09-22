import styles from "./styles.module.css"

export default function Login() {
    return <div>
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
               </div>
               
            </fieldset>
        </form>
    </div>
}