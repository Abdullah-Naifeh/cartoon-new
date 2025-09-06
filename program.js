const { PrismaClient, UserRole, SubscriptionType } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

// بيانات الكواكب
const arabicCartoonPlanet = ['مغامرات', 'زمردة', 'أكشن', 'رياضة', 'بون بونة'];
const arabicMoviesPlanet = ['أفلام لغة عربية'];
const kidsSongsPlanet = ['أغاني أطفال'];

const englishCartoonPlanet = ['كرتون لغة انجليزية'];
const englishMoviesPlanet = ['أفلام لغة إنجليزية'];
const englishSongsPlanet = ['أغاني لغة انجليزية'];

const turkishCartoonPlanet = ['كرتون لغة تركية'];
const turkishMoviesPlanet = ['أفلام لغة تركية'];
const turkishSongsPlanet = ['أغاني لغة تركية'];

// إنشاء مستخدمين مزيفين
async function createFakeUsers(count = 20) {
  console.log('جاري إنشاء المستخدمين...');
  const users = [];

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const userData = {
      email: faker.internet.email({ firstName, lastName }),
      name: `${firstName} ${lastName}`,
      password: faker.internet.password(),
      role: faker.helpers.arrayElement(Object.values(UserRole)),
      subscriptionType: faker.helpers.arrayElement(
        Object.values(SubscriptionType)
      ),
      monthlySubscription: faker.datatype.boolean(),
      yearlySubscription: faker.datatype.boolean(),
      subscriptionStart: faker.date.past(),
      subscriptionEnd: faker.date.future(),
      isActive: faker.datatype.boolean(0.8),
      avatar: faker.image.avatar(),
    };

    try {
      const user = await prisma.user.create({ data: userData });
      users.push(user);
      console.log(`تم إنشاء المستخدم: ${user.name}`);
    } catch (error) {
      console.error('خطأ في إنشاء المستخدم:', error.message);
    }
  }

  return users;
}

// إنشاء مسلسلات عربية
async function createFakeArabicSeries(users, count = 50) {
  console.log('جاري إنشاء المسلسلات العربية...');
  const seriesList = [];

  for (let i = 0; i < count; i++) {
    const seriesData = {
      title: `مسلسل ${faker.word.adjective()} ${faker.word.noun()}`,
      description: faker.lorem.paragraph(),
      imageUrl: faker.image.urlLoremFlickr({ category: 'cartoon' }),
      episodes: faker.number.int({ min: 10, max: 100 }),
      season: faker.number.int({ min: 1, max: 5 }),
      genre: faker.helpers.arrayElement([
        'كوميدي',
        'مغامرات',
        'خيال علمي',
        'أكشن',
        'دراما',
      ]),
      releaseDate: faker.date.past({ years: 5 }),
      planetName: faker.helpers.arrayElement(arabicCartoonPlanet),
      mostViewed: faker.datatype.boolean(0.2),
      oldCartoon: faker.datatype.boolean(0.3),
      subscribed: faker.datatype.boolean(0.4),
      viewsCount: faker.number.int({ min: 0, max: 1000000 }),
      rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
      director: faker.person.fullName(),
      actors: Array.from({ length: 3 }, () => faker.person.fullName()).join(
        ', '
      ),
      production: faker.company.name(),
      userId: faker.helpers.arrayElement(users).id,
    };

    try {
      const series = await prisma.arabicSeries.create({ data: seriesData });
      seriesList.push(series);
      console.log(
        `تم إنشاء المسلسل العربي: ${series.title} - كوكب: ${series.planetName}`
      );
    } catch (error) {
      console.error('خطأ في إنشاء المسلسل العربي:', error.message);
    }
  }

  return seriesList;
}

