import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HttpCustomService } from '../providers/http/http.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { TypePaymentsE } from './entities/sale.entity';

@Injectable()
export class SalesValidationMiddleware implements NestMiddleware {
  constructor(private readonly httpService: HttpCustomService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const body: CreateSaleDto = req.body;

    const dollarRate = await this.httpService.getCurrentDollarRate();

    if (!dollarRate) {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Error al obtener la tasa del dólar, intente más tarde.',
      });
      return;
    }

    body.rate_dollars = dollarRate;

    const totalProducts = body.products.reduce(
      (acc, el) => (acc += el.price * el.amount),
      0,
    );

    const amountBolivares = totalProducts * dollarRate;

    if (amountBolivares !== body.total_payment_bolivares) {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Total en bolivares no puede ser diferente al total a pagar.',
      });
      return;
    }

    if (
      (body.type_payment === TypePaymentsE.transfer ||
        body.type_payment === TypePaymentsE.mobile_payment) &&
      !body.reference_code
    ) {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Código de referencia es necesario.',
      });
      return;
    }

    if (
      body.type_payment === TypePaymentsE.cash &&
      body.total_payment > totalProducts &&
      body.change !== Number((body.total_payment - totalProducts).toFixed(2))
    ) {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Cambio no es valido.',
      });
      return;
    }

    if (
      body.type_payment === TypePaymentsE.cash &&
      body.total_payment < totalProducts
    ) {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Total ingresado no puede ser menor al total a pagar.',
      });
      return;
    }

    next();
  }
}
