import { useEffect, useState , useRef} from 'react'


function App() {
  const [password, setPassword] = useState('');
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charsAllowed, setCharsAllowed] = useState(false);
    const [length, setLength] = useState(8);

    const passwordRef = useRef(null);
    function handleLengthChange(e) {
      setLength(parseInt(e.target.value));
    }

    function copyToClipboard() {
        passwordRef.current?.select();
        try {
            window.navigator.clipboard.writeText(password);
        } catch (error) {
            console.error("Failed to copy password:", error);
        }
    }
    

    useEffect(()=> {
       let pass ="";
       let str = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
       if(charsAllowed) {
         str += "!@#$%^&*()_+-=[]{}|\:;<>.?/";
       }
       if(numberAllowed) {
        str += "123456789";
       } 

       for(let i = 0 ; i < length ; i++) {
          let ch = Math.floor(Math.random()*str.length);
          pass = pass + str[ch]; 
         }
        setPassword(pass);
       

    } , [length , charsAllowed , numberAllowed])
    return (
        <div className="main-container">
            <h1>Password Generator</h1>
            <div className="password-container">
                <input type="text" value={password} id="password" readOnly ref={passwordRef}/>
                <button onClick = {copyToClipboard}>copy</button>
            </div>
            <label htmlFor="length">Length : {length}</label>
         <input type="range" value={length} min="8" max= "32" onChange={handleLengthChange} id="length"></input>
         <div className = "Bottom-div">
         <label htmlFor="number">Number</label>
         <input type="checkbox" value = "numberallowed" id ="number" name = "allowed" onChange = {()=> {
            setNumberAllowed(prev => !prev) ;
         }} />
         <label htmlFor="number">character</label>
         <input type="checkbox" value = "characterAllowed" id ="number" name = "allowed"onChange = {()=> {
            setCharsAllowed(prev => !prev) ;
         }} />
         </div>
        </div>
        
    )
}

export default App
