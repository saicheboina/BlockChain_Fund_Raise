import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
export function ForgotPassword() {
  const { resetPassword, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const [sent, setSent] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const res = await resetPassword(email);
    if (res !== false) {
      setSent(true);
    }
  };
  return (
    <div className="flex-row h-screen w-full items-center justify-center px-4">
      <div className=" p-5 flex-col justify-center items-center  w-full">
        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl text-center">
          Empower Dreams, Fund{" "}
          <span className="sm:block">Futures: Join Our Crowd </span>
        </h1>
        <p className="mx-auto mt-4 text-center md:max-w-2xl sm:text-xl/relaxed text-white">
          Be a part of the breakthrough and make someone&apos;s dream come true
        </p>
      </div>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            You will receive a link to your registered email for password reset.
          </CardDescription>
          <p className="text-red-500 text-center">{error}</p>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handelSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                required
                type="email"
                value={email}
                placeholder="m@example.com"
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>
            {sent && (
              <p className="text-green-500 text-center">
                Password reset link sent. <br/> Check your inbox and spam
                folder.
              </p>
            )}
            <Button type="submit" className="w-full">
              Send Email
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Got Your Password?{" "}
            <Link to="/login" className="underline">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
