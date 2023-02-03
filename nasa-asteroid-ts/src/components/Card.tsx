import React, { ChangeEvent, useEffect, useState } from 'react'
import './Card.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
const Card = ():JSX.Element => {
    const [id, setId] = useState<any>();
    const [name, setName] = useState<String>('');
    const [size, setSize] = useState<any>();
    const [url, setUrl] = useState<String>('');
    const [search,setSearch] = useState<any>();
    const [hazard, setHazard] = useState<any>();
    const idList = [200043, 2000719, 2000887, 2001036, 2001221, 2001566, 2001580,2001915,2001916,2001917,2001943,2001980, 2001620, 2001627, 2001685, 2001862, 2001863, 2001864, 2001865, 2001866];
    useEffect(() => {
        async function getData(){
            const resultSet = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${search}?api_key=5GvLkv989wwuv06Ix8G1hoGKQstfKP9pWvrLDd6B`);
            setId(resultSet.data.id);  
            setSize(resultSet.data.estimated_diameter.meters.estimated_diameter_max);
            setName(resultSet.data.name);
            setUrl(resultSet.data.nasa_jpl_url);
            setHazard(resultSet.data.is_potentially_hazardous_asteroid);
        }
        getData();
    },[search])
    const findAsteroid = () => {
        if (id !== 0) setSearch(id);
    }
    const searchData = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setId(e.target.value);
    }
    const selectRandom = () => {
        let random = idList[Math.floor(Math.random() * idList.length)]
        setSearch(random);
    }
  return (
      <div>
          <div className='search-data'>
              <input type="text" placeholder='Enter Asteroid ID' onChange={searchData}
              className="form-control rounded" aria-label="Search" aria-describedby="search-addon"/>
              <div>
                  <button onClick={selectRandom} className="btn btn-primary">Random Asteroid</button>
              </div>
              <div>
                  <button onClick={findAsteroid} className="btn btn-primary" disabled={id?.toString().length<=1}>Submit</button>
              </div>
          </div>
          <div className='display-data'>
              <div className='about'><h6>About Asteroid</h6></div>
              <h5 className='id'>ID: </h5>{id}
              <h5 className='name'>Name: </h5>{name}
              <h5 className='size'>Size: </h5>{size}
              <h5 className='url'>NASA JPL URL: </h5>{url}
              <h5 className='hazard'>Is Potentially Hazardous: </h5>{hazard.toString().charAt(0).toUpperCase()+hazard.toString().slice(1)}
          </div>
    </div>
  )
}

export default Card