import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import FundCard from "@/components/common/FundCard";
import Loader from "@/components/common/Loader";

const DisplayCampaigns = ({ isLoading, campaigns, search }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.pid}`, { state: campaign });
  };

  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && campaigns.length === 0 && search === "" && (
        <p className="font-epilogue font-semibold  text-[14px] leading-[30px] text-[#818183]">
          You have not created any campigns yet
        </p>
      )}
      {campaigns.length === 0 && search !== "" && (
        <p className="font-epilogue font-semibold  text-[14px] leading-[30px] text-[#818183]">
          No Results found on Campigns with &quot;{search} &quot;
        </p>
      )}
      {!isLoading &&
        campaigns.length > 0 &&
        campaigns.map((campaign) => (
          <FundCard
            key={uuidv4()}
            {...campaign}
            handleClick={() => handleNavigate(campaign)}
          />
        ))}
    </>
  );
};

export default DisplayCampaigns;
