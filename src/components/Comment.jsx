import React from "react";

const formatDate = (val) => {
  if (!val) return "";
  try {
    const d = new Date(val);
    return isNaN(d) ? "Invalid date" : d.toLocaleString();
  } catch (e) {
    return "Invalid date";
  }
};

const Comment = ({ comment }) => {
  if (!comment) return null;

  const user = comment.user ?? {};
  const content = comment.content ?? comment.text ?? "";
  const ts = comment.timestamp ?? comment.date ?? comment.createdAt ?? null;

  return (
    <li className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/60">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-white">{user?.name || user?.email || "Unknown User"}</span>
        <span className="text-gray-500 text-xs">{formatDate(ts)}</span>
      </div>
      <p className="text-gray-300 whitespace-pre-wrap">{content}</p>
    </li>
  );
};

export default Comment;