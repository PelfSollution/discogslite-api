-- CreateTable
CREATE TABLE "DiscogsArtist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "DiscogsArtist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscogsRelease" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "artistId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "DiscogsRelease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscogsGenre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "DiscogsGenre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscogsArtist_name_key" ON "DiscogsArtist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DiscogsGenre_name_key" ON "DiscogsGenre"("name");

-- AddForeignKey
ALTER TABLE "DiscogsRelease" ADD CONSTRAINT "DiscogsRelease_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "DiscogsArtist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscogsRelease" ADD CONSTRAINT "DiscogsRelease_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "DiscogsGenre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
