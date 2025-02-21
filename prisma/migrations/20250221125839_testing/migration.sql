/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Membership` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_book_cat_id_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_book_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "Issuance" DROP CONSTRAINT "Issuance_book_id_fkey";

-- DropForeignKey
ALTER TABLE "Issuance" DROP CONSTRAINT "Issuance_issuance_member_fkey";

-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_member_id_fkey";

-- DropTable
DROP TABLE "Book";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Collection";

-- DropTable
DROP TABLE "Member";

-- DropTable
DROP TABLE "Membership";

-- CreateTable
CREATE TABLE "member" (
    "mem_id" SERIAL NOT NULL,
    "mem_name" TEXT NOT NULL,
    "mem_phone" TEXT NOT NULL,
    "mem_email" TEXT NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("mem_id")
);

-- CreateTable
CREATE TABLE "membership" (
    "membership_id" SERIAL NOT NULL,
    "member_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "membership_pkey" PRIMARY KEY ("membership_id")
);

-- CreateTable
CREATE TABLE "collection" (
    "collection_id" SERIAL NOT NULL,
    "collection_name" TEXT NOT NULL,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("collection_id")
);

-- CreateTable
CREATE TABLE "category" (
    "cat_id" SERIAL NOT NULL,
    "cat_name" TEXT NOT NULL,
    "sub_cat_name" TEXT,

    CONSTRAINT "category_pkey" PRIMARY KEY ("cat_id")
);

-- CreateTable
CREATE TABLE "book" (
    "book_id" SERIAL NOT NULL,
    "book_name" TEXT NOT NULL,
    "book_cat_id" INTEGER NOT NULL,
    "book_collection_id" INTEGER NOT NULL,
    "book_launch_date" TIMESTAMP(3) NOT NULL,
    "book_publisher" TEXT NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("book_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "member_mem_email_key" ON "member"("mem_email");

-- CreateIndex
CREATE UNIQUE INDEX "membership_member_id_key" ON "membership"("member_id");

-- AddForeignKey
ALTER TABLE "membership" ADD CONSTRAINT "membership_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "member"("mem_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_book_cat_id_fkey" FOREIGN KEY ("book_cat_id") REFERENCES "category"("cat_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_book_collection_id_fkey" FOREIGN KEY ("book_collection_id") REFERENCES "collection"("collection_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issuance" ADD CONSTRAINT "Issuance_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("book_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issuance" ADD CONSTRAINT "Issuance_issuance_member_fkey" FOREIGN KEY ("issuance_member") REFERENCES "member"("mem_id") ON DELETE CASCADE ON UPDATE CASCADE;
