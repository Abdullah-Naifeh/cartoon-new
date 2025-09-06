'use client';

import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Heart,
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Play,
  Trash2,
  Calendar,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { cn } from '../lib/utils';

interface FavoriteAnime {
  id: number;
  title: string;
  image: string;
  rating: number;
  year: number;
  episodes: number;
  status: 'مكتمل' | 'مستمر' | 'قريباً';
  genre: string[];
  addedDate: string;
  watchProgress: number;
}

const favoriteAnimeList: FavoriteAnime[] = [
  {
    id: 1,
    title: 'هجوم العمالقة',
    image: '/attack-on-titan-poster.png',
    rating: 9.0,
    year: 2013,
    episodes: 87,
    status: 'مكتمل',
    genre: ['أكشن', 'دراما', 'خيال'],
    addedDate: '2024-01-15',
    watchProgress: 75,
  },
  {
    id: 2,
    title: 'قاتل الشياطين',
    image: '/demon-slayer-anime-poster.png',
    rating: 8.7,
    year: 2019,
    episodes: 44,
    status: 'مستمر',
    genre: ['أكشن', 'خارق للطبيعة'],
    addedDate: '2024-01-10',
    watchProgress: 100,
  },
  {
    id: 3,
    title: 'ون بيس',
    image: '/anime-poster.png',
    rating: 9.1,
    year: 1999,
    episodes: 1000,
    status: 'مستمر',
    genre: ['مغامرة', 'كوميديا', 'أكشن'],
    addedDate: '2024-01-05',
    watchProgress: 45,
  },
  {
    id: 4,
    title: 'جوجوتسو كايسن',
    image: '/jujutsu-kaisen-poster.png',
    rating: 8.8,
    year: 2020,
    episodes: 24,
    status: 'مكتمل',
    genre: ['أكشن', 'خارق للطبيعة'],
    addedDate: '2024-01-01',
    watchProgress: 90,
  },
];

export default function FavoritesContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('addedDate');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [favorites, setFavorites] = useState(favoriteAnimeList);

  const filteredFavorites = favorites.filter((anime) => {
    const matchesSearch = anime.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' || anime.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'rating':
        return b.rating - a.rating;
      case 'year':
        return b.year - a.year;
      case 'addedDate':
      default:
        return (
          new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
        );
    }
  });

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((anime) => anime.id !== id));
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">المفضلة</h1>
            <p className="text-muted-foreground">
              {favorites.length} من الأنمي المفضل لديك
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="glass bg-transparent"
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="glass bg-transparent"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="البحث في المفضلة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 glass bg-transparent border-border/50"
          />
        </div>

        <div className="flex gap-2">
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="glass bg-transparent border-border/50 gap-2"
              >
                <Filter className="w-4 h-4" />
                ترتيب
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass border-border/50">
              <DropdownMenuItem onClick={() => setSortBy('addedDate')}>
                <Calendar className="w-4 h-4 ml-2" />
                تاريخ الإضافة
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('title')}>
                الاسم
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('rating')}>
                <Star className="w-4 h-4 ml-2" />
                التقييم
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('year')}>
                السنة
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="glass bg-transparent border-border/50 gap-2"
              >
                الحالة
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass border-border/50">
              <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                الكل
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('مكتمل')}>
                مكتمل
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('مستمر')}>
                مستمر
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('قريباً')}>
                قريباً
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      {sortedFavorites.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            لا توجد مفضلة
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery || filterStatus !== 'all'
              ? 'لم يتم العثور على نتائج مطابقة للبحث'
              : 'لم تقم بإضافة أي أنمي للمفضلة بعد'}
          </p>
          <Button className="bg-gradient-to-r from-primary to-secondary">
            استكشف الأنمي
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            'gap-6',
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'flex flex-col space-y-4'
          )}
        >
          {sortedFavorites.map((anime) => (
            <Card
              key={anime.id}
              className={cn(
                'group glass border-0 hover:scale-105 transition-all duration-300',
                viewMode === 'list' && 'flex-row'
              )}
            >
              <CardContent className={cn('p-0', viewMode === 'list' && 'flex')}>
                <div
                  className={cn(
                    'relative overflow-hidden',
                    viewMode === 'list' ? 'w-32 flex-shrink-0' : ''
                  )}
                >
                  <img
                    src={anime.image || '/placeholder.svg'}
                    alt={anime.title}
                    className={cn(
                      'object-cover group-hover:scale-110 transition-transform duration-300',
                      viewMode === 'grid'
                        ? 'w-full aspect-[3/4]'
                        : 'w-full h-full'
                    )}
                  />

                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant="secondary"
                      className={cn(
                        'text-xs',
                        anime.status === 'مستمر' &&
                          'bg-green-500/20 text-green-400 border-green-500/30',
                        anime.status === 'مكتمل' &&
                          'bg-blue-500/20 text-blue-400 border-blue-500/30',
                        anime.status === 'قريباً' &&
                          'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      )}
                    >
                      {anime.status}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  {anime.watchProgress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${anime.watchProgress}%` }}
                      />
                    </div>
                  )}
                </div>

                <div
                  className={cn(
                    'p-4 space-y-3',
                    viewMode === 'list' && 'flex-1'
                  )}
                >
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">
                      {anime.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{anime.rating}</span>
                      </div>
                      <span>{anime.year}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{anime.episodes} حلقة</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {anime.genre.slice(0, 2).map((genre) => (
                        <Badge
                          key={genre}
                          variant="outline"
                          className="text-xs glass bg-transparent"
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>

                    {anime.watchProgress > 0 && (
                      <div className="text-xs text-muted-foreground">
                        تم مشاهدة {anime.watchProgress}%
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      <Play className="w-4 h-4 ml-1" />
                      مشاهدة
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass bg-transparent border-destructive/50 text-destructive hover:bg-destructive/10"
                      onClick={() => removeFavorite(anime.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
