import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NftService {
  constructor(private prismaService: PrismaService) {}
}