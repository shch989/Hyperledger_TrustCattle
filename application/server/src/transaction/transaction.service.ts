import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  requestPurchase(cattleId: string, buyerId: string, transactionData: any): Promise<any> {
    // 가축 구매 요청 로직
    return transactionData
  }

  completeTransaction(cattleId: string, transactionData: any): Promise<any> {
    // 거래 완료 로직
    return transactionData
  }
}
