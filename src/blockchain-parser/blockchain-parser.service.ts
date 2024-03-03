import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LATEST_BLOCK_ID, MAINNET } from 'const';
import { PrismaService } from 'src/prisma.service';
import { Chain, WebSocketTransport, PublicClient } from 'viem';
import { mainnet, sepolia } from 'viem/chains';

@Injectable()
export class BlockchainParserService {
  private viemClient: PublicClient<WebSocketTransport, Chain>;
  private chain: Chain;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.chain = this.configService.getOrThrow<string>('CHAIN') === MAINNET ? mainnet : sepolia;
    // this.viemClient = createPublicClient({
    //   chain: this.chain,
    //   transport: webSocket(this.configService.getOrThrow<string>('ALCHEMY_WEB_SOCKET_URL')),
    // });
  }

  async parseBlocks() {
    try {
      const fromBlock = await this.getLastProcessedBlockFromDatabase();
      await this.parseBlocksFrom(fromBlock);
    } catch (error) {
      console.error('[Blockchain-Parser] Error occurred:', error);
    }
  }

  private async parseBlocksFrom(fromBlock: number) {
    // start listening for new blocks
    // this.viemClient.subscribeNewHeads(async (block) => {
    //   if (block.number > fromBlock) {
    //     await this.processBlock(block);
    //   }
    // });
    return fromBlock;
  }

  private async getLastProcessedBlockFromDatabase(): Promise<number> {
    const latestBlock = await this.prisma.parsedBlock.findUnique({
      where: {
        id: LATEST_BLOCK_ID,
      },
    });

    return latestBlock ? latestBlock.blockNumber : 0;
  }
}
