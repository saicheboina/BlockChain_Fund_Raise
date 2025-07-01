import { useContext, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

import PaymentLoader from "@/components/common/PaymentLoader";
import CountBox from "@/components/common/CountBox";
import CustomButton from "@/components/common/CustomButton";
import { calculateBarPercentage, daysLeft } from "@/lib/utils";
import { LucideWebhook,  Sparkles,   } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { saveDonorInfo } from "@/api/api";
import { AuthContext } from "@/context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Table
} from "@/components/ui/table";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

const CampaignDetails = () => {
  const { user, allCampaigns } = useContext(AuthContext);
  const { state:localState } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const state = localState || allCampaigns.find(_ => _.pid===id);

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");

  const remainingDays = daysLeft(state.deadline);

  const publishableKey =
    "pk_test_51Ht8t0AUGh2stU4g2NhzjhmzwmSJ6Mt3ghnJAbE6L6xGm0BpbgVQaids6bI9ZboSENHhYe87U2VVsai87mR3QdeJ00VoxGi0Ho";
  const onToken = async () => {

    setIsLoading(true);
    await saveDonorInfo(state, {
      amount,
      uid: user.uid,
      email: user.email,
      name: user.name,
      transactionId: uuidv4(),
      date: Date.now()
    });
    setIsLoading(false);
    navigate("/");
  };
  return (
    <>
      <header className="fixed flex bg-[#09090b] h-20 w-full   shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-20">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />

          {user?.role === "Company" && (
            <Link className="fixed right-10 " to={"/create-campaign"}>
              <Button variant="ghost" className="bg-orange-600 text-white">
                <Sparkles /> Create Campaign
              </Button>{" "}
            </Link>
          )}
        </div>
      </header>
      <div className="p-6 mt-20">
        {isLoading && <PaymentLoader />}

        <div className="flex md:flex-row flex-col  gap-[30px]">
          <div className="flex-1 flex-col">
            <img
              src={state.image}
              alt="campaign"
              className="w-full h-[410px] object-contain rounded-xl"
            />
            <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
              <div
                className="absolute h-full bg-[#4acd8d]"
                style={{
                  width: `${calculateBarPercentage(
                    state.target,
                    state.amountCollected
                  )}%`,
                  maxWidth: "100%",
                }}
              ></div>
            </div>
          </div>

          <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
            <CountBox title="Days Left" value={remainingDays} />
            <CountBox
              title={`Raised of $${state.target}`}
              value={`$${state.amountCollected}`}
            />
            <CountBox title="Total Backers" value={state?.donators.length} />
          </div>
        </div>

        <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
          <div className="flex-[2] flex flex-col gap-[40px]">
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Creator
              </h4>

              <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full text-white cursor-pointer">
                  <LucideWebhook />
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                    {state.name}
                  </h4>
                  <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                    {state.email}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Story
              </h4>

              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  {state.description}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Donators
              </h4>
             
              <div className="mt-[20px] flex flex-col gap-4">
                {state?.donators.length > 0 ?  
                <Table className="text-white">
                <TableCaption>A list of recent funds.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state?.donators.map((invoice) => (
                    <TableRow key={invoice.date}>
                      <TableCell className="font-medium">
                        {invoice.name}
                      </TableCell>
                      <TableCell>{invoice.email}</TableCell>
                      <TableCell>{dayjs(invoice.date).fromNow()
                      }</TableCell>
                      <TableCell className="text-right">
                        ${invoice.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">
                      ${state.amountCollected}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table> : (
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    No donations yet. Be the first one!
                  </p>
                )}
              </div>
            </div>
          </div>

        {
          user?.role ==="Investor" &&   <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            Fund
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="$0.1"
                min="0.1" // Prevents negative values
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value >= 0.1 ? e.target.value : 0.1)}              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>
              {
                amount!=="" ?
              <StripeCheckout
                label="Fund Campaign"
                name={state.title}
                image={state.image}
                shippingAddress={false}
                billingAddress={false}
                currency="USD"
                email={user.email}
                zipCode={false}
                description={`Your total is $${amount}.00`}
                amount={amount *100}
                panelLabel="Pay Now"
                token={onToken}
                bitcoin
                stripeKey={publishableKey}
                
              >
                <CustomButton
                
                  btnType="button"
                  title="Fund Campaign"
                  //   styles="w-full bg-[#8c6dfd]"

                  styles="w-full bg-orange-600"
                />
              </StripeCheckout>:
               <CustomButton
                
               btnType="button"
               title="Fund Campaign"
               //   styles="w-full bg-[#8c6dfd]"

               styles="w-full bg-zinc-300"
             />
              }
            </div>
          </div>
        </div>
        }
        </div>
      </div>
    </>
  );
};

export default CampaignDetails;
