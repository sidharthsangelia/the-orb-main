'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  count: number;
}

interface CategoryCarouselProps {
  categories: Category[];
  onCategoryClick: (id: string) => void;
}

export default function CategoryCarousel({ categories, onCategoryClick }: CategoryCarouselProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <Swiper
  modules={[Navigation, Autoplay]}
  spaceBetween={8} // reduced spacing
  slidesPerView={1}
  breakpoints={{
    640: { slidesPerView: 2 },
  }}
  loop={true}
  autoplay={{ delay: 5000, disableOnInteraction: false }}
  navigation={{
    prevEl: '.swiper-prev-category',
    nextEl: '.swiper-next-category',
  }}
  className="swiper-container-category"
>
  {categories.map((category) => (
    <SwiperSlide key={category.id} className="!flex justify-center">
      <div
        className="flex flex-col items-center justify-center w-full h-40 sm:h-64 bg-card border border-border rounded-lg cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 p-6 aspect-square"
        onClick={() => onCategoryClick(category.id)}
      >
        <div className="mb-3">{category.icon}</div>
        <h3 className="text-base sm:text-lg font-semibold text-foreground text-center">{category.title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground text-center">{category.count} items</p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-3 text-primary hover:text-primary hover:bg-primary/10"
        >
          View →
        </Button>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

      <Button
        variant="outline"
        size="sm"
        className="swiper-prev-category absolute top-1/2 left-[-40px] -translate-y-1/2 z-10 flex items-center gap-2 hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="swiper-next-category absolute top-1/2 right-[-40px] -translate-y-1/2 z-10 flex items-center gap-2 hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}