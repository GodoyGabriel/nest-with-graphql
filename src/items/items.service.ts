import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateItemInput } from "./dto/inputs/create-item.input";
import { UpdateItemInput } from "./dto/inputs/update-item.input";
import { Item } from "./entities/item.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly ItemsRepository: Repository<Item>
  ) {}

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem = this.ItemsRepository.create(createItemInput);
    return await this.ItemsRepository.save(newItem);
  }

  async findAll(): Promise<Item[]> {
    return this.ItemsRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.ItemsRepository.findOneBy({ id });

    if (!item) throw new NotFoundException(`Item ${id} not found`);

    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    // return this.ItemsRepository.update(id, updateItemInput);
    const item = await this.ItemsRepository.preload(updateItemInput);

    if (!item) throw new NotFoundException(`Item ${id} not found`);

    return this.ItemsRepository.save(item);
  }

  async remove(id: string): Promise<Item> {
    // TODO: Soft delete
    const item = await this.ItemsRepository.findOneBy({ id });

    await this.ItemsRepository.delete(item);

    return { ...item, id };
  }
}
