import { Body, Controller, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post('purchase-request')
  async purchaseRequest(
    @Param('cattleId') cattleId: string,
    @Param('buyerId') buyerId: string,
    @Body() body: any
  ) {
    // 가축 구매 요청
    const result = await this.transactionService.requestPurchase(cattleId, buyerId, body)
    return result
  }

  @Post('complete-transaction')
  async completeTransaction(@Param('cattleId') cattleId: string, @Body() body: any) {
    // 거래 완료
    const result = await this.transactionService.completeTransaction(cattleId, body)
    return result
  }
}
