import React, { useState, useEffect, useRef } from "react";
import { Input, user } from "@nextui-org/react";
import { AppwriteException, Databases, ID, Models } from "appwrite";
import {
  CHAT_COLLECTION_ID,
  databases,
  client,
} from "../../config/appwriteConfig";
import conf from "../../conf/conf";
import { useParams } from "react-router-dom";
import { userStore } from "../../state/userStore";
import toast from "react-hot-toast";
import { chatStore } from "../../state/chatStore";
import ChatsLoading from "../../components/Chats/ChatsLoading";
import { Trash } from "lucide-react";
const ChatPage = () => {
  const { id } = useParams();
  const [chatLoading, setChatsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const userData = userStore(
    (state) => state.user
  ) as Models.User<Models.Preferences>;

  const chatState = chatStore();

  const isFetched = useRef(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    databases
      .createDocument(
        conf.appwriteDatabaseId,
        CHAT_COLLECTION_ID,
        ID.unique(),
        {
          community_id: id,
          chat_message: message,
          user_name: userData.name,
          user_id: userData.$id,
        }
      )
      .then((response) => {
        console.log("Response of Chat API", response);
        chatState.addChat(response);
        setMessage("");
      })
      .catch((error: AppwriteException) => {
        toast.error(error.message);
      });
  };

  const fetchMessages = () => {
    setChatsLoading(true);
    databases
      .listDocuments(conf.appwriteDatabaseId, CHAT_COLLECTION_ID)
      .then((response) => {
        setChatsLoading(true);
        chatState.setChat(response.documents);
        toast.success("Fetch Success");
      })
      .catch((error: AppwriteException) => {
        console.log("object");
        toast.error(error.message);
      })
      .finally(() => {
        setChatsLoading(false);
      });
  };

  useEffect(() => {
    if (!isFetched.current) {
      fetchMessages();
      // For Real Time
      client.subscribe(
        `databases.${conf.appwriteDatabaseId}.collections.${CHAT_COLLECTION_ID}.documents`,
        (response) => {
          console.log("Realtime Response is", response);
          const payload = response.payload as Models.Document;
          if (
            response.events.includes(
              "databases.*.collections.*.documents.*.create"
            )
          ) {
            if (userData.$id !== payload["user_id"]) {
              chatState.addChat(payload);
            }
          } else if (
            response.events.includes(
              "databases.*.collections.*.documents.*.delete"
            )
          ) {
            chatState.deleteChat(payload.$id);
          }
        }
      );
      isFetched.current = true;
    }
  }, []);

  const deleteMessage = (id: string) => {
    databases
      .deleteDocument(conf.appwriteDatabaseId, CHAT_COLLECTION_ID, id)
      .then((response) => {
        toast.success("Message Deleted");
        chatState.deleteChat(id);
      })
      .catch((error: AppwriteException) => {
        toast.error(error.message);
      });
  };

  return (
    <React.Fragment>
      <div className="container">
        <div>
          <h5 className="text-lg text-center">Chats</h5>
          <div className="">{chatLoading && <ChatsLoading />}</div>
          {/* All messages here */}
          <div className="flex flex-col">
            <div className="flex-1 p-4 mb-20">
              {chatState.chats.length > 0 &&
                chatState.chats.map((items, index) =>
                  items["user_id"] === userData.$id ? (
                    <div className="flex justify-end mb-3" key={items.$id}>
                      <div className="bg-slate-800 p-5 text-slate-100 max-w-lg rounded-xl">
                        <h4 className="text-lg font-bold">
                          {items["user_name"]}
                        </h4>
                        <h5>{items["chat_message"]}</h5>
                        <div
                          className="delete-icon cursor-pointer"
                          onClick={() => deleteMessage(items.$id)}
                        >
                          <Trash />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-start mb-3" key={items.$id}>
                      <div className="bg-gray-500 p-5 text-slate-100 max-w-lg rounded-xl">
                        <h4 className="text-lg">{items["user_name"]}</h4>
                        <h5>{items["chat_message"]}</h5>
                      </div>
                    </div>
                  )
                )}
            </div>
            <div className="p-4 fixed bottom-0 left-0 right-0 bg-white">
              <form onSubmit={handleSubmit}>
                <Input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  variant={"flat"}
                  label="Type Message..."
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatPage;
