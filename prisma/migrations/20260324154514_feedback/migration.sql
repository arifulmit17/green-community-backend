-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "ideaId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_ideaId_key" ON "Feedback"("ideaId");

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
