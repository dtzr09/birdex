import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Nav from "../components/Navbar/Nav";
import * as d3 from "d3";
import {
  SingleBirdPageWrapper,
  SingleBirdContainer,
  SingleBirdWrapper,
  SingleBirdContent,
  SingleBirdName,
  SingleBirdSpecies,
  SingleBirdWeight,
  ImageWrapper,
  SingleBirdImage,
  Backbutton,
  ViewEntries,
  DeleteBird,
  AnalysisContainer,
  VisualContainer,
  StatsContainer,
  StatsWrapper,
  Statsdetail,
  ChartContainer,
  ChartChangeH1Bar,
  ChartChangeH1Line,
} from "./SingleBirdStyle";
import BarChart from "../components/Charts/BarChart";
import LineChart from "../components/Charts/LineChart";

function SingleBird({ match }) {
  const history = useHistory();

  const [Bird, setBird] = useState(""); // One item needed to render the images
  const [details, setdetails] = useState([]); //all items needed to do data analysis

  //FETCHING SINGLE BIRD DATA BASE ON ITS NICKNAME AND UUID
  useEffect(() => {
    const getbird = async () => {
      try {
        const response = await fetch(
          `/birds/${match.params.species}/${match.params.name}/${match.params.birdsid}`
        );
        const jsonData = await response.json();
        setBird(jsonData[0]);
        setdetails(jsonData);
      } catch (err) {
        console.log(err.message);
      }
    };
    getbird();
  }, [match.params.name, match.params.birdsid]);

  // DELETING BIRD (FROM BIRDSDATA AND ENTRIES)
  const deletebird = async () => {
    try {
      const response = await fetch(
        `/birds/${match.params.name}/${match.params.birdsid}`,
        {
          method: "DELETE",
        }
      );
      history.goBack();
    } catch (err) {
      console.log(err.message);
    }
  };

  //GETTING ALL THE WEIGHTS ENTRIES SPECIFIC TO THE BIRD NAME AND SPECIES
  const weightdata = [];
  const getdata = () => {
    details.map((data) => {
      weightdata.push(data.weight);
    });
  };

  getdata();

  const weights = Object.values(weightdata);
  const stats = {
    avg_weight: parseFloat(d3.mean(weights)).toFixed(2),
    min_weights: d3.min(weights),
    max_weights: d3.max(weights),
    median_weights: d3.median(weights),
    weights_dev: parseFloat(d3.deviation(weights)).toFixed(2),
  };

  //For the bar and line chart
  const [LineActive, setLineActive] = useState(false);
  const bardetails = [];
  let i = 0;
  for (i; i < details.length; i++) {
    bardetails.push({
      created_at: details[i].created_at.substring(0, 3),
      weight: details[i].weight,
    });
  }

  return (
    <SingleBirdPageWrapper>
      <Nav />

      <DeleteBird onClick={deletebird}> Delete Bird </DeleteBird>

      <SingleBirdContainer key={Bird.bird_id}>
        <SingleBirdWrapper>
          <ImageWrapper>
            <SingleBirdImage src={Bird.bird_image} />
          </ImageWrapper>
          <SingleBirdContent>
            <SingleBirdName>{Bird.bird_name}</SingleBirdName>
            <SingleBirdSpecies> Species: {Bird.species_name}</SingleBirdSpecies>
            <SingleBirdWeight>
              Average Weight: {stats.avg_weight}g{" "}
            </SingleBirdWeight>{" "}
            {/* Will be using calculated average weight */}
          </SingleBirdContent>
        </SingleBirdWrapper>

        <AnalysisContainer>
          <StatsContainer>
            <StatsWrapper>
              <Statsdetail>Average Weight: {stats.avg_weight}g</Statsdetail>
              <Statsdetail>Minimum Weight: {stats.min_weights}g</Statsdetail>
              <Statsdetail>Maximum Weight: {stats.max_weights}g</Statsdetail>
              <Statsdetail>Median Weight: {stats.median_weights}g</Statsdetail>
              <Statsdetail>Weight Deviation: {stats.weights_dev}g</Statsdetail>
            </StatsWrapper>
          </StatsContainer>

          <VisualContainer>
            <ChartContainer>
              {LineActive ? (
                <LineChart data={bardetails} />
              ) : (
                <BarChart data={bardetails} />
              )}
            </ChartContainer>

            {LineActive ? (
              <ChartChangeH1Line
                LineActive
                onClick={() => setLineActive(false)}
              >
                Line Chart{" "}
              </ChartChangeH1Line>
            ) : (
              <ChartChangeH1Bar LineActive onClick={() => setLineActive(true)}>
                Bar Chart{" "}
              </ChartChangeH1Bar>
            )}
          </VisualContainer>
        </AnalysisContainer>
      </SingleBirdContainer>

      <Backbutton onClick={() => history.goBack()}> Back </Backbutton>
      <ViewEntries
        to={`/birds/${Bird.bird_name}/${Bird.bird_id}/${Bird.species_name}/entries`}
      >
        {" "}
        View Entries{" "}
      </ViewEntries>
    </SingleBirdPageWrapper>
  );
}

export default SingleBird;