// إنشاء حلقات عربية
async function createFakeArabicEpisodes(
  seriesList,
  users,
  countPerSeries = 20
) {
  console.log('جاري إنشاء الحلقات العربية...');
  const episodes = [];

  for (const series of seriesList) {
    for (let i = 0; i < countPerSeries; i++) {
      const episodeData = {
        episode: `الحلقة ${
          i + 1
        } - ${faker.word.adjective()} ${faker.word.noun()}`,
        seriesName: series.title,

        description: faker.lorem.sentence(),
        imageUrl: faker.image.urlLoremFlickr({ category: 'cartoon' }),
        planetName: series.planetName,
        duration: `${faker.number.int({ min: 10, max: 30 })}:00`,
        episodeNumber: i + 1,
        seasonNumber: series.season,
        releaseDate: faker.date.past({ years: 2 }),
        viewsCount: faker.number.int({ min: 0, max: 500000 }),
        rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
        videoUrl: faker.internet.url(),
        subtitlesUrl: faker.datatype.boolean(0.3) ? faker.internet.url() : null,
        isFree: faker.datatype.boolean(0.7),
        seriesId: series.id,
        userId: faker.helpers.arrayElement(users).id,
      };

      try {
        const episode = await prisma.arabicEpisode.create({
          data: episodeData,
        });
        episodes.push(episode);
        console.log(
          `تم إنشاء الحلقة العربية: ${episode.episode} للمسلسل: ${series.title}`
        );
      } catch (error) {
        console.error('خطأ في إنشاء الحلقة العربية:', error.message);
      }
    }
  }

  return episodes;
}

// إنشاء أفلام عربية
async function createFakeArabicMovies(users, count = 50) {
  console.log('جاري إنشاء الأفلام العربية...');
  const movies = [];

  for (let i = 0; i < count; i++) {
    const movieData = {
      title: `فيلم ${faker.word.adjective()} ${faker.word.noun()}`,
      description: faker.lorem.paragraph(),
      imageUrl: faker.image.urlLoremFlickr({ category: 'movie' }),
      planetName: faker.helpers.arrayElement(arabicMoviesPlanet),
      duration: `${faker.number.int({ min: 60, max: 180 })}:00`,
      genre: faker.helpers.arrayElement([
        'كوميدي',
        'مغامرات',
        'خيال علمي',
        'أكشن',
        'دراما',
      ]),
      releaseDate: faker.date.past({ years: 10 }),
      mostViewed: faker.datatype.boolean(0.2),
      oldCartoon: faker.datatype.boolean(0.3),
      subscribed: faker.datatype.boolean(0.4),
      viewsCount: faker.number.int({ min: 0, max: 2000000 }),
      rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
      director: faker.person.fullName(),
      actors: Array.from({ length: 5 }, () => faker.person.fullName()).join(
        ', '
      ),
      production: faker.company.name(),
      videoUrl: faker.internet.url(),
      subtitlesUrl: faker.datatype.boolean(0.3) ? faker.internet.url() : null,
      userId: faker.helpers.arrayElement(users).id,
    };

    try {
      const movie = await prisma.arabicMovie.create({ data: movieData });
      movies.push(movie);
      console.log(`تم إنشاء الفيلم العربي: ${movie.title}`);
    } catch (error) {
      console.error('خطأ في إنشاء الفيلم العربي:', error.message);
    }
  }

  return movies;
}

// إنشاء أغاني عربية
async function createFakeArabicSongs(users, count = 50) {
  console.log('جاري إنشاء الأغاني العربية...');
  const songs = [];

  for (let i = 0; i < count; i++) {
    const songData = {
      title: `أغنية ${faker.word.adjective()} ${faker.word.noun()}`,
      description: faker.lorem.sentence(),
      imageUrl: faker.image.urlLoremFlickr({ category: 'music' }),
      planetName: faker.helpers.arrayElement(kidsSongsPlanet),
      duration: `${faker.number.int({ min: 2, max: 6 })}:${faker.number
        .int({ min: 0, max: 59 })
        .toString()
        .padStart(2, '0')}`,
      genre: faker.helpers.arrayElement([
        'بوب',
        'راب',
        'كلاسيكي',
        'روك',
        'هادئ',
      ]),
      releaseDate: faker.date.past({ years: 5 }),
      mostViewed: faker.datatype.boolean(0.2),
      subscribed: faker.datatype.boolean(0.4),
      viewsCount: faker.number.int({ min: 0, max: 1000000 }),
      rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
      artist: faker.person.fullName(),
      album: `ألبوم ${faker.word.adjective()}`,
      lyrics: faker.lorem.paragraphs(2),
      audioUrl: faker.internet.url(),
      userId: faker.helpers.arrayElement(users).id,
    };

    try {
      const song = await prisma.arabicSong.create({ data: songData });
      songs.push(song);
      console.log(`تم إنشاء الأغنية العربية: ${song.title}`);
    } catch (error) {
      console.error('خطأ في إنشاء الأغنية العربية:', error.message);
    }
  }

  return songs;
}

