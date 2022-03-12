import React, { useEffect, useState } from "react";
import { Card, Container, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./SpeciesContainerStyle.css";

function SpeciesContainer() {
  //SERVER SIDE
  const [allspecies, setallSpecies] = useState([]);

  const getSpecies = async () => {
    try {
      const response = await fetch("/species");
      console.log(response);
      const jsonData = await response.json();

      setallSpecies(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getSpecies();
  }, []);

  const data = allspecies.map((family) => {
    return (
      <Card
        className="CardStyle"
        key={family.id}
        as={Link}
        to={`/species/${family.name}`}
      >
        <div className="image--wrapper">
          <Image className="CardStyle__img" src={family.img} />
        </div>
        <Card.Content className="CardStyle--content">
          <Card.Header>{family.name}</Card.Header>
        </Card.Content>
      </Card>
    );
  });

  return (
    <div className="TotalContainer">
      <Container className="card--container">{data}</Container>
    </div>
  );
}

export default SpeciesContainer;
