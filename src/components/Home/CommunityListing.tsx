import React, { useEffect, useRef, useState } from "react";
import { databases } from "../../config/appwriteConfig";
import conf from "../../conf/conf";
import { Query, AppwriteException } from "appwrite";
import toast from "react-hot-toast";
import { communityStore } from "../../state/communityStore";
import CommunitySkeleton from "./CommuintySkeleton";
import { Button, Card, CardBody } from "@nextui-org/react";
import { Link } from "react-router-dom";

const CommunityListing = () => {
  const communityState = communityStore();
  const [loading, setLoading] = useState<boolean>(false);
  const isDataFetched = useRef(false);
  console.log("isDataFetched", isDataFetched);
  console.log("isState", communityState.isDataFetched);
  useEffect(() => {
    if (!isDataFetched.current) {
      setLoading(true);
      databases
        .listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId)
        .then((response) => {
          console.log("Response of Communitites List", response);
          if (response.total > 0) {
            communityState.setCommunity(response.documents);
          }
          setLoading(false);
        })
        .catch((error: AppwriteException) => {
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
      isDataFetched.current = true;
    }
  }, []);
  return (
    <div>
      <h3 className="text-2xl mb-5">Communitites :</h3>
      <div>
        {loading && <CommunitySkeleton />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {communityState.communities.length > 0 &&
            communityState.communities.map((items, index) => (
              <Card key={items.$id}>
                <CardBody className="gap-y-2">
                  <h4 className="text-xl font-bold">{items?.Name}</h4>
                  <p className="">{items?.Description}</p>
                  <p className="">Found more people in this community</p>
                  <Link
                    to={`/chats/${items.$id}`}
                    className="text-blue-500 text-medium"
                  >
                    Chat
                  </Link>
                </CardBody>
              </Card>
            ))}
        </div>
        <div className="flex justify-center">
          {communityState.communities.length === 0 && loading === false && (
            <div>
              <h2 className="text-danger-500 font-bold text-2xl">
                No Community Found
              </h2>
              <p>Be the first one to create a Unique Community</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityListing;
