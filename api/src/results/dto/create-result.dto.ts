//export class CreateResultDto {}
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResultDto {
  id: number;

  @IsNotEmpty()
  @IsString({ message: 'description must be a text' })
  @MaxLength(255)
  @MinLength(2)
  @ApiProperty()
  status: string;

  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(2)
  @ApiProperty()
  repositoryName: string;

  @ApiProperty()
  findings: object;
  // @IsNotEmpty()
  // @ApiProperty()
  // findings: [
  //   {
  //     type: string;
  //     ruleId: string;
  //     location: {
  //       path: string;
  //       positions: {
  //         begin: {
  //           line: number;
  //         };
  //       };
  //     };
  //     metadata: {
  //       description: string;
  //       severity: string;
  //     };
  //   },
  // ];
  queuedAt: Date;
  scanningAt: Date;
  finishedAt: Date;
  updatedAt: Date;
}