// إنشاء أغاني سبيس تون
async function createFakeSpaceToonSongs(users, count = 50) {
  console.log('جاري إنشاء أغاني سبيس تون...');
  const songs = [];
  const cartoons = [
    'فتى الحرية',
    'سلام دانك',
    'العداء السريع',
    'المحقق كونان',
    'ساندي بل',
  ];

  for (let i = 0; i < count; i++) {
    const songData = {
      title: `أغنية ${faker.word.adjective()} ${faker.helpers.arrayElement(
        cartoons
      )}`,
      description: faker.lorem.sentence(),
      imageUrl: faker.image.urlLoremFlickr({ category: 'cartoon' }),
      planetName: 'سبيس تون',
      duration: `${faker.number.int({ min: 2, max: 5 })}:${faker.number
        .int({ min: 0, max: 59 })
        .toString()
        .padStart(2, '0')}`,
      genre: faker.helpers.arrayElement(['شارة', 'تتر', 'خلفية', 'نهاية']),
      releaseDate: faker.date.past({ years: 5 }),
      mostViewed: faker.datatype.boolean(0.2),
      subscribed: faker.datatype.boolean(0.4),
      viewsCount: faker.number.int({ min: 0, max: 1500000 }),
      rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
      artist: faker.person.fullName(),
      cartoon: faker.helpers.arrayElement(cartoons),
      isOriginal: faker.datatype.boolean(0.7),
      audioUrl: faker.internet.url(),
      userId: faker.helpers.arrayElement(users).id,
    };

    try {
      const song = await prisma.spaceToonSong.create({ data: songData });
      songs.push(song);
      console.log(`تم إنشاء أغنية سبيس تون: ${song.title}`);
    } catch (error) {
      console.error('خطأ في إنشاء أغنية سبيس تون:', error.message);
    }
  }

  return songs;
}

// إنشاء مسلسلات إنجليزية
async function createFakeEnglishSeries(users, count = 50) {
  console.log('جاري إنشاء المسلسلات الإنجليزية...');
  const seriesList = [];

  for (let i = 0; i < count; i++) {
    const seriesData = {
      title: `${faker.word.adjective()} ${faker.word.noun()} Series`,
      description: faker.lorem.paragraph(),
      imageUrl: faker.image.urlLoremFlickr({ category: 'cartoon' }),
      episodes: faker.number.int({ min: 10, max: 200 }),
      season: faker.number.int({ min: 1, max: 10 }),
      genre: faker.helpers.arrayElement([
        'Comedy',
        'Adventure',
        'Sci-Fi',
        'Action',
        'Drama',
      ]),
      releaseDate: faker.date.past({ years: 10 }),
      planetName: faker.helpers.arrayElement(englishCartoonPlanet),
      mostViewed: faker.datatype.boolean(0.2),
      oldCartoon: faker.datatype.boolean(0.3),
      subscribed: faker.datatype.boolean(0.4),
      viewsCount: faker.number.int({ min: 0, max: 2000000 }),
      rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
      network: faker.helpers.arrayElement([
        'Cartoon Network',
        'Nickelodeon',
        'Disney Channel',
        'Netflix',
        'Amazon Prime',
      ]),
      imdbRating: faker.number.float({ min: 0, max: 10, precision: 0.1 }),
      userId: faker.helpers.arrayElement(users).id,
    };

    try {
      const series = await prisma.englishSeries.create({ data: seriesData });
      seriesList.push(series);
      console.log(
        `تم إنشاء المسلسل الإنجليزي: ${series.title} - كوكب: ${series.planetName}`
      );
    } catch (error) {
      console.error('خطأ في إنشاء المسلسل الإنجليزي:', error.message);
    }
  }

  return seriesList;
}

