export interface IMetaData {
  description: string;
  severity: string;
}

export interface IBegin {
  line: number | string;
}
export interface IPositions {
  begin: IBegin;
}

export interface ILocation {
  path: string;
  positions: IPositions;
}
export interface IFinding {
  type: string;
  ruleId: string;
  location: ILocation;
  metadata: IMetaData;
}
export interface IResults {
  status: string;
  repositoryName: string;
  findings: IFinding[];
  queuedAt: Date;
  scanningAt: Date;
  finishedAt: Date;
}

export interface IDropDown {
  key: string;
  text: string;
  value: string;
}
