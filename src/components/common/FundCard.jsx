import { daysLeft } from "@/lib/utils";
import { EllipsisVertical, Layers3, Pickaxe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteEvent } from "@/api/api";
import toast from "react-hot-toast";
const FundCard = ({
  name,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
  category,
  uid,
  pid,
}) => {
  const remainingDays = daysLeft(deadline);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px] text-white">
          <Layers3 size={16} />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[16px] text-zinc-200">
            {category}
          </p>
          {(user.role === "Admin" || user.uid === uid) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-fit">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Actions
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem>View Campaign</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit-campaign/${pid}`, {
                      state: {
                        name,
                        title,
                        description,
                        target,
                        deadline,
                        image,
                        category,
                        pid,
                      },
                    });
                  }}
                >
                  Edit Campaign
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="bg-red-600"
                  onClick={async (e) => {
                    e.stopPropagation();
                   const status = await deleteEvent(pid)
                   if(status){
                    toast.success("Campaign Deleted Sucessfully! 😊")
                   }
                   else{
                    toast.error("Failed to Delete Campaign Please Try again 😓")

                   }
                  }}
                >
                  Delete
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-zinc-200 text-left leading-[18px] truncate">
            {description}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-zinc-100 leading-[22px]">
              ${amountCollected}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-zinc-200 sm:max-w-[120px] truncate">
              Raised of ${target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-zinc-100 leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-zinc-200 sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center text-white">
            <Pickaxe />{" "}
          </div>
          <p className="flex-1 font-epilogue font-medium text-[13px] text-zinc-200 truncate">
            by <span className="">{name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default FundCard;
