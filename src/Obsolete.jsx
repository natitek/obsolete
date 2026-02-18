import {useState} from 'react'
import "./obsolete.css"

export default function Obsolete(){

    const [query, setQuery] = useState("")
    const [showSuggestion, setShowSuggestion] = useState(false)

    const handleChange = (e) => {
        const value = e.target.value;

        if(value.length > 0){
            setShowSuggestion(true);
        }
        else{
            setShowSuggestion(false)
        }
    }
    return(
        <div className="main">
            <div className="header">
               <h2>Obsolete</h2>
            </div>
            <h2 id="tagline">Will You Be Obsolete By 2050</h2>
            <div className="job">
                <input onChange={(e)=>{
                  
               
                    
                }} type="search" name="" id="" />
                
            </div>
        </div>
    )
}