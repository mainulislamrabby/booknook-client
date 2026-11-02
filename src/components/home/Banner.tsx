"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    subtitle: "WELCOME TO BOOKNOOK",
    image: "/images/book_cover_1.jpg",
    title: "Discover Your Next Favorite Book",
    description:
      "Explore thousands of amazing books and find stories that inspire, entertain, and expand your imagination.",
  },
  {
    id: 2,
    subtitle: "YOUR READING JOURNEY",
    image: "/images/book_cover_2.jpg",
    title: "Every Book Opens a New World",
    description:
      "From exciting adventures to inspiring stories, discover something new on every page.",
  },
  {
    id: 3,
    subtitle: "READ MORE, EXPLORE MORE",
    image: "/images/book_cover_3.jpg",
    title: "A World of Knowledge Awaits You",
    description:
      "Find your favorite reads, explore different genres, and make reading a part of your everyday life.",
  },
];

const Banner = () => {
  const router = useRouter();

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        className="booknook-swiper rounded-2xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Card className="relative min-h-105 overflow-hidden rounded-2xl border-0 bg-green-800 text-white shadow-lg md:min-h-120">
              {/* Background Cover Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${slide.image}')`,
                }}
              />

              {/* Dark Green Overlay */}
              <div className="absolute inset-0 bg-green-950/75" />

              {/* Background Decorations */}
              <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-green-700 opacity-40" />

              <div className="absolute -bottom-32 -right-5 h-80 w-80 rounded-full border-35 border-green-700 opacity-30" />

              <CardContent className="relative z-10 flex min-h-105 items-center p-8 md:min-h-120 md:px-16">
                <div className="max-w-2xl">
                  {/* Subtitle */}
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold tracking-wider text-green-100">
                    <Sparkles size={17} />
                    {slide.subtitle}
                  </div>

                  {/* Title */}
                  <h1 className="mb-5 text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="mb-8 max-w-xl text-sm leading-7 text-green-100 md:text-base">
                    {slide.description}
                  </p>

                  {/* Browse Books Button */}
                  <Button
                    onClick={() => router.push("/all-books")}
                    className="h-12 bg-white px-6 text-base font-semibold text-green-800 hover:bg-green-100"
                  >
                    Browse Books
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>

                {/* Decorative Book Icon */}
                <div className="absolute right-16 top-1/2 hidden -translate-y-1/2 lg:flex">
                  <div className="flex h-52 w-52 items-center justify-center rounded-full bg-white/10">
                    <BookOpen
                      size={110}
                      strokeWidth={1}
                      className="text-white/80"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .booknook-swiper .swiper-button-next,
        .booknook-swiper .swiper-button-prev {
          color: white;
          background: rgba(255, 255, 255, 0.15);
          width: 42px;
          height: 42px;
          border-radius: 50%;
        }

        .booknook-swiper .swiper-button-next::after,
        .booknook-swiper .swiper-button-prev::after {
          font-size: 16px;
          font-weight: bold;
        }

        .booknook-swiper .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
        }

        .booknook-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 8px;
        }

        .booknook-swiper .swiper-pagination {
          bottom: 15px;
        }
      `}</style>
    </section>
  );
};

export default Banner;
