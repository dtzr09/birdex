import { Link } from 'react-router-dom';
import { Card, Container, Image} from "semantic-ui-react";
import './SpeciesSearchStyle.css'

function SpeciesSearch({results}) {

  
    return (
      <div>
        <Container className="card--container--search">
          {results.map(result => 
          <Card 
            className="CardStyle--search" 
            key={result.id}
            as={Link}
            to={`/species/${result.name}`}
            >
            <Image 
                className="CardStyle__img--search"
                src={result.img}/>
            <Card.Content className="CardStyle--content--search">
                <Card.Header>{result.name}</Card.Header>
            </Card.Content>
          </Card>
        )}
        </Container>
      </div>
    )
}

export default SpeciesSearch