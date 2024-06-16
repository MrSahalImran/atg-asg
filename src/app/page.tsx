"use client";
import List from "@/components/List";
import UserCardList from "@/components/UserDetails";
import React, { useState } from "react";

// Define the types for user and profile
interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

interface User {
  id: string;
  avatar: string;
  profile: UserProfile;
  jobTitle: string;
  Bio: string;
}

const Home: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <main className="w-screen-[98vw] h- bg-slate-950 h-screen grid grid-cols-12">
      <section className="col-span-3 p-10 px-5 w-full">
        <List setSelectedUser={setSelectedUser} />
      </section>
      <section className="col-span-6">
        <UserCardList selectedUser={selectedUser} />
      </section>
      <section className="col-span-3 w-full">
        <div className="w-full bg-gray-400"></div>
      </section>
    </main>
  );
};

export default Home;
