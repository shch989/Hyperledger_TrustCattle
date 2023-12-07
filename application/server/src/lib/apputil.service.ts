import { Injectable } from '@nestjs/common';
import { Wallet, Wallets } from 'fabric-network';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppUtilsService {
  private readonly ccpPath = path.resolve('..', 'server', 'src', 'config', 'connection-org1.json');
  private readonly walletPath = path.join('..', 'server', 'src', 'wallet')

  buildCCPOrg1(): any {
    const fileExists = fs.existsSync(this.ccpPath);
    if (!fileExists) {
      throw new Error(`no such file or directory: ${this.ccpPath}`);
    }

    const contents = fs.readFileSync(this.ccpPath, 'utf8');
    const ccp = JSON.parse(contents);

    console.log(`Loaded the network configuration located at ${this.ccpPath}`);

    return ccp;
  }

  async buildWallet(): Promise<Wallet> {
    let wallet: Wallet;
    const walletPath = this.walletPath;
    if (walletPath) {
      wallet = await Wallets.newFileSystemWallet(walletPath);
      console.log(`Built a file system wallet at ${walletPath}`);
    } else {
      wallet = await Wallets.newInMemoryWallet();
      console.log('Built an in-memory wallet');
    }
    console.log('Wallet:', wallet);
    return wallet;
  }
}
