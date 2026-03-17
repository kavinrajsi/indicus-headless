"use client";

import { useState } from "react";
import type { HomeVideoItem } from "@/types/wordpress";

export default function VideoSection({ videos }: { videos: HomeVideoItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVideo = videos[activeIndex];

  if (!videos.length) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">Watch Our Stories</h2>
        </div>

        {/* Active Video */}
        <div className="mx-auto max-w-3xl">
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.homePageStoriesVideoId}?rel=0`}
              title="Indicus Stories"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              loading="lazy"
            />
          </div>
        </div>

        {/* Thumbnails */}
        {videos.length > 1 && (
          <div className="mt-6 flex justify-center gap-3">
            {videos.map((video, i) => (
              <button
                key={video.homePageStoriesVideoId}
                onClick={() => setActiveIndex(i)}
                className={`relative h-16 w-28 overflow-hidden rounded-lg transition-opacity ${
                  i === activeIndex
                    ? "ring-2 ring-teal"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${video.homePageStoriesVideoId}/mqdefault.jpg`}
                  alt={`Video ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