// إنشاء حلقات إنجليزية
async function createFakeEnglishEpisodes(
  seriesList,
  users,
  countPerSeries = 20
) {
  console.log('جاري إنشاء الحلقات الإنجليزية...');
  const episodes = [];

  for (const series of seriesList) {
    for (let i = 0; i < countPerSeries; i++) {
      const episodeData = {
        episode: `Episode ${
          i + 1
        } - ${faker.word.adjective()} ${faker.word.noun()}`,
        seriesName: series.title,

        description: faker.lorem.sentence(),
        imageUrl: faker.image.urlLoremFlickr({ category: 'cartoon' }),
        planetName: series.planetName,
        duration: `${faker.number.int({ min: 20, max: 45 })}:00`,
        episodeNumber: i + 1,
        seasonNumber: series.season,
        releaseDate: faker.date.past({ years: 2 }),
        viewsCount: faker.number.int({ min: 0, max: 1000000 }),
        rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
        videoUrl: faker.internet.url(),
        subtitlesUrl: faker.datatype.boolean(0.4) ? faker.internet.url() : null,
        isFree: faker.datatype.boolean(0.6),
        seriesId: series.id,
        userId: faker.helpers.arrayElement(users).id,
      };

      try {
        const episode = await prisma.englishEpisode.create({
          data: episodeData,
        });
        episodes.push(episode);
        console.log(
          `تم إنشاء الحلقة الإنجليزية: ${episode.episode} للمسلسل: ${series.title}`
        );
      } catch (error) {
        console.error('خطأ في إنشاء الحلقة الإنجليزية:', error.message);
      }
    }
  }

  return episodes;
}

// إنشاء أفلام إنجليزية
async function createFakeEnglishMovies(users, count = 50) {
  console.log('جاري إنشاء الأفلام الإنجليزية...');
  const movies = [];

  for (let i = 0; i < count; i++) {
    const movieData = {
      title: `${faker.word.adjective()} ${faker.word.noun()} Movie`,
      description: faker.lorem.paragraph(),
      imageUrl: faker.image.urlLoremFlickr({ category: 'movie' }),
      planetName: faker.helpers.arrayElement(englishMoviesPlanet),
      duration: `${faker.number.int({ min: 80, max: 180 })}:00`,
      genre: faker.helpers.arrayElement([
        'Comedy',
        'Adventure',
        'Sci-Fi',
        'Action',
        'Drama',
      ]),
      releaseDate: faker.date.past({ years: 15 }),
      mostViewed: faker.datatype.boolean(0.2),
      oldCartoon: faker.datatype.boolean(0.2),
      subscribed: faker.datatype.boolean(0.4),
      viewsCount: faker.number.int({ min: 0, max: 3000000 }),
      rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
      director: faker.person.fullName(),
      imdbRating: faker.number.float({ min: 0, max: 10, precision: 0.1 }),
      budget: `$${faker.number.int({ min: 1, max: 200 })} million`,
      videoUrl: faker.internet.url(),
      subtitlesUrl: faker.datatype.boolean(0.4) ? faker.internet.url() : null,
      userId: faker.helpers.arrayElement(users).id,
    };

    try {
      const movie = await prisma.englishMovie.create({ data: movieData });
      movies.push(movie);
      console.log(`تم إنشاء الفيلم الإنجليزي: ${movie.title}`);
    } catch (error) {
      console.error('خطأ في إنشاء الفيلم الإنجليزي:', error.message);
    }
  }

  return movies;
}

