-- CreateTable
CREATE TABLE "Member" (
    "id" BIGSERIAL NOT NULL,
    "externalId" UUID NOT NULL,
    "username" VARCHAR(32) NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" VARCHAR(32) NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" BIGSERIAL NOT NULL,
    "externalId" UUID NOT NULL,
    "authorId" BIGINT NOT NULL,
    "contentFront" TEXT NOT NULL,
    "contentBack" TEXT NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearnRate" (
    "id" BIGSERIAL NOT NULL,
    "externalId" UUID NOT NULL,
    "pageId" BIGINT NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL,

    CONSTRAINT "LearnRate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_username_key" ON "Member"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LearnRate_pageId_key" ON "LearnRate"("pageId");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearnRate" ADD CONSTRAINT "LearnRate_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
