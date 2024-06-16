"use client";
import Image from "next/image";
import { FollowerPointerCard } from "./ui/following-pointer";
import { useState, useEffect } from "react";
import DetailSkeleton from "./Skeleton/DetailSkeleton";

// Define your main component
const UserCardList = ({ selectedUser }) => {
  const [defaultUser, setDefaultUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://602e7c2c4410730017c50b9d.mockapi.io/users/2")
      .then((response) => response.json())
      .then((data) => {
        setDefaultUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <DetailSkeleton />
      </div>
    );
  }

  const userToDisplay = selectedUser || defaultUser;

  const UserCard = ({ user }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
      navigator.clipboard.writeText(user.profile.email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
      });
    };

    return (
      <div className="w-fit py-10 mx-auto">
        <FollowerPointerCard
          title={
            <TitleComponent
              title={`${user.profile.firstName} ${user.profile.lastName}`}
              avatar={user.avatar}
            />
          }
        >
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
              <h2 className="font-bold my-4 text-2xl text-zinc-100">
                {`${user.profile.firstName} ${user.profile.lastName}`}
              </h2>
              <h2 className="font-normal my-4 text-lg text-zinc-300">
                {user.jobTitle}
              </h2>
              <h2 className="font-normal my-4 text-sm text-zinc-300">
                {user.Bio}
              </h2>
              <div className="flex flex-row justify-between items-center mt-10">
                <span className="text-sm text-gray-500">
                  @{user.profile.username}
                </span>
                <div
                  className="relative z-10 px-6 py-2 bg-black text-white font-bold rounded-xl block text-xs cursor-pointer"
                  onClick={handleCopyEmail}
                >
                  {copied ? "Email Copied!" : "Copy Email"}
                </div>
              </div>
            </div>
          </div>
        </FollowerPointerCard>
      </div>
    );
  };

  return (
    <div>
      <UserCard user={userToDisplay} />
    </div>
  );
};

// TitleComponent used within UserCard
const TitleComponent = ({ title, avatar }) => (
  <div className="flex space-x-2 items-center">
    <Image
      src={avatar}
      height="40"
      width="40"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p className="text-white text-md">{title}</p>
  </div>
);

export default UserCardList;