// إنشاء أغاني إنجليزية
async function createFakeEnglishSongs(users, count = 50) {
  console.log('جاري إنشاء الأغاني الإنجليزية...');
  const songs = [];

  for (let i = 0; i < count; i++) {
    const songData = {
      title: `${faker.word.adjective()} ${faker.word.noun()} Song`,
      description: faker.lorem.sentence(),
      imageUrl: faker.image.urlLoremFlickr({ category: 'music' }),
      planetName: faker.helpers.arrayElement(englishSongsPlanet),
      duration: `${faker.number.int({ min: 2, max: 5 })}:${faker.number
        .int({ min: 0, max: 59 })
        .toString()
        .padStart(2, '0')}`,
      genre: faker.helpers.arrayElement([
        'Pop',
        'Rock',
        'Hip Hop',
        'Electronic',
        'R&B',
      ]),
      releaseDate: faker.date.past({ years: 5 }),
      mostViewed: faker.datatype.boolean(0.2),
      subscribed: faker.datatype.boolean(0.4),
      viewsCount: faker.number.int({ min: 0, max: 2000000 }),
      rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
      artist: faker.person.fullName(),
      album: `${faker.word.adjective()} Album`,
      spotifyLink: faker.datatype.boolean(0.7) ? faker.internet.url() : null,
      audioUrl: faker.internet.url(),
      userId: faker.helpers.arrayElement(users).id,
    };

    try {
      const song = await prisma.englishSong.create({ data: songData });
      songs.push(song);
      console.log(`تم إنشاء الأغنية الإنجليزية: ${song.title}`);
    } catch (error) {
      console.error('خطأ في إنشاء الأغنية الإنجليزية:', error.message);
    }
  }

  return songs;
}

// إنشاء مسلسلات تركية
async function createFakeTurkishSeries(users, count = 50) {
  console.log('جاري إنشاء المسلسلات التركية...');
  const seriesList = [];

  for (let i = 0; i < count; i++) {
    const seriesData = {
      title: `${faker.word.adjective()} ${faker.word.noun()} Dizisi`,
      description: faker.lorem.paragraph(),
      imageUrl: faker.image.urlLoremFlickr({ category: 'drama' }),
      episodes: faker.number.int({ min: 10, max: 100 }),
      season: faker.number.int({ min: 1, max: 5 }),
      genre: faker.helpers.arrayElement([
        'Dram',
        'Komedi',
        'Aksiyon',
        'Romantik',
        'Tarih',
      ]),
      releaseDate: faker.date.past({ years: 5 }),
      planetName: faker.helpers.arrayElement(turkishCartoonPlanet),
      mostViewed: faker.datatype.boolean(0.2),
      oldCartoon: faker.datatype.boolean(0.1),
      subscribed: faker.datatype.boolean(0.4),
      viewsCount: faker.number.int({ min: 0, max: 1500000 }),
      rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
      channel: faker.helpers.arrayElement([
        'TRT',
        'ATV',
        'Show TV',
        'Star TV',
        'Kanal D',
      ]),
      totalSeasons: faker.number.int({ min: 1, max: 8 }),
      userId: faker.helpers.arrayElement(users).id,
    };

    try {
      const series = await prisma.turkishSeries.create({ data: seriesData });
      seriesList.push(series);
      console.log(
        `تم إنشاء المسلسل التركي: ${series.title} - كوكب: ${series.planetName}`
      );
    } catch (error) {
      console.error('خطأ في إنشاء المسلسل التركي:', error.message);
    }
  }

  return seriesList;
}

