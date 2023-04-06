import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryBranchDto } from './create-inventory-branch.dto';

export class UpdateInventoryBranchDto extends PartialType(CreateInventoryBranchDto) {}
