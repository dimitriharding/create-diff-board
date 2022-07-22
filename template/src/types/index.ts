enum TestState {
  FAILED = "failed",
  PASSED = "passed",
  UNDEFINED = "undefined",
  SKIPPED = "skipped",
}

export interface IDiff {
  name: string;
  actual: string;
  expected: string;
  diff?: string;
}

export interface IDiffs {
  [key: string]: IDiff;
}

export type ReportData = Feature[];

export interface Feature {
  description: string;
  elements: Scenario[];
  id: string;
  line: number;
  keyword: string;
  name: string;
  tags: Tag2[];
  uri: string;
}

export interface Scenario {
  description: string;
  id: string;
  keyword: string;
  line: number;
  name: string;
  steps: Step[];
  tags: Tag[];
  type: string;
}

export interface Step {
  keyword: string;
  hidden?: boolean;
  result: Result;
  arguments?: Argument[];
  line?: number;
  name?: string;
  match?: Match;
}

export interface Result {
  status: TestState;
  duration: number;
  error_message?: string;
}

export interface Argument {
  content: string;
  line: number;
}

export interface Match {
  location: string;
}

export interface Tag {
  name: string;
  line: number;
}

export interface Tag2 {
  name: string;
  line: number;
}

export interface Spec {
  id: string;
  request: Object;
  response: Object;
  testName: string;
  curl: string;
}
