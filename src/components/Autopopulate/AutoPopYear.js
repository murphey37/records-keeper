import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import  axios  from "axios";


export const AutoPopYear = ({artist}) => {
  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  // handle input change event
  const handleInputChange = value => {
    setValue(value);
  };

  // handle selection
  const handleChange = value => {
    setSelectedValue(value);
  }

  // load options using API call
  const loadOptions = (inputValue) => {
    
    return axios.get(`https://api.discogs.com/database/search?q=${inputValue}&type=master&artist=${artist.title}&year=${artist.title.year}&key=QOweiokWJRqHZcvyjksT&secret=dexKOwgmxPLTUVszUftstFAJHHOZvHHy`)
    .then(resultStuff);
}; //https://api.discogs.com/database/search?q=Sky&type=release&artist=wilco&key=QOweiokWJRqHZcvyjksT&secret=dexKOwgmxPLTUVszUftstFAJHHOZvHHy

const resultStuff = (res) => {
    console.log(res)

   
    return res.data.results
}


  return (
    <div className="App">
    
      <pre>Select Album Name: {inputValue}</pre>
      <AsyncSelect
        // cacheOptions
        // defaultOptions
        value={selectedValue}
        getOptionLabel={e => e.title}
        getOptionValue={e => e.id}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
      {/* <pre>Selected Value: {JSON.stringify(selectedValue || {}, null, 2)}</pre> */}
    </div>
  );
}

