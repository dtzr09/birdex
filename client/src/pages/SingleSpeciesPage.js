import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Members from "../components/Members/Members";
import Nav from "../components/Navbar/Nav";
import {
  Button,
  Modal,
  Input,
  Form,
  TextArea,
  Image,
  Dropdown,
} from "semantic-ui-react";

import {
  SingleSpeciesContainer,
  SingleSpeciesWrapper,
  SingleSpeciesContent,
  SingleSpeciesName,
  SingleSpeciesImage,
  SingleSpeciesDescription,
  SingleSpeciesPageWrapper,
  DeleteButton,
  SingleSpeciesNameWrapper,
} from "./SingleSpeciesPageStyle";

function SingleSpeciesPage({ match }) {
  const [open, setOpen] = useState(false);

  const history = useHistory();
  const [Description, setNewDescription] = useState("");
  const [Img, setNewImg] = useState("");

  //FOR GETTING ONE SPECIES
  const [family, setFamily] = useState("");

  useEffect(() => {
    const getFamily = async () => {
      try {
        const response = await fetch(`/species/${match.params.name}`);
        const jsonData = await response.json();
        setFamily(jsonData[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getFamily();
    setNewDescription(family.speciesdesc);
    setNewImg(family.speciesimg);
  }, [match.params.name]);

  //FOR DELETING SPECIES
  const deleteSpecies = async (id) => {
    console.log(id);
    try {
      const deleteSpecies = await fetch(`/species/${match.params.name}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
        }),
      });
      history.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  //FOR UPDATING SPECIES

  //Upon submiting push it to the database and reload
  const onSubmitUpdate = async () => {
    try {
      const response = await fetch(`/species/${family.speciesname}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: Description,
          img: Img,
        }),
      });
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };

  // Run when click the button updatespecies to load up the default desc and img
  const HandleUpdate = () => {
    setNewDescription(family.speciesdesc);
    setNewImg(family.speciesimg);
  };

  //SERVER SIDE TO GET ALL MEMBERS OF THE SINGLE SPECIES (required for the species id in order to add new bird )
  const [allmembers, setallmembers] = useState([]);
  useEffect(() => {
    const getmembers = async () => {
      try {
        const response = await fetch(`/species/${family.speciesname}`);
        const jsonData = await response.json();
        setallmembers(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getmembers();
  }, []);

  //FOR ADDING NEW BIRD TO THE CURRENT SPECIES
  const ts = new Date();
  const currentDate =
    ts.toLocaleDateString("en-US") + " " + ts.toLocaleTimeString("en-US");

  const [weightinput, setWeight] = useState(0);
  const [openBird, setOpenBird] = useState(false);
  const [BirdNameInput, setBirdName] = useState("");
  const [BirdImageInput, setBirdImage] = useState("");

  //For the input field for weight
  const options = [
    { key: "integer", text: "integer", value: "integer" },
    { key: "decimals", text: "decimals", value: "decimals" },
  ];

  const HandleBird = async () => {
    try {
      const response = await fetch(`/species/${family.speciesname}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bird_name: BirdNameInput.trim(),
          img: BirdImageInput,
          created_at: currentDate,
          species_id: family.speciesid,
          weight: weightinput,
          bird_id: family.birdsid,
        }),
      });
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };

  let i = 0;

  const CheckValid = () => {
    for (i; i < allmembers.length; i++) {
      if (
        allmembers[i].birdsname == BirdNameInput ||
        BirdNameInput == "" ||
        BirdImageInput == "" ||
        weightinput <= 0
      ) {
        setBirdName("");
        setBirdImage("");
        setWeight(0);
        return false;
      }
    }
    return true;
  };

  const addBird = () => {
    {
      CheckValid()
        ? HandleBird()
        : alert(
            "ERROR: Either bird name already exists, there are blank input fields or weight input is invalid."
          );
    }
  };

  return (
    <SingleSpeciesPageWrapper>
      <Nav />
      <DeleteButton onClick={() => deleteSpecies(family.speciesid)}>
        Delete Species
      </DeleteButton>
      <SingleSpeciesContainer key={family.speciesid}>
        <SingleSpeciesWrapper>
          <SingleSpeciesImage src={family.speciesimg} />
          <SingleSpeciesContent>
            <SingleSpeciesNameWrapper>
              <SingleSpeciesName>{family.speciesname}</SingleSpeciesName>

              {/* MODAL TO UPDATE SPECIES*/}
              <Modal
                size={"large"}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={
                  <Button
                    className="update--showmodal--button"
                    onClick={HandleUpdate}
                    style={{
                      maxHeight: "45px",
                      cursor: "pointer",
                      zIndex: 999,
                    }}
                  >
                    Update Species
                  </Button>
                }
              >
                <Modal.Header>Update Species</Modal.Header>
                <Modal.Content image>
                  <Image size="large" src={Img} wrapped />
                  <Modal.Description
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Form>
                      <TextArea
                        placeholder="Enter description"
                        defaultValue={family.speciesdesc || Description}
                        onChange={(e) => setNewDescription(e.target.value)}
                        style={{
                          marginBottom: "30px",
                          height: "150px",
                          width: "100%",
                        }}
                      />
                    </Form>
                    <Input
                      placeholder="Enter Image Address"
                      defaultValue={family.speciesimg || Img}
                      onChange={(e) => setNewImg(e.target.value)}
                    />
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    content="Update"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={onSubmitUpdate}
                    positive
                  />
                </Modal.Actions>
              </Modal>
            </SingleSpeciesNameWrapper>
            <SingleSpeciesDescription>
              {family.speciesdesc}
            </SingleSpeciesDescription>
          </SingleSpeciesContent>
        </SingleSpeciesWrapper>
        <button
          className="AddBirdButton"
          onClick={() => setOpenBird(!openBird)}
        >
          Add New Bird
        </button>

        {family.birdsid != null &&
        family.birdsname != null &&
        family.birdsimg != null &&
        family.birdsspecies != null ? (
          <Members name={family.speciesname} id={family.birdsid} />
        ) : null}
      </SingleSpeciesContainer>
      );
      {/* Modal TO ADD NEW BIRD*/}
      <Modal
        onClose={() => setOpenBird(false)}
        onOpen={() => setOpenBird(true)}
        open={openBird}
      >
        <Modal.Header>Add New Bird</Modal.Header>
        <Modal.Content image>
          <Image size="large" src={BirdImageInput} wrapped />
          <Modal.Description
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              width: "100%",
              maxWidth: "350px",
              marginLeft: "20px",
            }}
          >
            <Input
              placeholder="Name"
              type="text"
              value={BirdNameInput}
              onChange={(e) => setBirdName(e.target.value)}
              style={{ marginBottom: "20px" }}
            />

            <Input
              placeholder="Image Address"
              type="text"
              value={BirdImageInput}
              onChange={(e) => setBirdImage(e.target.value)}
            />

            <Input
              type="number"
              label={<Dropdown defaultValue="int" options={options} />}
              labelPosition="right"
              placeholder="Enter weight"
              value={weightinput}
              onChange={(e) => setWeight(e.target.value)}
              style={{ marginTop: "20px" }}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Add"
            labelPosition="right"
            icon="checkmark"
            onClick={addBird}
            positive
          />
        </Modal.Actions>
      </Modal>
    </SingleSpeciesPageWrapper>
  );
}

export default SingleSpeciesPage;
