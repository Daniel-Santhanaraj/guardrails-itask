import * as React from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
  Header,
  Divider,
  Container,
} from "semantic-ui-react";
import { IDropDown, IFinding } from "./../models/results.model";

interface IFindingFromProps {
  finding: IFinding;
}

const options: IDropDown[] = [
  { key: "low", text: "Low", value: "Low" },
  { key: "medium", text: "Medium", value: "Medium" },
  { key: "high", text: "High", value: "High" },
];

const FindingFrom: React.FC<IFindingFromProps> = (props) => {
  const { finding } = props;
  return (
    <Container className="findingsForm">
      <Form.Group widths="equal">
        <Form.Field control={Input} label="Type" placeholder="sast" />
        <Form.Field control={Input} label="RuleId" placeholder="G402" />
        <Form.Field
          control={Input}
          label="Path"
          placeholder="connectors/apigateway.go"
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field control={Input} label="Line" placeholder="32" />
        <Form.Field
          control={Select}
          selection
          label="Severity"
          options={options}
          placeholder="Low"
        />
      </Form.Group>
      <Form.Field
        control={TextArea}
        label="Description"
        placeholder="TLS InsecureSkipVerify set true."
      />
    </Container>
  );
};

export default FindingFrom;
