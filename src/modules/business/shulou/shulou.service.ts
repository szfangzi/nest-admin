import { Injectable } from '@nestjs/common';
import { CreateShulouDto } from './dto/create-shulou.dto';
import { UpdateShulouDto } from './dto/update-shulou.dto';

@Injectable()
export class ShulouService {
  create(createShulouDto: CreateShulouDto) {
    return 'This action adds a new shulou';
  }

  findAll() {
    return `This action returns all shulou`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shulou`;
  }

  update(id: number, updateShulouDto: UpdateShulouDto) {
    return `This action updates a #${id} shulou`;
  }

  remove(id: number) {
    return `This action removes a #${id} shulou`;
  }
}
