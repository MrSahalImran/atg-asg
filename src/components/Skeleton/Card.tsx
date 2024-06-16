import React from "react";
import { Skeleton } from "../ui/skeleton";

const Card = () => {
  return (
    <div>
      <div className="bg-blue-950 rounded-lg hover:cursor-not-allowed flex items-center px-5 w-full py-3 gap-10">
        <div className="rounded-full overflow-hidden w-14 h-14">
          <Skeleton className="w-full h-full bg-slate-600" />
        </div>
        <div className="flex flex-col">
          <Skeleton className="w-56 h-6 bg-slate-600" />
          <div className="text-gray-400 flex items-center mt-2">
            @<Skeleton className="w-10 bg-slate-600 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
