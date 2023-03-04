import { Result } from './../entities/result.entity';

export const resultsStub = (): Result[] => {
  return [
    {
      id: 1,
      status: 'Queued',
      repositoryName: 'Scan report 1',
      queuedAt: new Date('2023-03-04 18:55:58'),
      scanningAt: new Date('2023-03-04 18:55:58'),
      finishedAt: new Date('2023-03-04 18:55:58'),
      updatedAt: new Date('2023-03-04 13:45:12'),
      findings: [
        {
          type: '1-sast',
          ruleId: 'G402',
          location: {
            path: 'connectors/apigateway.go',
            positions: {
              begin: {
                line: 60,
              },
            },
          },
          metadata: {
            description: 'TLS InsecureSkipVerify set true.',
            severity: 'HIGH',
          },
        },
      ],
    },
    {
      id: 2,
      status: 'Success',
      repositoryName: 'Scan report 2',
      queuedAt: new Date('2023-03-04 18:55:58'),
      scanningAt: new Date('2023-03-04 18:55:58'),
      finishedAt: new Date('2023-03-04 18:55:58'),
      updatedAt: new Date('2023-03-04 13:45:12'),
      findings: [
        {
          type: '2-sast',
          ruleId: 'G403',
          location: {
            path: 'connectors/apigateway1.go',
            positions: {
              begin: {
                line: 60,
              },
            },
          },
          metadata: {
            description: 'TLS InsecureSkipVerify set true.',
            severity: 'HIGH',
          },
        },
      ],
    },
  ];
};

export const resultStub = (): Result => {
  return {
    id: 1,
    status: 'Queued',
    repositoryName: 'Scan report 1',
    queuedAt: new Date('2023-03-04 18:55:58'),
    scanningAt: new Date('2023-03-04 18:55:58'),
    finishedAt: new Date('2023-03-04 18:55:58'),
    updatedAt: new Date('2023-03-04 13:45:12'),
    findings: [
      {
        type: '1-sast',
        ruleId: 'G402',
        location: {
          path: 'connectors/apigateway.go',
          positions: {
            begin: {
              line: 60,
            },
          },
        },
        metadata: {
          description: 'TLS InsecureSkipVerify set true.',
          severity: 'HIGH',
        },
      },
    ],
  };
};
