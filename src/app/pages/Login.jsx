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
export function Login() {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
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
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  
                  className="ml-auto inline-block text-xs underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required
               value={password}
               onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
       
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
