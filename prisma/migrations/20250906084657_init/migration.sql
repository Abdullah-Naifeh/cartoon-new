-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'CONTENT_CREATOR');

-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('FREE', 'MONTHLY', 'YEARLY', 'LIFETIME');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('SERIES', 'MOVIE', 'SONG', 'EPISODE');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('ARABIC', 'ENGLISH', 'TURKISH');

-- CreateEnum
CREATE TYPE "ContentCategory" AS ENUM ('SPACE_TOON', 'REGULAR');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "subscriptionType" "SubscriptionType" NOT NULL DEFAULT 'FREE',
    "monthly_subscription" BOOLEAN NOT NULL DEFAULT false,
    "yearly_subscription" BOOLEAN NOT NULL DEFAULT false,
    "subscriptionStart" TIMESTAMP(3),
    "subscriptionEnd" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "avatar" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaseMedia" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "duration" TEXT,
    "genre" TEXT,
    "releaseDate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "planetName" TEXT,
    "most_viewed" BOOLEAN NOT NULL DEFAULT false,
    "old_cartoon" BOOLEAN NOT NULL DEFAULT false,
    "subscripted" BOOLEAN NOT NULL DEFAULT false,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION DEFAULT 0.0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT,

    CONSTRAINT "BaseMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arabic_series" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "language" TEXT DEFAULT 'ar',
    "episodes" INTEGER NOT NULL DEFAULT 1,
    "season" INTEGER NOT NULL DEFAULT 1,
    "genre" TEXT,
    "releaseDate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "planetName" TEXT,
    "most_viewed" BOOLEAN NOT NULL DEFAULT false,
    "old_cartoon" BOOLEAN NOT NULL DEFAULT false,
    "subscripted" BOOLEAN NOT NULL DEFAULT false,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION DEFAULT 0.0,
    "director" TEXT,
    "actors" TEXT,
    "production" TEXT,
    "userId" TEXT,

    CONSTRAINT "arabic_series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arabic_episodes" (
    "id" TEXT NOT NULL,
    "episode" TEXT NOT NULL,
    "seriesName" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "planetName" TEXT,
    "language" TEXT DEFAULT 'ar',
    "duration" TEXT,
    "episode_number" INTEGER NOT NULL,
    "season_number" INTEGER NOT NULL DEFAULT 1,
    "releaseDate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION DEFAULT 0.0,
    "video_url" TEXT NOT NULL,
    "subtitles_url" TEXT,
    "is_free" BOOLEAN NOT NULL DEFAULT false,
    "seriesId" TEXT,
    "userId" TEXT,

    CONSTRAINT "arabic_episodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arabic_movies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "planetName" TEXT,
    "language" TEXT DEFAULT 'ar',
    "duration" TEXT,
    "genre" TEXT,
    "releaseDate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "most_viewed" BOOLEAN NOT NULL DEFAULT false,
    "old_cartoon" BOOLEAN NOT NULL DEFAULT false,
    "subscripted" BOOLEAN NOT NULL DEFAULT false,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION DEFAULT 0.0,
    "director" TEXT,
    "actors" TEXT,
    "production" TEXT,
    "video_url" TEXT,
    "subtitles_url" TEXT,
    "userId" TEXT,

    CONSTRAINT "arabic_movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arabic_songs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "planetName" TEXT,
    "language" TEXT DEFAULT 'ar',
    "duration" TEXT,
    "genre" TEXT,
    "releaseDate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "most_viewed" BOOLEAN NOT NULL DEFAULT false,
    "subscripted" BOOLEAN NOT NULL DEFAULT false,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION DEFAULT 0.0,
    "artist" TEXT,
    "album" TEXT,
    "lyrics" TEXT,
    "audio_url" TEXT,
    "userId" TEXT,

    CONSTRAINT "arabic_songs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "english_series" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "language" TEXT DEFAULT 'en',
    "episodes" INTEGER NOT NULL DEFAULT 1,
    "season" INTEGER NOT NULL DEFAULT 1,
    "genre" TEXT,
    "releaseDate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "planetName" TEXT,
    "most_viewed" BOOLEAN NOT NULL DEFAULT false,
    "old_cartoon" BOOLEAN NOT NULL DEFAULT false,
    "subscripted" BOOLEAN NOT NULL DEFAULT false,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION DEFAULT 0.0,
    "network" TEXT,
    "imdb_rating" DOUBLE PRECISION,
    "userId" TEXT,

    CONSTRAINT "english_series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "english_episodes" (
    "id" TEXT NOT NULL,
    "episode" TEXT NOT NULL,
    "seriesName" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "planetName" TEXT,
    "language" TEXT DEFAULT 'en',
    "duration" TEXT,
    "episode_number" INTEGER NOT NULL,
    "season_number" INTEGER NOT NULL DEFAULT 1,
    "releaseDate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION DEFAULT 0.0,
    "video_url" TEXT NOT NULL,
    "subtitles_url" TEXT,
    "is_free" BOOLEAN NOT NULL DEFAULT false,
    "seriesId" TEXT,
    "userId" TEXT,

    CONSTRAINT "english_episodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "english_movies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "planetName" TEXT,
    "language" TEXT DEFAULT 'en',
    "duration" TEXT,
    "genre" TEXT,
    "releaseDate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "most_viewed" BOOLEAN NOT NULL DEFAULT false,
    "old_cartoon" BOOLEAN NOT NULL DEFAULT false,
    "subscripted" BOOLEAN NOT NULL DEFAULT false,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION DEFAULT 0.0,
    "director" TEXT,
    "imdb_rating" DOUBLE PRECISION,
    "budget" TEXT,
    "video_url" TEXT,
    "subtitles_url" TEXT,
    "userId" TEXT,

    CONSTRAINT "english_movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "english_songs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "planetName" TEXT,
    "language" TEXT DEFAULT 'en',
    "duration" TEXT,
    "genre" TEXT,
    "releaseDate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "most_viewed" BOOLEAN NOT NULL DEFAULT false,
    "subscripted" BOOLEAN NOT NULL DEFAULT false,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION DEFAULT 0.0,
    "artist" TEXT,
    "album" TEXT,
    "spotify_link" TEXT,
    "audio_url" TEXT,
    "userId" TEXT,

    CONSTRAINT "english_songs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "turkish_series" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "language" TEXT DEFAULT 'tr',
    "episodes" INTEGER NOT NULL DEFAULT 1,
    "season" INTEGER NOT NULL DEFAULT 1,
    "genre" TEXT,
    "releaseDate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "planetName" TEXT,
    "most_viewed" BOOLEAN NOT NULL DEFAULT false,
    "old_cartoon" BOOLEAN NOT NULL DEFAULT false,
    "subscripted" BOOLEAN NOT NULL DEFAULT false,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION DEFAULT 0.0,
    "channel" TEXT,
    "total_seasons" INTEGER,
    "userId" TEXT,

    CONSTRAINT "turkish_series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "turkish_episodes" (
    "id" TEXT NOT NULL,
    "episode" TEXT NOT NULL,
    "seriesName" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "planetName" TEXT,
    "language" TEXT DEFAULT 'tr',
    "duration" TEXT,
    "episode_number" INTEGER NOT NULL,
    "season_number" INTEGER NOT NULL DEFAULT 1,
    "releaseDate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION DEFAULT 0.0,
    "video_url" TEXT NOT NULL,
    "subtitles_url" TEXT,
    "is_free" BOOLEAN NOT NULL DEFAULT false,
    "seriesId" TEXT,
    "userId" TEXT,

    CONSTRAINT "turkish_episodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "turkish_movies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "planetName" TEXT,
    "language" TEXT DEFAULT 'tr',
    "duration" TEXT,
    "genre" TEXT,
    "releaseDate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "most_viewed" BOOLEAN NOT NULL DEFAULT false,
    "old_cartoon" BOOLEAN NOT NULL DEFAULT false,
    "subscripted" BOOLEAN NOT NULL DEFAULT false,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION DEFAULT 0.0,
    "director" TEXT,
    "awards" TEXT,
    "video_url" TEXT,
    "subtitles_url" TEXT,
    "userId" TEXT,

    CONSTRAINT "turkish_movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "turkish_songs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "language" TEXT DEFAULT 'tr',
    "duration" TEXT,
    "genre" TEXT,
    "releaseDate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "planetName" TEXT,
    "most_viewed" BOOLEAN NOT NULL DEFAULT false,
    "subscripted" BOOLEAN NOT NULL DEFAULT false,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION DEFAULT 0.0,
    "artist" TEXT,
    "album" TEXT,
    "is_traditional" BOOLEAN NOT NULL DEFAULT false,
    "audio_url" TEXT,
    "userId" TEXT,

    CONSTRAINT "turkish_songs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "space_toon_songs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "planetName" TEXT,
    "duration" TEXT,
    "genre" TEXT,
    "releaseDate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "most_viewed" BOOLEAN NOT NULL DEFAULT false,
    "subscripted" BOOLEAN NOT NULL DEFAULT false,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION DEFAULT 0.0,
    "artist" TEXT,
    "cartoon" TEXT,
    "is_original" BOOLEAN NOT NULL DEFAULT true,
    "audio_url" TEXT,
    "userId" TEXT,

    CONSTRAINT "space_toon_songs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "arabic_episodes_seriesId_idx" ON "arabic_episodes"("seriesId");

-- CreateIndex
CREATE INDEX "arabic_episodes_userId_idx" ON "arabic_episodes"("userId");

-- CreateIndex
CREATE INDEX "english_episodes_seriesId_idx" ON "english_episodes"("seriesId");

-- CreateIndex
CREATE INDEX "english_episodes_userId_idx" ON "english_episodes"("userId");

-- CreateIndex
CREATE INDEX "turkish_episodes_seriesId_idx" ON "turkish_episodes"("seriesId");

-- CreateIndex
CREATE INDEX "turkish_episodes_userId_idx" ON "turkish_episodes"("userId");

-- AddForeignKey
ALTER TABLE "BaseMedia" ADD CONSTRAINT "BaseMedia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arabic_series" ADD CONSTRAINT "arabic_series_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arabic_episodes" ADD CONSTRAINT "arabic_episodes_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "arabic_series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arabic_episodes" ADD CONSTRAINT "arabic_episodes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arabic_movies" ADD CONSTRAINT "arabic_movies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arabic_songs" ADD CONSTRAINT "arabic_songs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "english_series" ADD CONSTRAINT "english_series_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "english_episodes" ADD CONSTRAINT "english_episodes_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "english_series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "english_episodes" ADD CONSTRAINT "english_episodes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "english_movies" ADD CONSTRAINT "english_movies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "english_songs" ADD CONSTRAINT "english_songs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turkish_series" ADD CONSTRAINT "turkish_series_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turkish_episodes" ADD CONSTRAINT "turkish_episodes_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "turkish_series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turkish_episodes" ADD CONSTRAINT "turkish_episodes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turkish_movies" ADD CONSTRAINT "turkish_movies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turkish_songs" ADD CONSTRAINT "turkish_songs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space_toon_songs" ADD CONSTRAINT "space_toon_songs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
