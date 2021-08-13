import { PartialType } from '@nestjs/mapped-types';
import { CreateShulouDto } from './create-shulou.dto';

export class UpdateShulouDto extends PartialType(CreateShulouDto) {}
