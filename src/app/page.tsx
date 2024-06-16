"use client";
import List from "@/components/List";
import UserCardList from "@/components/UserDetails";
import React, { useState } from "react";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <main className=" w-screen bg-slate-950 h-screen grid grid-cols-12">
      <section className="col-span-3 p-10 px-5 w-full">
        <List setSelectedUser={setSelectedUser} />
      </section>
      <section className="col-span-6">
        <UserCardList selectedUser={selectedUser} />
      </section>
      <section className="col-span-3 w-full">
        <div className="w-full  bg-gray-400"></div>
      </section>
    </main>
  );
};

export default Home;
