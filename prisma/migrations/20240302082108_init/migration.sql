-- CreateTable
CREATE TABLE "nft_transfers" (
    "id" TEXT NOT NULL,
    "contract_address" TEXT NOT NULL,
    "token_id" INTEGER NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "is_minting_tx" BOOLEAN NOT NULL DEFAULT false,
    "tx_hash" TEXT NOT NULL,
    "block_number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nft_transfers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nfts" (
    "id" TEXT NOT NULL,
    "contract_address" TEXT NOT NULL,
    "token_id" INTEGER NOT NULL,
    "model_id" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nfts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nft_models" (
    "id" TEXT NOT NULL,
    "contract_address" TEXT NOT NULL,
    "model_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "uri" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nft_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parsed_blocks" (
    "id" TEXT NOT NULL,
    "block_number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parsed_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nfts_contract_address_token_id_key" ON "nfts"("contract_address", "token_id");

-- CreateIndex
CREATE UNIQUE INDEX "nft_models_contract_address_model_id_key" ON "nft_models"("contract_address", "model_id");

-- CreateIndex
CREATE UNIQUE INDEX "parsed_blocks_block_number_key" ON "parsed_blocks"("block_number");

-- AddForeignKey
ALTER TABLE "nfts" ADD CONSTRAINT "nfts_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "nft_models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
