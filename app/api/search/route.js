import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET - بحث متقدم في جميع المحتويات
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'all'; // all, series, movie, song, episode
    const language = searchParams.get('language') || 'all'; // all, arabic, english, turkish
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    if (!query) {
      return NextResponse.json({ error: 'كلمة البحث مطلوبة' }, { status: 400 });
    }

    let results = {};
    let total = 0;

    // البحث في المسلسلات العربية
    if (type === 'all' || type === 'series') {
      if (language === 'all' || language === 'arabic') {
        const [arabicSeries, arabicSeriesCount] = await Promise.all([
          prisma.arabicSeries.findMany({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
            skip,
            take: limit,
            include: {
              arabicEpisodes: {
                take: 5,
                orderBy: { episodeNumber: 'asc' },
              },
            },
          }),
          prisma.arabicSeries.count({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
          }),
        ]);
        results.arabicSeries = arabicSeries;
        total += arabicSeriesCount;
      }
    }

    // البحث في المسلسلات الإنجليزية
    if (type === 'all' || type === 'series') {
      if (language === 'all' || language === 'english') {
        const [englishSeries, englishSeriesCount] = await Promise.all([
          prisma.englishSeries.findMany({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
            skip,
            take: limit,
            include: {
              englishEpisodes: {
                take: 5,
                orderBy: { episodeNumber: 'asc' },
              },
            },
          }),
          prisma.englishSeries.count({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
          }),
        ]);
        results.englishSeries = englishSeries;
        total += englishSeriesCount;
      }
    }

    // البحث في المسلسلات التركية
    if (type === 'all' || type === 'series') {
      if (language === 'all' || language === 'turkish') {
        const [turkishSeries, turkishSeriesCount] = await Promise.all([
          prisma.turkishSeries.findMany({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
            skip,
            take: limit,
            include: {
              turkishEpisodes: {
                take: 5,
                orderBy: { episodeNumber: 'asc' },
              },
            },
          }),
          prisma.turkishSeries.count({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
          }),
        ]);
        results.turkishSeries = turkishSeries;
        total += turkishSeriesCount;
      }
    }

    // البحث في الأفلام العربية
    if (type === 'all' || type === 'movie') {
      if (language === 'all' || language === 'arabic') {
        const [arabicMovies, arabicMoviesCount] = await Promise.all([
          prisma.arabicMovie.findMany({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
            skip,
            take: limit,
          }),
          prisma.arabicMovie.count({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
          }),
        ]);
        results.arabicMovies = arabicMovies;
        total += arabicMoviesCount;
      }
    }

    // البحث في الأفلام الإنجليزية
    if (type === 'all' || type === 'movie') {
      if (language === 'all' || language === 'english') {
        const [englishMovies, englishMoviesCount] = await Promise.all([
          prisma.englishMovie.findMany({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
            skip,
            take: limit,
          }),
          prisma.englishMovie.count({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
          }),
        ]);
        results.englishMovies = englishMovies;
        total += englishMoviesCount;
      }
    }

    // البحث في الأفلام التركية
    if (type === 'all' || type === 'movie') {
      if (language === 'all' || language === 'turkish') {
        const [turkishMovies, turkishMoviesCount] = await Promise.all([
          prisma.turkishMovie.findMany({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
            skip,
            take: limit,
          }),
          prisma.turkishMovie.count({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
          }),
        ]);
        results.turkishMovies = turkishMovies;
        total += turkishMoviesCount;
      }
    }

    // البحث في الأغاني العربية
    if (type === 'all' || type === 'song') {
      if (language === 'all' || language === 'arabic') {
        const [arabicSongs, arabicSongsCount] = await Promise.all([
          prisma.arabicSong.findMany({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { artist: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
            skip,
            take: limit,
          }),
          prisma.arabicSong.count({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { artist: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
          }),
        ]);
        results.arabicSongs = arabicSongs;
        total += arabicSongsCount;
      }
    }

    // البحث في الأغاني الإنجليزية
    if (type === 'all' || type === 'song') {
      if (language === 'all' || language === 'english') {
        const [englishSongs, englishSongsCount] = await Promise.all([
          prisma.englishSong.findMany({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { artist: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
            skip,
            take: limit,
          }),
          prisma.englishSong.count({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { artist: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
          }),
        ]);
        results.englishSongs = englishSongs;
        total += englishSongsCount;
      }
    }

    // البحث في الأغاني التركية
    if (type === 'all' || type === 'song') {
      if (language === 'all' || language === 'turkish') {
        const [turkishSongs, turkishSongsCount] = await Promise.all([
          prisma.turkishSong.findMany({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { artist: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
            skip,
            take: limit,
          }),
          prisma.turkishSong.count({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { artist: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
          }),
        ]);
        results.turkishSongs = turkishSongs;
        total += turkishSongsCount;
      }
    }

    // البحث في أغاني سبيس تون
    if (type === 'all' || type === 'song') {
      if (language === 'all') {
        const [spaceToonSongs, spaceToonSongsCount] = await Promise.all([
          prisma.spaceToonSong.findMany({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { artist: { contains: query, mode: 'insensitive' } },
                { cartoon: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
            skip,
            take: limit,
          }),
          prisma.spaceToonSong.count({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { artist: { contains: query, mode: 'insensitive' } },
                { cartoon: { contains: query, mode: 'insensitive' } },
                { genre: { contains: query, mode: 'insensitive' } },
              ],
            },
          }),
        ]);
        results.spaceToonSongs = spaceToonSongs;
        total += spaceToonSongsCount;
      }
    }

    // البحث في الحلقات العربية
    if (type === 'all' || type === 'episode') {
      if (language === 'all' || language === 'arabic') {
        const [arabicEpisodes, arabicEpisodesCount] = await Promise.all([
          prisma.arabicEpisode.findMany({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
              ],
            },
            skip,
            take: limit,
            include: {
              series: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          }),
          prisma.arabicEpisode.count({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
              ],
            },
          }),
        ]);
        results.arabicEpisodes = arabicEpisodes;
        total += arabicEpisodesCount;
      }
    }

    // البحث في الحلقات الإنجليزية
    if (type === 'all' || type === 'episode') {
      if (language === 'all' || language === 'english') {
        const [englishEpisodes, englishEpisodesCount] = await Promise.all([
          prisma.englishEpisode.findMany({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
              ],
            },
            skip,
            take: limit,
            include: {
              series: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          }),
          prisma.englishEpisode.count({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
              ],
            },
          }),
        ]);
        results.englishEpisodes = englishEpisodes;
        total += englishEpisodesCount;
      }
    }

    // البحث في الحلقات التركية
    if (type === 'all' || type === 'episode') {
      if (language === 'all' || language === 'turkish') {
        const [turkishEpisodes, turkishEpisodesCount] = await Promise.all([
          prisma.turkishEpisode.findMany({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
              ],
            },
            skip,
            take: limit,
            include: {
              series: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          }),
          prisma.turkishEpisode.count({
            where: {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
              ],
            },
          }),
        ]);
        results.turkishEpisodes = turkishEpisodes;
        total += turkishEpisodesCount;
      }
    }

    return NextResponse.json({
      results,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'فشل في البحث' }, { status: 500 });
  }
}
