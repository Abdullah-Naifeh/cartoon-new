'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import CurrentUser from './CurrentUser';
import Image from 'next/image';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaSignInAlt, FaUser, FaTimes, FaRocket, FaHome } from 'react-icons/fa';
import { Sparkles } from 'lucide-react';
import { TfiMenuAlt } from 'react-icons/tfi';
import LoadingPhoto from './LoadingPhoto';
import { usePathname } from 'next/navigation';
import AnimatedLogo from './AnimatedLogo';
import Stars from './stars/stars';

// Constants for better maintainability
const PLANETS = [
  {
    planetName: 'كوكب زمردة',
    planetImage: '/images/Zumoroda.png',
    planetRoute: '/zomurodaPlanet',
  },
  {
    planetName: 'كوكب مغامرات',
    planetImage: '/images/Adventure.png',
    planetRoute: '/adventuresPlanet',
  },
  {
    planetName: 'كوكب رياضة',
    planetImage: '/images/Sport.png',
    planetRoute: '/sportPlanet',
  },
  {
    planetName: 'كوكب أكشن',
    planetImage: '/images/Action.png',
    planetRoute: '/actionPlanet',
  },
  {
    planetName: 'كوكب أفلام',
    planetImage: '/images/Movie.png',
    planetRoute: '/arabicMoviesPlanet',
  },
  {
    planetName: 'كوكب بون بونة',
    planetImage: '/images/Bonbona.png',
    planetRoute: '/bonbonaPlanet',
  },
  {
    planetName: 'أغاني سبيس تون',
    planetImage: '/images/Spacetoon_logo.png',
    planetRoute: '/spacetoonSongsPlanet',
  },
  {
    planetName: 'أغاني أطفال',
    planetImage: '/images/hidi.png',
    planetRoute: '/kidsSongsPlanet',
  },
  {
    planetName: 'كرتون لغة انجليزية',
    planetImage: '/images/hipo.png',
    planetRoute: '/englishCartoonPlanet',
  },
  {
    planetName: 'أفلام لغة انجليزية',
    planetImage: '/images/house.png',
    planetRoute: '/englishMoviesPlanet',
  },
  {
    planetName: 'أغاني أطفال انجليزية',
    planetImage: '/images/absi.png',
    planetRoute: '/englishSongsPlanet',
  },
  {
    planetName: 'كرتون لغة تركية',
    planetImage: '/images/watermelon.png',
    planetRoute: '/turkishCartoonPlanet',
  },
  {
    planetName: 'أفلام لغة تركية',
    planetImage: '/images/picatcu.png',
    planetRoute: '/turkishMoviesPlanet',
  },
  {
    planetName: 'أغاني أطفال تركية',
    planetImage: '/images/fish.png',
    planetRoute: '/turkishSongsPlanet',
  },
];

const BACKGROUND_GRADIENTS = {
  arabicMoviesPlanet: 'bg-gradient-to-b from-red-200  to-red-500 ',

  englishCartoonPlanet: 'bg-gradient-to-b from-purple-200  to-purple-500 ',
  englishMoviesPlanet: 'bg-gradient-to-b from-red-200  to-red-500 ',
  englishSongsPlanet: 'bg-gradient-to-b from-yellow-200  to-yellow-500 ',

  turkishCartoonPlanet: 'bg-gradient-to-b from-lime-200  to-lime-500 ',
  turkishMoviesPlanet: 'bg-gradient-to-b from-yellow-200  to-yellow-500 ',
  turkishSongsPlanet: 'bg-gradient-to-b from-orange-200  to-orange-500 ',

  sportPlanet: 'bg-gradient-to-b from-lime-200  to-lime-500',
  bonbonaPlanet: 'bg-gradient-to-b from-rose-200  to-rose-500 ',
  kidsSongsPlanet: 'bg-gradient-to-b from-rose-200  to-rose-500 ',
  adventuresPlanet: 'bg-gradient-to-b from-fuchsia-200  to-fuchsia-500 ',
  actionPlanet: 'bg-gradient-to-b from-blue-200  to-blue-500 ',
  zomurodaPlanet: 'bg-gradient-to-b from-pink-200  to-pink-500 ',
  spacetoonSongsPlanet: 'bg-gradient-to-b from-yellow-200  to-yellow-500 ',
  login: 'bg-gradient-to-b from-orange-200  to-orange-500 ',
  default: 'bg-gradient-to-b from-blue-700 to-blue-900 ',
};

const PlanetItem = ({
  planetName,
  planetImage,
  planetRoute,
  index,
  onPlanetClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        type: 'spring',
        stiffness: 120,
      }}
      whileHover={{
        scale: 1.05,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(255, 255, 255, 0.1)',
      }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center p-4 mb-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 hover:border-white/50 transition-all duration-300 group shadow-lg hover:shadow-xl"
    >
      <Link
        href={planetRoute}
        className="flex items-center w-full"
        onClick={onPlanetClick}
        aria-label={`Go to ${planetName}`}
      >
        <div className="relative w-16 h-16 mr-4 rounded-full overflow-hidden bg-white/20 p-2">
          <Image
            src={planetImage || '/placeholder.svg'}
            fill
            alt={planetName}
            className="object-contain transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12"
            sizes="64px"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg  mb-1 mx-2">
            {planetName}
          </h3>
          <div className="h-1 w-0 bg-gradient-to-r from-white via-blue-200 to-transparent rounded-full group-hover:w-full transition-all duration-700"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-white/60 group-hover:text-white transition-all duration-300"
        >
          <FaRocket className="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
        </motion.div>
      </Link>
    </motion.div>
  );
};

