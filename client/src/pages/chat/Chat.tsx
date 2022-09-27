// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import ScrollToBottom from "react-scroll-to-bottom";

import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useAppSelector } from "../../reducer/hooks";

// ||||||||||||||||||||||||||||| Login Interface ||||||||||||||||||||||||||||||||||||

interface IChat {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}
interface IMessageList {
  author: string;
  room: string;
  message: string;
  time: string;
}

// ||||||||||||||||||||||||||||| Chat Component ||||||||||||||||||||||||||||||||||||

const Chat: FC<IChat> = ({ socket }) => {
  // Reducer
  const { room, username } = useAppSelector((state) => state.login);

  // Hooks
  const [message, setMessage] = useState("");
  const [list, setMessageList] = useState<IMessageList[] | []>([]);
  const navigate = useNavigate();

  // Functions
  const sendMessage = async () => {
    if (message.length && message !== " ") {
      const messageData = {
        room,
        author: username,
        message,
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}`,
      };

      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setMessage("");
    }
  };
  useEffect(() => {
    if (!username || !room) {
      return navigate("/");
    }
  }, [username, room]);

  useEffect(() => {
    // Enter some content here.
    socket.on("receive_message", (data: IMessageList) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  // Return
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {list.map((content) => (
            <div
              className="message"
              id={username === content.author ? "you" : "other"}
            >
              <div className="">
                <div className="message-content">
                  <p>{content.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{content.time}</p>
                  <p id="author">{content.author}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Enter message...."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>📧</button>
      </div>
    </div>
  );
};
export default Chat;
