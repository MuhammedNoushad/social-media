import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface SocketContextValue {
  socket: Socket | null;
  onlineUsers: string[];
}

const SocketContext = createContext<SocketContextValue>({
  socket: null,
  onlineUsers: [],
});

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const token = localStorage.getItem("token");
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    let newSocket: Socket | null = null;

    if (token) {
      newSocket = io(import.meta.env.VITE_REACT_APP_BASE_URL, {
        query: {
          userId: user._id,
        },
      });
      setSocket(newSocket);
    }

    newSocket?.on("onlineUsers", (users: string[]) => {
      setOnlineUsers(users);
    });

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [token, user._id]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
