// components/CustomerReviews.tsx
"use client";

import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
type Review = {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: { _id: string; name: string };
  createdAt: string;
};

type ApiResponse = {
  results: number;
  data: Review[];
};


function StarIcon({ filled, half }: { filled: boolean; half?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20">
      {half && (
        <defs>
          <linearGradient id="half-grad">
            <stop offset="60%" stopColor="#e47911" />
            <stop offset="60%" stopColor="#ccc" />
          </linearGradient>
        </defs>
      )}
      <polygon
        points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
        fill={half ? "url(#half-grad)" : filled ? "#e47911" : "#ccc"}
      />
    </svg>
  );
}

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          filled={star <= Math.floor(value)}
          half={star === Math.ceil(value) && !Number.isInteger(value)}
        />
      ))}
    </div>
  );
}

function getRatingBreakdown(reviews: Review[]) {
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach((r) => {
    const star = Math.round(r.rating);
    if (star >= 1 && star <= 5) counts[star]++;
  });
  const total = reviews.length;
  return [5, 4, 3, 2, 1].map((star) => ({
    stars: star,
    count: counts[star],
    percent: total > 0 ? Math.round((counts[star] / total) * 100) : 0,
  }));
}

function getAverage(reviews: Review[]) {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export default function CustomerReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://ecommerce.routemisr.com/api/v1/reviews")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reviews");
        return res.json() as Promise<ApiResponse>;
      })
      .then((data) => setReviews(data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-5 rounded-xl shadow-lg border border-gray-200 text-sm text-gray-400">
        Loading reviews...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 rounded-xl shadow-lg border border-gray-200 text-sm text-red-500">
        {error}
      </div>
    );
  }

  const average = getAverage(reviews);
  const breakdown = getRatingBreakdown(reviews);

  return (
    <div className="p-5 rounded-xl ">
      {/* Summary */}
      <h2 className="text-lg font-medium mb-1">Customer reviews</h2>
      <div className="flex items-center gap-2 mb-1">
        <StarRating value={average} />
        <span className="font-medium">{average} out of 5</span>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        {reviews.length} global ratings
      </p>

      {/* Breakdown bars */}
      <div className="flex flex-col gap-2 mb-6">
        {breakdown.map(({ stars, percent }) => (
          <div key={stars} className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 w-11 shrink-0">{stars} star</span>
            <div className="flex-1 h-4 bg-gray-200 rounded-sm overflow-hidden">
              <div
                className="h-full bg-orange-400 rounded-sm transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-gray-500 w-7 text-right">{percent}%</span>
          </div>
        ))}
      </div>

      {/* Individual reviews */}
      <Swiper
  modules={[Navigation]}
  spaceBetween={15}
  slidesPerView={1}
  
  className="reviews-swiper pb-2 cursor-pointer "
>
  {reviews.map((r) => (
    <SwiperSlide key={r._id}>
      <div className="border border-gray-100 rounded-xl pt-4 p-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-full bg-[#e47911] text-white flex items-center justify-center text-xs font-medium">
            {r.user.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium">{r.user.name}</span>
        </div>
        <StarRating value={r.rating} />
        <p className="text-sm text-gray-700 mt-1">{r.review}</p>
        <p className="text-xs text-gray-400 mt-1">
          {new Date(r.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
    </div>
  );
}