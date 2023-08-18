import { Controller, Get, Param, Query,ParseArrayPipe } from "@nestjs/common";
import { AppService } from './app.service';
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // http://localhost:3000/accumulate/2,2,8,6  // '2,2,8,6' string
  @Get('accumulate/:numbers')
  accumulateSend1(@Param('numbers') numbers: string) {

    const numberArray = numbers.split(',').map(Number);
    return this.appService.accumulate(numberArray);

  }


  // http://localhost:3000/accumulate2?numbers=[1,2,3] // => '[1,2,3]' string
  @Get('accumulate2')
  accumulateSend2(
    @Query('numbers') numbers: string,
  ): number {

    try {
      const numbersArray = JSON.parse(numbers);
      if (Array.isArray(numbersArray)) {
        // @ts-ignore
        return this.appService.accumulate(numbersArray);
      } else {
        throw new Error('Invalid numbers format');
      }
    } catch (error) {
      throw new Error('Invalid JSON format');
    }

  }


  // http://localhost:3000/accumulate3?numbers=1&numbers=2&numbers=3  // => [ '1', '2', '3' ] string[]
  // or
  // http://localhost:3000/accumulate3?numbers=1,2,3     // => '1,2,3' string
  @Get('accumulate3')
  accumulateSend3(
    //@Query('numbers') numbers,
    @Query('numbers', new ParseArrayPipe({ items: Number, separator: ',' })) numbers: number[]
  ): number {

    // @ts-ignore
    return this.appService.accumulate(numbers);

  }


  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    console.log(data); // [1, 2, 3]
    return (data || []).reduce((a, b) => a + b);
  }
}
