import CommunityListing from "../../components/Home/CommunityListing";
import CreateCommunity from "../../components/Home/CreateCommunity";
const Home = () => {
  return (
    <div className="container">
      <div className="flex justify-end">
        <CreateCommunity />
      </div>
      <CommunityListing />
    </div>
  );
};

export default Home;
