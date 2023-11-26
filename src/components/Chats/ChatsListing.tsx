import React, { useState, useEffect, useRef } from "react";
import { Button, Input } from "@nextui-org/react";
import { AppwriteException, ID, Models, Query } from "appwrite";
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
import { Copy, SendHorizontal, Trash } from "lucide-react";
import { formatDate } from "../../utils/formatDate";
const ChatsListing = () => {
  const chatWindowRef = useRef<HTMLDivElement>(null);
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
    if (id) {
      databases
        .listDocuments(conf.appwriteDatabaseId, CHAT_COLLECTION_ID, [
          Query.equal("community_id", id),
        ])
        .then((response) => {
          setChatsLoading(true);
          chatState.setChat(response.documents);
          toast.success("Fetch Success");
          console.log("fetch message date and time", response.documents);
        })
        .catch((error: AppwriteException) => {
          console.log("object");
          toast.error(error.message);
        })
        .finally(() => {
          setChatsLoading(false);
        });
    }
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
    return () => {
      chatState.clearChats();
    };
  }, []);

  const deleteMessage = (id: string) => {
    databases
      .deleteDocument(conf.appwriteDatabaseId, CHAT_COLLECTION_ID, id)
      .then(() => {
        toast.success("Message Deleted");
        chatState.deleteChat(id);
      })
      .catch((error: AppwriteException) => {
        toast.error(error.message);
      });
  };
  // useEffect(() => {
  //   console.log("height uef worked");
  //   if (chatWindowRef.current) {
  //     chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  //   }
  // }, [chatState.chats]);
  useEffect(() => {
    if (chatState.chats.length) {
      chatWindowRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [chatState.chats.length]);
  return (
    <React.Fragment>
      <>
        <div className="chat-listing">
          <h5 className="text-lg text-center">Chats</h5>
          {chatLoading && <ChatsLoading />}
          {/* All messages here */}
          <div className="flex flex-col">
            <div className="flex-1 pb-4 mb-20 chats-list">
              {chatState.chats.length > 0 &&
                chatState.chats.map((items) =>
                  items["user_id"] === userData.$id ? (
                    <div className="flex justify-end mb-3 " key={items.$id}>
                      <div className="bg-[#f2f6f7] shadow-md p-5 max-w-2xl rounded-xl current-user">
                        <div className="flex justify-between gap-x-8 mb-2">
                          <div>
                            <h4 className="text-lg font-bold">
                              {items["user_name"]}
                            </h4>
                          </div>
                          <div className="icons-list flex items-center gap-2">
                            <Button size="sm" isIconOnly>
                              <Copy size={18} />
                            </Button>
                            <Button
                              size="sm"
                              isIconOnly
                              className="delete-icon"
                              onClick={() => deleteMessage(items.$id)}
                            >
                              <Trash size={18} />
                            </Button>
                          </div>
                        </div>
                        <p>{items["chat_message"]}</p>
                        <div className="text-[10px] text-gray-600 text-end">
                          {formatDate(items.$createdAt)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="flex justify-start mb-3 other-user"
                      key={items.$id}
                    >
                      <div className="bg-[#f2f6f7] shadow-md p-3  max-w-lg rounded-xl">
                        <h4 className="text-lg">{items["user_name"]}</h4>
                        <h5>{items["chat_message"]}</h5>
                      </div>
                    </div>
                  )
                )}
            </div>
            <div className="p-4 fixed bottom-0 left-0 right-0 bg-white shadow-inner">
              <form onSubmit={handleSubmit} className="w-100">
                <div className="flex items-center justify-between">
                  <div className="w-full">
                    <Input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      variant={"flat"}
                      label="Type Message..."
                    />
                  </div>
                  <div className=" px-2">
                    <Button
                      isIconOnly
                      aria-label="Send"
                      color="primary"
                      type="submit"
                    >
                      <SendHorizontal />
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div ref={chatWindowRef}></div>
      </>
    </React.Fragment>
  );
};

export default ChatsListing;