// إنشاء حلقات تركية
async function createFakeTurkishEpisodes(
  seriesList,
  users,
  countPerSeries = 20
) {
  console.log('جاري إنشاء الحلقات التركية...');
  const episodes = [];

  for (const series of seriesList) {
    for (let i = 0; i < countPerSeries; i++) {
      const episodeData = {
        episode: `${
          i + 1
        }. Bölüm - ${faker.word.adjective()} ${faker.word.noun()}`,
        seriesName: series.title,

        description: faker.lorem.sentence(),
        imageUrl: faker.image.urlLoremFlickr({ category: 'drama' }),
        planetName: series.planetName,
        duration: `${faker.number.int({ min: 40, max: 120 })}:00`,
        episodeNumber: i + 1,
        seasonNumber: series.season,
        releaseDate: faker.date.past({ years: 2 }),
        viewsCount: faker.number.int({ min: 0, max: 800000 }),
        rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
        videoUrl: faker.internet.url(),
        subtitlesUrl: faker.datatype.boolean(0.5) ? faker.internet.url() : null,
        isFree: faker.datatype.boolean(0.5),
        seriesId: series.id,
        userId: faker.helpers.arrayElement(users).id,
      };

      try {
        const episode = await prisma.turkishEpisode.create({
          data: episodeData,
        });
        episodes.push(episode);
        console.log(
          `تم إنشاء الحلقة التركية: ${episode.episode} للمسلسل: ${series.title}`
        );
      } catch (error) {
        console.error('خطأ في إنشاء الحلقة التركية:', error.message);
      }
    }
  }

  return episodes;
}

// إنشاء أفلام تركية
async function createFakeTurkishMovies(users, count = 50) {
  console.log('جاري إنشاء الأفلام التركية...');
  const movies = [];

  for (let i = 0; i < count; i++) {
    const movieData = {
      title: `${faker.word.adjective()} ${faker.word.noun()} Filmi`,
      description: faker.lorem.paragraph(),
      imageUrl: faker.image.urlLoremFlickr({ category: 'movie' }),
      planetName: faker.helpers.arrayElement(turkishMoviesPlanet),
      duration: `${faker.number.int({ min: 90, max: 150 })}:00`,
      genre: faker.helpers.arrayElement([
        'Dram',
        'Komedi',
        'Aksiyon',
        'Romantik',
        'Tarih',
      ]),
      releaseDate: faker.date.past({ years: 10 }),
      mostViewed: faker.datatype.boolean(0.2),
      oldCartoon: faker.datatype.boolean(0.1),
      subscribed: faker.datatype.boolean(0.4),
      viewsCount: faker.number.int({ min: 0, max: 1200000 }),
      rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
      director: faker.person.fullName(),
      awards: faker.helpers.arrayElement([
        'Altın Portakal',
        'Antalya Film Festivali',
        'Yok',
        'Uluslararası Ödüller',
      ]),
      videoUrl: faker.internet.url(),
      subtitlesUrl: faker.datatype.boolean(0.4) ? faker.internet.url() : null,
      userId: faker.helpers.arrayElement(users).id,
    };

    try {
      const movie = await prisma.turkishMovie.create({ data: movieData });
      movies.push(movie);
      console.log(`تم إنشاء الفيلم التركي: ${movie.title}`);
    } catch (error) {
      console.error('خطأ في إنشاء الفيلم التركي:', error.message);
    }
  }

  return movies;
}

// إنشاء أغاني تركية
async function createFakeTurkishSongs(users, count = 50) {
  console.log('جاري إنشاء الأغاني التركية...');
  const songs = [];

  for (let i = 0; i < count; i++) {
    const songData = {
      title: `${faker.word.adjective()} ${faker.word.noun()} Şarkısı`,
      description: faker.lorem.sentence(),
      imageUrl: faker.image.urlLoremFlickr({ category: 'music' }),
      planetName: faker.helpers.arrayElement(turkishSongsPlanet),
      duration: `${faker.number.int({ min: 3, max: 6 })}:${faker.number
        .int({ min: 0, max: 59 })
        .toString()
        .padStart(2, '0')}`,
      genre: faker.helpers.arrayElement([
        'Pop',
        'Türk Halk Müziği',
        'Arabesk',
        'Rock',
        'Özgün',
      ]),
      releaseDate: faker.date.past({ years: 5 }),
      mostViewed: faker.datatype.boolean(0.2),
      subscribed: faker.datatype.boolean(0.4),
      viewsCount: faker.number.int({ min: 0, max: 900000 }),
      rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
      artist: faker.person.fullName(),
      album: `${faker.word.adjective()} Albümü`,
      isTraditional: faker.datatype.boolean(0.3),
      audioUrl: faker.internet.url(),
      userId: faker.helpers.arrayElement(users).id,
    };

    try {
      const song = await prisma.turkishSong.create({ data: songData });
      songs.push(song);
      console.log(`تم إنشاء الأغنية التركية: ${song.title}`);
    } catch (error) {
      console.error('خطأ في إنشاء الأغنية التركية:', error.message);
    }
  }

  return songs;
}

