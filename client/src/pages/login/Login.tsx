// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { FC, useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../reducer/hooks";
import { setLoginReducer } from "../../reducer/slices/login.slice";

// ||||||||||||||||||||||||||||| Login Interface ||||||||||||||||||||||||||||||||||||

interface ILogin {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

// ||||||||||||||||||||||||||||| Login Component ||||||||||||||||||||||||||||||||||||

const Login: FC<ILogin> = ({ socket }) => {
  // Hooks
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  // Reducer
  const dispatch = useAppDispatch();

  const joinRoom = () => {
    if (username !== " " && room !== " " && username.length && room.length) {
      const data = { username, room };
      socket.emit("join_room", room);
      dispatch(setLoginReducer(data));
      navigate("/chat");
    }
  };

  // Return
  return (
    <div className="joinChatContainer">
      <h3>Join a Chat</h3>
      <input
        type="text"
        placeholder="Username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room ID..."
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
};
export default Login;
