import * as React from "react";
import axios from "axios";
import {
  Button,
  Form,
  Input,
  Select,
  Grid,
  Header,
  Divider,
  Dropdown,
  Message,
} from "semantic-ui-react";
import FindingsFrom from "./FindingsForm";
import { IDropDown, IResults } from "./../models/results.model";

interface IEntryFormProps {
  data: IResults;
  sample: IResults;
}

const staticData = {
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
};

const status: IDropDown[] = [
  { key: "Queued", text: "Queued", value: "Queued" },
  { key: "In Progress", text: "In Progress", value: "In Progress" },
  { key: "Success", text: "Success", value: "Success" },
  { key: "Failure", text: "Failure", value: "Failure" },
];

const EntryForm: React.FC<IEntryFormProps> = (props) => {
  const [result, setResult] = React.useState<IResults>(
    props.data || props.sample
  );
  const [count, setCount] = React.useState(0);

  const [success, setSuccess] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => {
    renderFindings();
  }, [count]);

  const addFindings = () => {
    setCount(count + 1);
    const addFinding = [...result.findings, staticData];
    let addItems = result;
    addItems.findings = addFinding;
    setResult(addItems);
  };

  const renderFindings = () => {
    return result.findings.map((finding, i) => {
      return <FindingsFrom finding={finding} key={i} />;
    });
  };

  const handleInputChangeDropDown = (
    e: React.FormEvent<HTMLInputElement>,
    { name, value }: any
  ) => {
    setResult({ ...result, [name]: value });
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setResult({ ...result, [name]: value });
  };

  const saveData = () => {
    console.log(result);
    return false;
    axios({
      method: "post",
      url: "http://localhost:3001/results",
      data: result,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (res) {
        setResult(props.sample);
        setSuccess(true);
      })
      .catch(function (error) {
        setFailed(true);
      });
  };
  return (
    <Grid textAlign="center">
      <Grid.Column className="formMaxWidth" textAlign="left">
        <Header as="h1" className="formHeader">
          Security Scan From
        </Header>
        <Divider hidden />
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              required
              control={Input}
              label="Repository Name"
              placeholder="Repository Name"
              value={result.repositoryName}
              name="repositoryName"
              onChange={handleInputChange}
            />
            <Form.Field
              required
              control={Dropdown}
              selection
              label="Status"
              options={status}
              placeholder="Status"
              value={result.status}
              name="status"
              onChange={handleInputChangeDropDown}
            />
          </Form.Group>
          <Divider hidden />
          <Divider horizontal>Findings</Divider>
          {renderFindings()}
          {/* {result.findings.map((finding, i) => {
            return <FindingsFrom finding={finding} key={i} />;
          })} */}

          <Button
            secondary
            floated="right"
            //onClick={() => setCount(count + 1)}
            onClick={addFindings}
            role="button"
            type="button"
          >
            Add Findings
          </Button>

          <Button primary onClick={saveData}>
            Submit
          </Button>
        </Form>
        {success && (
          <Message
            success
            header="Scan result stored successfully"
            content="You may now view by click result button"
          />
        )}
        {failed && (
          <Message
            error
            header="There was some errors with your submission"
            content="Pleae try again"
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default EntryForm;