// إنشاء BaseMedia
async function createFakeBaseMedia(users, count = 100) {
  console.log('جاري إنشاء محتوى BaseMedia...');
  const mediaList = [];

  for (let i = 0; i < count; i++) {
    const mediaData = {
      title: `${faker.word.adjective()} ${faker.word.noun()}`,
      description: faker.lorem.paragraph(),
      imageUrl: faker.image.urlLoremFlickr({
        category: faker.helpers.arrayElement(['cartoon', 'movie', 'music']),
      }),
      duration: `${faker.number.int({ min: 5, max: 120 })}:00`,
      genre: faker.helpers.arrayElement([
        'كوميدي',
        'مغامرات',
        'خيال علمي',
        'أكشن',
        'دراما',
      ]),
      releaseDate: faker.date.past({ years: 5 }),
      planetName: faker.helpers.arrayElement(arabicCartoonPlanet),
      mostViewed: faker.datatype.boolean(0.2),
      oldCartoon: faker.datatype.boolean(0.3),
      subscribed: faker.datatype.boolean(0.4),
      viewsCount: faker.number.int({ min: 0, max: 1000000 }),
      rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
      isActive: faker.datatype.boolean(0.9),
      userId: faker.helpers.arrayElement(users).id,
    };

    try {
      const media = await prisma.baseMedia.create({ data: mediaData });
      mediaList.push(media);
      console.log(`تم إنشاء محتوى BaseMedia: ${media.title}`);
    } catch (error) {
      console.error('خطأ في إنشاء محتوى BaseMedia:', error.message);
    }
  }

  return mediaList;
}

// الدالة الرئيسية لإنشاء جميع البيانات
async function main() {
  try {
    console.log('بدء إنشاء البيانات المزيفة...');

    // 1. إنشاء المستخدمين
    const users = await createFakeUsers(20);

    // 2. إنشاء المحتوى العربي
    const arabicSeries = await createFakeArabicSeries(users, 50);
    await createFakeArabicEpisodes(arabicSeries, users, 20);
    await createFakeArabicMovies(users, 50);
    await createFakeArabicSongs(users, 50);
    await createFakeSpaceToonSongs(users, 50);

    // 3. إنشاء المحتوى الإنجليزي
    const englishSeries = await createFakeEnglishSeries(users, 50);
    await createFakeEnglishEpisodes(englishSeries, users, 20);
    await createFakeEnglishMovies(users, 50);
    await createFakeEnglishSongs(users, 50);

    // 4. إنشاء المحتوى التركي
    const turkishSeries = await createFakeTurkishSeries(users, 50);
    await createFakeTurkishEpisodes(turkishSeries, users, 20);
    await createFakeTurkishMovies(users, 50);
    await createFakeTurkishSongs(users, 50);

    // 5. إنشاء BaseMedia
    await createFakeBaseMedia(users, 100);

    console.log('تم إنشاء جميع البيانات المزيفة بنجاح!');
  } catch (error) {
    console.error('حدث خطأ أثناء إنشاء البيانات:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// تشغيل البرنامج
main().catch((error) => {
  console.error('خطأ غير متوقع:', error);
  process.exit(1);
});
