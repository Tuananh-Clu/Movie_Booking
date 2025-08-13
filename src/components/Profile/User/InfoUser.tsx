import { useUser } from "@clerk/clerk-react";

export const InfoUser = () => {
  const { user } = useUser();

  if (!user) return <div>Đang tải thông tin...</div>;

  return (
    <div className="bg-gray-900/80 text-white p-6 rounded-2xl flex flex-col items-center shadow-lg w-full max-w-md mx-auto">
      <img
        className="w-32 h-32 rounded-full object-cover border-4 border-red-500"
        src={user.imageUrl}
        alt="Avatar"
      />
      <h2 className="mt-4 text-xl font-bold">{user.fullName}</h2>
      <p className="text-gray-300 mt-1">{user.primaryEmailAddress?.emailAddress}</p>
      <p className="mt-2 text-sm text-gray-400">Role: {"User"}</p>
    </div>
  );
};
