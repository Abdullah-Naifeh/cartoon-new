'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Sparkles,
  Flame,
  Play,
  ChevronRight,
  BookOpen,
  Zap,
  Compass,
  Star,
} from 'lucide-react';

import AnimeCard from '../../components/anime-card';
import CategorySlider from '../../components/category-slider';
import HeroCarousel from '../../components/hero-carousel';
import PlanetShowcase from '../../components/planet-showcase';
import MostViewed from '../../components/mostViewed';
import { MdMovieCreation } from 'react-icons/md';
import Link from 'next/link';
import Stars from '../../components/stars/stars';
export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { name: 'الكل', icon: Compass },
    { name: 'أكشن', icon: Flame },
    { name: 'مغامرات', icon: Compass },
    { name: 'كوميدي', icon: Sparkles },
    { name: 'دراما', icon: BookOpen },
    { name: 'خيال', icon: Zap },
  ];

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <main className="sm:pt-20">
        <Stars />
        {/* Hero Carousel */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/60 z-10 pointer-events-none" />
          <HeroCarousel />
        </section>

        {/* CategorySlider */}
        <section className="container mx-auto px-4 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/40 rounded-full px-6 py-2 mb-4 border border-white/30">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-600 select-none">
                مرحباً بك في موقع بهيجة أشرق لبن للكرتون
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent select-none">
              اكتشف عالماً مليئاً بالمغامرات والمرح
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed select-none">
              استمتع بمشاهدة أفضل المسلسلات والأفلام الكرتونية المدبلجة بجودة
              عالية
            </p>
          </motion.div>

          <CategorySlider
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </section>

        {/* Most View */}
        <section className="container mx-auto px-4 py-8 sm:py-12">
          <MostViewed />
        </section>

        {/* Planet Showcases */}
        <section className="container mx-auto px-4 py-8 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/40 rounded-full px-6 py-2 mb-4 border border-white/30">
                <Compass className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium text-gray-600 select-none">
                  استكشف العوالم
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent select-none">
                رحلة عبر الكواكب المختلفة
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed select-none">
                كل كوكب يحتوي على مجموعة مميزة من المحتوى المناسب لجميع الأعمار
              </p>
            </div>

            <div className="flex flex-col justify-center items-center gap-8 w-full">
              <PlanetShowcase
                planetName="سبيس تون"
                planetPath="/spacetoonSongsPlanet"
                planetImage="/images/Spacetoon_logo.png"
                color="yellow"
                route={'space-toon-songs'}
                isAdmin={false}
              />
              <PlanetShowcase
                planetName="زمردة"
                planetPath="/zomurodaPlanet"
                planetImage="/images/Zumoroda.png"
                color="pink"
                route={'arabic-series'}
                isAdmin={false}
              />
              <PlanetShowcase
                planetName="رياضة"
                planetPath="/sportPlanet"
                planetImage="/images/Sport.png"
                color="lime"
                route={'arabic-series'}
                isAdmin={false}
              />
              <PlanetShowcase
                planetName="مغامرات"
                planetPath="/adventuresPlanet"
                planetImage="/images/Adventure.png"
                color="fuchsia"
                route={'arabic-series'}
                isAdmin={false}
              />
              <PlanetShowcase
                planetName="أكشن"
                planetPath="/actionPlanet"
                planetImage="/images/Action.png"
                color="blue"
                route={'arabic-series'}
                isAdmin={false}
              />

              <PlanetShowcase
                className="text-l"
                planetName="بون بونة"
                planetPath="/bonbonaPlanet"
                planetImage="/images/Bonbona.png"
                route={'arabic-series'}
                color="rose"
                isAdmin={false}
              />
              <PlanetShowcase
                planetName="أغاني أطفال"
                planetPath="/kidsSongsPlanet"
                planetImage="/images/hidi.png"
                color="yellow"
                route={'arabic-songs'}
                isAdmin={false}
              />
              <PlanetShowcase
                planetName="أفلام"
                planetPath="/arabicMoviesPlanet"
                planetImage="/images/Movie.png"
                color="red"
                route={'arabic-movies'}
                isAdmin={false}
              />

              <PlanetShowcase
                planetName="كرتون لغة انجليزية"
                planetPath="/englishCartoonPlanet"
                planetImage="/images/hipo.png"
                color="purple"
                route={'english-series'}
                isAdmin={false}
              />
              <PlanetShowcase
                planetName="أفلام لغة إنجليزية"
                planetPath="/englishMoviesPlanet"
                planetImage="/images/house.png"
                color="red"
                route={'english-movies'}
                isAdmin={false}
              />
              <PlanetShowcase
                planetName="أغاني لغة انجليزية"
                planetPath="/englishSongsPlanet"
                planetImage="/images/absi.png"
                color="yellow"
                route={'english-songs'}
                isAdmin={false}
              />
              <PlanetShowcase
                planetName="كرتون لغة تركية"
                planetPath="/turkishCartoonPlanet"
                planetImage="/images/watermelon.png"
                color="lime"
                route={'turkish-series'}
                isAdmin={false}
              />
              <PlanetShowcase
                planetName="أفلام لغة تركية"
                planetPath="/turkishMoviesPlanet"
                planetImage="/images/picatcu.png"
                color="yellow"
                route={'turkish-movies'}
                isAdmin={false}
              />
              <PlanetShowcase
                planetName="أغاني لغة تركية"
                planetPath="/turkishSongsPlanet"
                planetImage="/images/fish.png"
                color="orange"
                route="turkish-songs"
                isAdmin={false}
              />
            </div>
          </motion.div>
        </section>

        {/* Popular Series */}
        <section className="container mx-auto px-4 py-8 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
              <div className="text-center sm:text-right">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
                  <div className="p-2  rounded-lg border">
                    <MdMovieCreation className="h-6 w-6 text-orange-400" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold select-none">
                    مسلسلات مشهورة
                  </h2>
                </div>
                <p className="text-gray-600 text-sm select-none">
                  أشهر المسلسلات التي يحبها الجميع
                </p>
              </div>

              <motion.button
                className="group border text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-medium select-none">مشاهدة الكل</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <AnimeCard
                  title="Berserk"
                  image="/images/photo-1.png"
                  type="Manga"
                  rating={4.9}
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <AnimeCard
                  title="Vagabond"
                  image="/images/photo-2.png"
                  type="Manga"
                  rating={4.9}
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <AnimeCard
                  title="One Punch Man"
                  image="/images/photo-3.png"
                  type="Manga"
                  rating={4.8}
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <AnimeCard
                  title="Vinland Saga"
                  image="/images/photo-4.png"
                  type="Manga"
                  rating={4.8}
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <AnimeCard
                  title="Tokyo Ghoul"
                  image="/images/photo-5.png"
                  type="Manga"
                  rating={4.7}
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <AnimeCard
                  title="Spy x Family"
                  image="/images/photo-6.png"
                  type="Manga"
                  rating={4.7}
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Subscription */}
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative overflow-hidden rounded-3xl shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-pink-600/80 to-orange-500/90"></div>
            <div className="absolute inset-0  bg-cover bg-center opacity-10 mix-blend-overlay"></div>

            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

            <div className="relative p-8 md:p-16">
              <div className="flex flex-col lg:flex-row justify-between gap-12 items-center">
                <div className="flex-1 text-center lg:text-right">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white mb-6 border border-white/30">
                    <Star className="h-4 w-4 text-yellow-300" />
                    <span className="select-none">الإشتراك المميز</span>
                  </div>

                  <h2 className="select-none text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                    انضم إلى عائلتنا واستمتع بتجربة مشاهدة لا تُنسى
                  </h2>

                  <p className="text-white/90 mb-8 text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 select-none">
                    مشاهدة مئات المسلسلات الكرتونية وأفلام الكرتون المدبلج
                    والمترجم بجودة عالية بدون إعلانات مزعجة بالإضافة إلى محتوى
                    حصري خاص بالمشتركين
                  </p>

                  <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
                    <Link href={'/Subscription'}>
                      {' '}
                      <motion.button
                        className="group bg-white text-purple-600 hover:bg-white/90 rounded-full px-8 py-4 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="select-none">ابدأ الإشتراك الآن</span>
                        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </motion.button>
                    </Link>

                    <motion.button
                      className="group border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-4 font-medium text-lg backdrop-blur-sm transition-all duration-300 select-none"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      تعرف على المزيد
                    </motion.button>
                  </div>
                </div>

                <div className="relative flex-shrink-0">
                  <div className="relative h-[300px] w-[400px] max-w-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur-xl"></div>
                    <Image
                      src="/happy-cartoon-characters-watching-screen.png"
                      alt="Premium Experience"
                      width={400}
                      height={300}
                      className="rounded-2xl object-cover h-full w-full relative shadow-2xl border border-white/20"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <motion.button
                        className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 h-20 w-20 flex items-center justify-center shadow-2xl border border-white/30"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{
                          boxShadow: [
                            '0 0 0 0 rgba(255, 255, 255, 0.4)',
                            '0 0 0 20px rgba(255, 255, 255, 0)',
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: 'loop',
                        }}
                      >
                        <Play
                          className="h-8 w-8 text-white ml-1"
                          fill="white"
                        />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
