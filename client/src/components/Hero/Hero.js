import React, { useEffect, useState } from "react";
import {
  HeroWrapper,
  BackgroundOverlay,
  HeroContainer,
} from "./HeroStyles";
import SearchBar from "./SearchBar/SearchBar";
import SpeciesSearch from "./SpeciesSearch/SpeciesSearch";
import SpeciesContainer from "./SpeciesContainer/SpeciesContainer";

function Hero() {
  const [allspecies, setallSpecies] = useState([]);

  const getSpecies = async () => {
    try {
      const response = await fetch("/species");
      const jsonData = await response.json();

      setallSpecies(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getSpecies();
  }, []);

  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e);
  };

  const results = allspecies.filter((data) => {
    if (value === "" && value.length > 5) {
      return data;
    } else {
      if (data.name.toLowerCase().includes(value.toLowerCase())) {
        return data;
      }
    }
  });

  return (
    <HeroContainer>
      <HeroWrapper>
        <BackgroundOverlay>
            <SearchBar
              value={value}
              handleChange={(e) => handleChange(e.target.value)}
            />

          {!value ? <SpeciesContainer /> : <SpeciesSearch results={results} />}
        </BackgroundOverlay>
      </HeroWrapper>
    </HeroContainer>
  );
}

export default Hero;
