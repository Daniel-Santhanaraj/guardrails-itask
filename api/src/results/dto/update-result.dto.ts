// import { PartialType } from '@nestjs/swagger';
// import { CreateResultDto } from './create-result.dto';

// export class UpdateResultDto extends PartialType(CreateResultDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateResultDto } from './index';

export class UpdateResultDto extends PartialType(CreateResultDto) {}
