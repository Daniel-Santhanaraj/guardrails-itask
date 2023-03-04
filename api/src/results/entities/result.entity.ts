//export class Result {}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'result' })
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  status: string;

  @Column({
    nullable: false,
  })
  repositoryName: string;

  //   @Column('json', { nullable: true })
  //   findings: JSON;
  @Column('json', { nullable: true })
  findings: [
    {
      type: string;
      ruleId: string;
      location: {
        path: string;
        positions: {
          begin: {
            line: number;
          };
        };
      };
      metadata: {
        description: string;
        severity: string;
      };
    },
  ];

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  queuedAt: Date;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  scanningAt: Date;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  finishedAt: Date;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
