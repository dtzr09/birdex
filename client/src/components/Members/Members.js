import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Container, Image } from 'semantic-ui-react'
import './MembersStyle.css'

function Members(id) {

  //SERVER SIDE TO GET ALL MEMBERS OF THE SINGLE SPECIES
  const [allmembers, setallmembers] = useState([]);
  const getmembers = async() => {
    try {
      const response = await fetch(`/species/${id.name}`)
      const jsonData = await response.json();
      
      setallmembers(jsonData);

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getmembers();
  }, []);

  const members = [...new Set(allmembers.map(birds => birds))]

  //MUST INCLUDE RETURN IF NOT NTH WILL BE SHOWN
  const data = members.map((bird) => {
    return (
      <Card 
        className="Card--birdStyle" 
        key={bird.birdsid}
        as={Link}
        to={`/birds/${bird.birdsname}/${bird.birdsid}`}
        >
        <div className="img--wrapper">
          <Image 
              className="bird__img"
              src={bird.birdsimg}/>
        </div>
        <Card.Content >
            <Card.Header style={{color:'white'}}>{bird.birdsname}</Card.Header>
        </Card.Content>
      </Card>
    )
  })

  return (
    <div className="members__wrapper">
      <h2 className="container__title">Members</h2>
      <Container className="birdStyleContainer">
        {data}
      </Container>
    </div>
  )
  
}

export default Members
