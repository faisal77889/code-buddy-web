import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  // Keep socket in a ref so it persists across renders
  const socketRef = useRef(null);

  // Create socket connection only once
  if (!socketRef.current) {
    socketRef.current = createSocketConnection();

    // You can safely attach listener here (only once)
    socketRef.current.on("receivedMessage", ({ firstName, userId, targetUserId, text }) => {
      setMessages((prev) => [...prev, text]);
      console.log("New message received:", text);
    });
  }

  // Join chat when component mounts
  useEffect(() => {
    if (!userId) return;

    socketRef.current.emit("joinChat", { userId, targetUserId });

    return () => {
      socketRef.current.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!userId || !message.trim()) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: message,
    });

    setMessages((prev) => [...prev, message]); // Optional: Show sent message immediately
    setMessage("");
  };

  return (
    <div className="my-[2rem] w-full max-w-2xl h-[70vh] mx-auto flex flex-col border rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white text-center py-4 text-xl font-semibold">
        Chat Room
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
            <div className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow text-sm max-w-xs">
              {msg}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center border-t p-3 bg-white">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="ml-3 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
