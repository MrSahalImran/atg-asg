"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Skeleton/Card";

// Define the props type for List component
interface ListProps {
  setSelectedUser: (user: User) => void;
}

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

const List: React.FC<ListProps> = ({ setSelectedUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const limitPerPage = 6;

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://602e7c2c4410730017c50b9d.mockapi.io/users`
      );
      const data = res.data;
      setUsers(data);
      setLoading(false);
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.profile.firstName.toLowerCase().includes(query) ||
        user.profile.lastName.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const startIndex = (page - 1) * limitPerPage;
  const endIndex = startIndex + limitPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (page * limitPerPage < filteredUsers.length) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-y-2">
        <input className="mb-4 p-2 rounded bg-gray-800 text-white" disabled />
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} />
        ))}
        <div className="flex justify-between mt-4">
          <button className="py-2 px-4 rounded bg-gray-700 cursor-not-allowed">
            Previous
          </button>
          <button className="py-2 px-4 rounded bg-gray-700 cursor-not-allowed">
            Next
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="h-full w-full flex flex-col gap-y-2">
      <input
        type="text"
        placeholder="Search by firstname or lastname, ..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 rounded bg-gray-800 text-white"
      />
      {paginatedUsers.map((user, index) => (
        <div
          key={index}
          className="bg-blue-950 rounded-lg flex items-center px-5 w-full py-3 gap-10 cursor-pointer transition duration-500 ease-in-out transform hover:bg-blue-900 hover:scale-105"
          onClick={() => setSelectedUser(user)}
        >
          <div className="rounded-full overflow-hidden w-16 h-16">
            <Image src={user.avatar} alt="Avatar" width={70} height={70} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white text-lg font-semibold">
              {user.profile.firstName} {user.profile.lastName}
            </h1>
            <p className="text-gray-400 text-sm">@{user.profile.username}</p>
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`${
            page === 1
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-800"
          } text-white font-bold py-2 px-4 rounded`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page * limitPerPage >= filteredUsers.length}
          className={`${
            page * limitPerPage >= filteredUsers.length
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-900"
          } text-white font-bold py-2 px-4 rounded`}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default List;
