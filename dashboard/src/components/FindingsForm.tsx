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
  const [finding, setFinding] = React.useState(props.finding);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFinding({ ...finding, [name]: value });
    console.log(finding);
  };

  const handleInputChangePath = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFinding({
      ...finding,
      location: { ...finding.location, [name]: value },
    });
  };

  const handleInputChangeLine = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFinding({
      ...finding,
      location: {
        ...finding.location,
        positions: {
          ...finding.location.positions,
          begin: { ...finding.location.positions.begin, [name]: value },
        },
      },
    });
  };

  const handleInputChangeMetadata = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFinding({
      ...finding,
      metadata: { ...finding.metadata, [name]: value },
    });
  };

  const handleInputChangeDropDown = (
    e: React.FormEvent<HTMLInputElement>,
    { name, value }: any
  ) => {
    setFinding({
      ...finding,
      metadata: { ...finding.metadata, [name]: value },
    });
  };

  return (
    <Container className="findingsForm">
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          label="Type"
          placeholder="sast"
          value={finding.type}
          name="type"
          onChange={handleInputChange}
        />
        <Form.Field
          control={Input}
          label="RuleId"
          placeholder="G402"
          value={finding.ruleId}
          name="ruleId"
          onChange={handleInputChange}
        />
        <Form.Field
          control={Input}
          label="Path"
          placeholder="connectors/apigateway.go"
          value={finding.location.path}
          name="path"
          onChange={handleInputChangePath}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          label="Line"
          placeholder="32"
          value={finding.location.positions.begin.line}
          name="line"
          onChange={handleInputChangeLine}
        />
        <Form.Field
          control={Select}
          selection
          label="Severity"
          options={options}
          placeholder="Low"
          value={finding.metadata.severity}
          name="severity"
          onChange={handleInputChangeDropDown}
        />
      </Form.Group>
      <Form.Field
        control={TextArea}
        label="Description"
        placeholder="TLS InsecureSkipVerify set true."
        value={finding.metadata.description}
        name="description"
        onChange={handleInputChangeMetadata}
      />
    </Container>
  );
};

export default FindingFrom;
