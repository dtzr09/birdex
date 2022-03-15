import React, { useEffect, useState } from "react";
import Nav from "../components/Navbar/Nav";
import { Icon, Table, Button, Modal, Input, Dropdown } from "semantic-ui-react";
import "./EntriesPageStyles.css";
import { useHistory } from "react-router";

function EntriesPage({ match }) {
  const data = match.params;
  const ts = new Date();
  const history = useHistory();

  //State of modal that adds new entry
  const [open, setOpen] = useState(false);
  const [weightinput, setWeight] = useState(0);
  const currentDate =
    ts.toLocaleDateString("en-US") + " " + ts.toLocaleTimeString("en-US");

  //State of modal that updates entry
  const [open2, setOpen2] = useState(false);
  const [newWeight, setnewWeight] = useState("");
  const [editId, seteditId] = useState("");

  //Server to add new entries
  const newEntries = async (e) => {
    if (weightinput <= 0) {
      alert("Incorrect Weight Value!");
      setWeight(0);
    } else {
      try {
        const response = await fetch(
          `/birds/${data.birdName}/${data.birdsid}/${data.species_name}/entries`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              weight: weightinput,
              created_at: currentDate,
            }),
          }
        );
        window.location.reload();
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const sendEntry = () => {
    setOpen(false);
    newEntries();
  };

  //Server to render entries
  const [entry, setEntry] = useState([]);

  const getbirdEntries = async () => {
    try {
      const response = await fetch(
        `/birds/${data.birdName}/${data.birdsid}/${data.species_name}/entries`
      );
      const jsonData = await response.json();

      setEntry(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getbirdEntries();
  }, []);

  //Server to delete entry
  //Only allow to delete if there is more than one entry --> so there must be at least an entry in every bird
  const deletebird = async (id) => {
    try {
      const deletebird = await fetch(
        `/birds/${data.birdName}/${data.birdsid}/${data.species_name}/entries`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            entry_id: id,
          }),
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = (id) => {
    if (entry.length > 1) {
      deletebird(id);
    } else {
      alert("You need to keep at least one entry!");
    }
  };

  //Server to update entry
  const handleUpdate = (id) => {
    setOpen2(!open2);
    seteditId(
      id
    ); /* In order to make the current id that we clicked a global variable */
  };

  const onUpdate = async () => {
    try {
      const response = await fetch(
        `/birds/${data.birdName}/${data.birdsid}/${data.species_name}/entries`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editId,
            weight: newWeight,
            created_at: currentDate,
          }),
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const setUpdate = () => {
    onUpdate();
    window.location.reload();
  };

  console.log(entry);
  //DISPLAYING ALL ENTRIES JSX
  const entries = entry.map((details) => {
    return (
      <Table.Body key={details.entry_id} style={{ textAlign: "center" }}>
        <Table.Row className="EntriesTableRow">
          <Table.Cell className="test">{details.created_at}</Table.Cell>
          <Table.Cell>{details.weight}</Table.Cell>
          <Table.Cell>
            <Icon
              className="edit-button"
              name="edit"
              size="big"
              onClick={() => handleUpdate(details.entry_id)}
            />
          </Table.Cell>
          <Table.Cell>
            <Icon
              className="delete-button"
              name="delete"
              size="big"
              color="red"
              onClick={() => handleDelete(details.entry_id)}
            />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  });

  //For the input field for weight
  const options = [
    { key: "integer", text: "integer", value: "integer" },
    { key: "decimals", text: "decimals", value: "decimals" },
  ];

  return (
    <div className="EntriesContainer">
      <Nav />
      <div className="EntriesWrapper">
        <Table celled className="EntriesTable">
          <Table.Header>
            <Table.Row style={{ textAlign: "center"}}>
              <Table.HeaderCell>TimeStamp</Table.HeaderCell>
              <Table.HeaderCell>Weight</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {entries}
          <Table.Footer />
        </Table>
      </div>

      {/* Modal To Add New Entry*/}
      <Modal
        size={"tiny"}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button className="showmodal--button">Add New Entry</Button>}
      >
        <Modal.Header>Add New Entry</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Input
              label={<Dropdown defaultValue="int" options={options} />}
              labelPosition="right"
              placeholder="Enter weight"
              value={weightinput}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Add"
            labelPosition="right"
            icon="checkmark"
            onClick={sendEntry}
            positive
          />
        </Modal.Actions>
      </Modal>

      {/* Modal To Update Entry */}
      <Modal
        size={"tiny"}
        onClose={() => setOpen2(false)}
        onOpen={() => setOpen2(true)}
        open={open2}
      >
        <Modal.Header> Edit Entry</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Input
              label={<Dropdown defaultValue="int" options={options} />}
              labelPosition="right"
              placeholder="Enter weight"
              value={newWeight}
              onChange={(e) => setnewWeight(e.target.value)}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Add"
            labelPosition="right"
            icon="checkmark"
            onClick={setUpdate}
            positive
          />
        </Modal.Actions>
      </Modal>

      <Button
        onClick={() => history.goBack()}
        content="Back"
        icon="left arrow"
        labelPosition="left"
      />
    </div>
  );
}

export default EntriesPage;
