import React, { useEffect, useState } from "react";
import { Button, TextArea, Image, Modal, Input, Form } from "semantic-ui-react";
import { NavContainer, NavTitle, AddSpeciesButton } from "./NavStyles";

function Nav() {
  //SERVER TO FETCH ALL SPECIES
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

  //SERVER TO ADD NEW SPECIES
  const [open, setOpen] = useState(false);
  const [Nameinput, setName] = useState("");
  const [Descriptioninput, setDescription] = useState("");
  const [imageinput, setImage] = useState("");

  const HandleSpecies = async (e) => {
    try {
      const response = await fetch("/species", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          // for some reason, it auto adds a whitespace at the end which returns nth when queried to database
          name: Nameinput.trim(),
          description: Descriptioninput,
          img: imageinput,
        }),
      });

      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };

  let i = 0;
  const CheckExist = () => {
    for (i; i < allspecies.length; i++) {
      console.log(allspecies[i].name);
      if (allspecies[i].name == Nameinput) {
        setName("");
        setDescription("");
        setImage("");
        return false;
      }
    }
    return true;
  };

  const AddSpecies = () => {
    {
      CheckExist() ? HandleSpecies() : alert("Species Name Already Exists!");
    }
    setOpen(!open);
  };

  return (
    <div>
      <NavContainer>
        <NavTitle to="/"> BirdDex </NavTitle>
        <AddSpeciesButton onClick={() => setOpen(!open)}>
          Add new species
        </AddSpeciesButton>
      </NavContainer>

      {/* Modal TO ADD NEW SPECIES*/}
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Add New Species</Modal.Header>
        <Modal.Content image>
          <Image size="large" src={imageinput} wrapped />
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
              value={Nameinput}
              onChange={(e) => setName(e.target.value)}
              style={{ marginBottom: "20px" }}
            />

            <Form>
              <TextArea
                placeholder="Description"
                value={Descriptioninput}
                onChange={(e) => setDescription(e.target.value)}
                style={{ marginBottom: "20px", height: "200px" }}
              />
            </Form>

            <Input
              placeholder="Image Address"
              type="text"
              value={imageinput}
              onChange={(e) => setImage(e.target.value)}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Add"
            labelPosition="right"
            icon="checkmark"
            onClick={AddSpecies}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default Nav;
