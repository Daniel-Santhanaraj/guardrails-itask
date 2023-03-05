import React, { useState } from "react";
import axios from "axios";
import EntryForm from "./components/EntryForm";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  Menu,
  Segment,
} from "semantic-ui-react";
import { IDropDown, IResults } from "./models/results.model";

const sample: IResults = {
  status: "",
  repositoryName: "",
  findings: [
    {
      type: "",
      ruleId: "",
      location: {
        path: "",
        positions: {
          begin: {
            line: 0,
          },
        },
      },
      metadata: {
        description: "",
        severity: "",
      },
    },
  ],
  queuedAt: new Date(),
  scanningAt: new Date(),
  finishedAt: new Date(),
};

function App() {
  const [data, setData] = useState(sample);
  const [load, setLoad] = useState(false);
  React.useEffect(() => {
    let id = window.location.pathname.split("/")[1];
    if (id) {
      axios
        .get(`http://localhost:3001/results/${id}`)
        .then((response) => {
          setData(response.data);
          setLoad(true);
        })
        .catch(function (error) {
          setLoad(true);
        });
    } else {
      setLoad(true);
    }
  }, []);
  return (
    <Container className="scanContainer">
      {load && <EntryForm data={data} sample={sample} />}
    </Container>
  );
}

export default App;
