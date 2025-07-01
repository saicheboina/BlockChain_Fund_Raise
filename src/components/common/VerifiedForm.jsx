import { Button } from "@/components/ui/button";
import { getAuth, sendEmailVerification } from "firebase/auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import toast from "react-hot-toast";

export function VerifiedForm() {
  const auth = getAuth();

  return (
    <Card className="shadow-none">
      <form>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm">Verify Your Email Address</CardTitle>
          <CardDescription>
            Click the button below to  send you  <br/> a verification link to
            your inbox.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2.5 p-4">
          <Button
            className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none"
            size="sm"
            onClick={async (e) => {
              e.preventDefault();
              try {
                await sendEmailVerification(auth.currentUser);
                toast.success("Verification link sent to your inbox. 📬");
              } catch (error) {
                toast.error(
                  "Unable to Verify You Try Again Later" + error.message
                );
              }
            }}
          >
            Verify Email
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
