/*
  Warnings:

  - Added the required column `data` to the `Atendimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora` to the `Atendimento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Atendimento` ADD COLUMN `data` VARCHAR(191) NOT NULL,
    ADD COLUMN `hora` VARCHAR(191) NOT NULL;
