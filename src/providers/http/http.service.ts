import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpCustomService {
  constructor(private readonly httpService: HttpService) {}

  public async getCurrentDollarRate() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(process.env.DOLLAR_RATE_API_URL),
      );

      return response.data?.USD?.promedio_real;
    } catch (error) {
      console.log(`Error al obtener tasa del dólar ${error}`);

      return null;
    }
  }
}
