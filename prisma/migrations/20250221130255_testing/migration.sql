/*
  Warnings:

  - You are about to drop the `Issuance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Issuance" DROP CONSTRAINT "Issuance_book_id_fkey";

-- DropForeignKey
ALTER TABLE "Issuance" DROP CONSTRAINT "Issuance_issuance_member_fkey";

-- DropTable
DROP TABLE "Issuance";

-- CreateTable
CREATE TABLE "issuance" (
    "issuance_id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "issuance_member" INTEGER NOT NULL,
    "issued_by" TEXT NOT NULL,
    "issuance_date" TIMESTAMP(3) NOT NULL,
    "target_return_date" TIMESTAMP(3) NOT NULL,
    "issuance_status" TEXT NOT NULL,

    CONSTRAINT "issuance_pkey" PRIMARY KEY ("issuance_id")
);

-- AddForeignKey
ALTER TABLE "issuance" ADD CONSTRAINT "issuance_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("book_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issuance" ADD CONSTRAINT "issuance_issuance_member_fkey" FOREIGN KEY ("issuance_member") REFERENCES "member"("mem_id") ON DELETE CASCADE ON UPDATE CASCADE;
