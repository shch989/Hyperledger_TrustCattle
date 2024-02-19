import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  // index.hbs
  @Get()
  @Render('index_theme')
  getIndex() {
    return;
  }  
  // wallet.hbs
  @Get('wallet')
  @Render('wallet')
  getWallet() {
    return;
  }  
  // exp_propose.hbs
  @Get('exp_propose')
  @Render('exp-propose')
  getExpPropose() {
    return;
  }  
  // exp_confirm.hbs
  @Get('exp_confirm')
  @Render('exp-confirm')
  getExpConfirm() {
    return;
  }  
  // exp_query.hbs
  @Get('exp_query')
  @Render('exp-query')
  getExpQuery() {
    return;
  }  
}
