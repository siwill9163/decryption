import React, { useState } from 'react'
import './App.css'
import CryptoJS from "crypto-js";

const SECRET_PASS = "XkhZG4fW2t2W"

const App = () => {

const [screen, setScreen] = useState("encrypt");
const [text, setText] = useState("");
const [errorMessage, setErrorMessage] = useState("");

const [encryptedData, setEncyptedData] = useState("");

const [decryptedData, setDecryptedData] = useState("");



const switchScreen = (type) => {
  setScreen(type);
};

const encryptData = () => {
  try {
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      SECRET_PASS
    ).toString();
    setEncyptedData(data);
    setErrorMessage("");    
  } catch (error){
    setErrorMessage("failed")
  }
};

const decryptData = () => {
  try {
    const bytes = CryptoJS.AES.decrypt(text, SECRET_PASS);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    setDecryptedData(data);
    setErrorMessage("");
  }catch(error){
    setErrorMessage("Decryption failed")
  }
}


const handleClick = () => {

  if (!text){
    setErrorMessage("Please enter some text");
    return;
  }

  if (screen === "encrypt"){
    encryptData();
  } else {
    decryptData();
  }
}

  return (
    <div className='container'>
      <h1>Choose Encrypt or Decrypt</h1>
     
      <div>
        <button className={`btn btn-left ${screen === "encrypt" ? "active" : ""}`}
        onClick={()=>{switchScreen("encrypt")

        }}>
          Encrypt message
        </button>

        <button className={`btn btn-right ${screen === "decrypt" ? "active" : ""}`}
        onClick={()=>{switchScreen("decrypt")

        }}>
          Decrypt message
        </button>

      </div>

      <div className="card">
        <textarea
          value={text}
          onChange={({target}) => setText(target.value)}
          placeholder={screen === "encrypt" ? "TYPE A MESSAGE TO ENCRYPT" : "PASTE YOUR ENCRYTED MESSAGE HERE."

          }
        />
      
        {errorMessage && <div className='error'> {errorMessage}</div>}

      <button className={`btn submit-btn ${
        screen === "encrypt" ? "encrypt-btn" : "decrypt-btn"
      }`}
      onClick={handleClick}
      >
        {screen === "encrypt" ? "ENCRYPT YOUR MESSAGE" : "DECRYPT A MESSAGE"}
      
      </button>
    </div>
    {encryptData || decryptData ? (
      <div className="content">
        <label>{screen === "encrypt" ? "ENCRYPTED" : "Decrypted"} DATA WILL SHOW BELOW...</label>
        <p>{screen === "encrypt" ? encryptedData : decryptedData}</p>
      </div>
    ) : null}
    </div>
  )
}

export default App