const StarsBackground = ({ stars }) => {
  return (
    <>
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-white animate-twinkle shadow-sm"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.glow}px rgba(255, 255, 255, 0.8)`,
          }}
        />
      ))}
    </>
  );
};

const UserProfile = ({ user, session, onClose }) => {
  return (
    <Link href="/profile?username">
      <motion.div
        onClick={onClose}
        className="flex items-center gap-4 mb-6 my-4 rounded-2xl bg-white/15 hover:bg-white/25 transition-all duration-300 border border-white/30 hover:border-white/50 p-4 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        aria-label="User profile"
      >
        <div className="relative size-14 overflow-hidden rounded-full border-3 border-white/30 shadow-lg">
          <Image
            priority
            src={user.image || '/images/placeholder.jpg'}
            fill
            alt={session?.data?.user?.name || 'User'}
            className="object-cover"
          />
        </div>
        <div className="overflow-hidden flex-1">
          <h3 className="text-white font-semibold text-base truncate mb-1">
            {session?.data?.user?.name || 'User'}
          </h3>
          <p className="text-white/80 font-medium text-sm">الملف الشخصي</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default function SideBarMenu() {
  const session = useSession();
  const user = CurrentUser() || {};
  const [isOpen, setIsOpen] = useState(false);
  const starsRef = useRef([]);
  const path = usePathname();

  useEffect(() => {
    starsRef.current = Array.from({ length: 30 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      delay: `${Math.random() * 8}s`,
      duration: `${Math.random() * 4 + 2}s`,
      opacity: Math.random() * 0.8 + 0.2,
      glow: Math.random() * 4 + 2,
    }));
  }, []);

  const getBackgroundGradient = () => {
    for (const [key, value] of Object.entries(BACKGROUND_GRADIENTS)) {
      if (path.includes(key)) return value;
    }
    return BACKGROUND_GRADIENTS.default;
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <div className="fixed top-5 right-2 sm:top-7 sm:right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.15, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/25 backdrop-blur-md p-2 rounded-xl text-white hover:bg-white/35 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/30"
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          <TfiMenuAlt className="size-5" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Enhanced backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-black/80 h-screen z-50 backdrop-blur-md"
              onClick={closeMenu}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '100%', opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: '100%', opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 30, stiffness: 150 }}
              className="fixed w-full sm:w-96 h-screen right-0 top-0 z-50 overflow-hidden shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Enhanced space background */}
              <div
                className={`${getBackgroundGradient()} absolute inset-0 overflow-hidden z-0`}
              >
                <StarsBackground stars={starsRef.current} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
              </div>

              {/* Content container */}
              <div className="relative h-full overflow-y-auto scrollbar-hide z-10">
                <motion.div
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="backdrop-blur-lg border-b border-white/30 px-2 pt-6"
                >
                  {/* Logo and Close button */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex justify-center w-full cursor-pointer">
                        <AnimatedLogo path={path} />
                        <StarsBackground stars={starsRef.current} />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        rotate: 90,
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-3 left-3 p-3 rounded-xl bg-white/15 text-white border border-white/30 hover:border-white/50 transition-all duration-300 shadow-lg"
                      onClick={closeMenu}
                      aria-label="Close menu"
                    >
                      <FaTimes className="text-lg" />
                    </motion.button>
                  </div>

                  <div className="flex flex-col justify-center items-center gap-4 mx-4 w-full">
                    <UserProfile
                      user={user}
                      session={session}
                      onClose={closeMenu}
                    />

                    <Link href="/home">
                      <motion.div
                        onClick={closeMenu}
                        className="flex items-center gap-3 mb-6 p-5 rounded-2xl bg-white/15 hover:bg-white/25 transition-all duration-300 border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <div className="text-lg">
                          <FaHome />
                        </div>
                        <p className="text-white font-bold text-lg text-center w-full">
                          الرئيسية
                        </p>
                      </motion.div>
                    </Link>

                    {/* Admin Section */}
                    {user.isAdmin === 0 && (
                      <motion.div
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="mb-6"
                      >
                        <Button
                          title="المستخدمين"
                          path="/users"
                          style="border-2 border-white/50 hover:border-white bg-white/10 hover:bg-white/20 rounded-2xl p-4 transition-all duration-300"
                          icon={<FaUser className="ml-2" />}
                        />
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                <div className="flex justify-center items-center gap-3 my-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'linear',
                    }}
                  >
                    <Sparkles size={20} className="text-yellow-300" />
                  </motion.div>
                  <h1 className="text-xl text-white font-bold tracking-wide">
                    الكواكب
                  </h1>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'linear',
                    }}
                  >
                    <Sparkles size={20} className="text-yellow-300" />
                  </motion.div>
                </div>

                {/* Planet list */}
                <div className="px-4 pb-4 space-y-2">
                  <Stars />
                  {PLANETS.map((planet, index) => (
                    <PlanetItem
                      key={planet.planetRoute}
                      planetName={planet.planetName}
                      planetImage={planet.planetImage}
                      planetRoute={planet.planetRoute}
                      index={index}
                      onPlanetClick={closeMenu}
                    />
                  ))}
                </div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="p-4 backdrop-blur-lg border-t border-white/30 sticky bottom-0 bg-black/20"
                >
                  {session.status === 'unauthenticated' ? (
                    <motion.div
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        title="تسجيل الدخول"
                        onClick={closeMenu}
                        path="/login"
                        style="text-white font-bold py-4 border-2 border-white/50 hover:border-white bg-white/15 hover:bg-white/25 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                        icon={<FaSignInAlt className="ml-2" />}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        title="الملف الشخصي"
                        path="/profile"
                        style="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white font-bold py-4 border-none rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                        icon={<FaUser className="ml-2" />}
                      />
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
