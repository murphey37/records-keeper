import { axios } from "axios";
import { useEffect, useState } from "react";
import "./AutoPop.css"

export const AutoPopInput = () => {
    const [artists, setArtists] = useState([])
    const [text, setText] = useState('')
    const [suggestions, setSuggestions] = useState([])
    
    useEffect(() => {
        const loadArtists = async () => {
            const response = await axios.get(`https://api.discogs.com/database/search?q=${text}&type=artist&key=QOweiokWJRqHZcvyjksT&secret=dexKOwgmxPLTUVszUftstFAJHHOZvHHy`)// determine how to query this properly. Needs to include my consumer key: QOweiokWJRqHZcvyjksT  , and consumer secret :dexKOwgmxPLTUVszUftstFAJHHOZvHHy
            setArtists(response.data.data) //make sure that this mathces the fields I'm querying at Discogs
        }
        loadArtists()

    }, [])
    const onSuggestHandler = (text)=>{
        setText(text)
        setSuggestions([])
    }
    const onChangeHandler = (text)=>{   // watching for input to form field 
        let matches = []
        if (text.length>0) {
            matches = artists.filter(artist=>{
                const regex = new RegExp(`${text}`, "gi") //"gi" implies case-insensitive input
                return artist.name.match                    //returning Artist Object > .name property > matching to ${text}
            })
        }
        console.log('matches', matches)
        setSuggestions(matches)
        setText(text)
    }
    return ( 
        <div className="input">
            <input type="text" className="col-md-12 input" style={{}}
            onChange={e => onChangeHandler(e.target.value)}
            value={text}
            onBlur={()=>{
                setTimeout(() => {
                    setSuggestions([])
                }, 100)
            }}
            />
            {suggestions && suggestions.map((suggestion, i) => 
            <div key={i} className="col-md-12 justify-content-md-center"
            onClick={()=>onSuggestHandler(suggestion.name)}
            >{suggestion.name}</div>
            )}
        </div>
    )
}