import React from "react";
import { FollowerPointerCard } from "../ui/following-pointer";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

const DetailSkeleton = () => {
  return (
    <div className="w-fit py-10 mx-auto">
      <FollowerPointerCard>
        <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-blue-950 hover:shadow-xl border border-black">
          <div className="w-full aspect-w-16 aspect-h-10 bg-blue-950 rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative">
            <Image
              src="/assets/thumbnail.webp"
              alt="avatar"
              width={700}
              height={40}
              objectFit="cover"
              className={`group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200 `}
            />
          </div>
          <div className="p-4">
            <Skeleton className="w-56 bg-slate-600 h-10 mb-3" />
            <Skeleton className="w-28 bg-slate-600 h-10 mb-1" />
            <Skeleton className="w-16 bg-slate-600 h-8" />
            <div className="flex flex-row justify-between items-center mt-10">
              <Skeleton className="w-10 bg-slate-600 h-5" />
              <div className="relative z-10 px-6 py-2 bg-gray-800 text-white font-bold rounded-xl block text-xs cursor-not-allowed">
                Copy Email
              </div>
            </div>
          </div>
        </div>
      </FollowerPointerCard>
    </div>
  );
};

export default DetailSkeleton;
