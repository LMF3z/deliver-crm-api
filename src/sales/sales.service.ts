import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { limitRequest } from '../constants/request.constants';
import { ProductsSalesService } from '../products_sales/products_sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import SalesModel from './sales.model';
import ProductsSalesModel from 'src/products_sales/products_sales.model';
import { ProductsModule } from 'src/products/products.module';
import ProductsModel from 'src/products/products.model';
import { generateSequentialNumber } from 'src/helpers/handleSerial.helpers';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(SalesModel)
    private readonly salesModel: typeof SalesModel,
    private readonly productsSalesService: ProductsSalesService,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const lastSale = await this.getLastSaleID();

    const newNumberControl = `NO-${generateSequentialNumber(lastSale + 1)}`;

    createSaleDto.sale_code = newNumberControl;

    const created = await this.salesModel.create({ ...createSaleDto });

    const productsSales = createSaleDto.products.map((productS) => ({
      ...productS,
      id_sale: created.dataValues.id,
    }));

    await this.productsSalesService.upsertProductsSale(productsSales);

    return created;
  }

  async findAll(
    id_company: number,
    offset: number,
  ): Promise<{ rows: SalesModel[]; count: number }> {
    const salesList = await this.salesModel.findAndCountAll({
      where: {
        id_company,
      },
      include: [
        {
          model: ProductsSalesModel,
          as: 'products',
          include: [
            {
              model: ProductsModel,
              as: 'product',
            },
          ],
        },
      ],
      offset,
      limit: limitRequest,
    });

    return { rows: salesList.rows, count: salesList.rows.length };
  }

  async findOne(id: number): Promise<SalesModel> {
    const sale = await this.salesModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ProductsSalesModel,
          as: 'products',
          include: [
            {
              model: ProductsModel,
              as: 'product',
            },
          ],
        },
      ],
    });

    return sale;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto): Promise<number> {
    const [updated] = await this.salesModel.update(updateSaleDto, {
      where: {
        id,
      },
    });

    return updated;
  }

  async remove(id: number): Promise<number> {
    const deleted = await this.salesModel.destroy({ where: { id } });
    return deleted;
  }

  async getLastSaleID() {
    const sale = await this.salesModel.findOne({
      attributes: ['id'],
      order: [['id', 'DESC']],
    });

    return sale?.dataValues?.id ?? 0;
  }

  async cancelSale(id: number): Promise<SalesModel[]> {
    const [_updated, affected] = await this.salesModel.update(
      { is_cancel: true },
      {
        where: { id },
        returning: true,
      },
    );

    return affected;
  }
}
