import { useContext, useState } from "react";
import { Link } from "react-router-dom";
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

// Assuming you have a Select component similar to the one in the first code snippet
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthContext } from "@/context/AuthContext";
import { FormDescription } from "@/components/ui/form";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Company"); // Add state for role selection
  const { register, error } = useContext(AuthContext);

  const countries = [
    { value: "Company", label: "Company" },
    { value: "Investor", label: "Investor" },
    // Add more countries as needed
  ];

  const handelSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here (consider using a context or library like Formik for complex forms)
    console.log("Submitted data:", { name, email, password, role });
    register({ email, password, name ,role});

  };

  return (
    <div className="flex-row h-screen w-full items-center justify-center">
      <div className="p-5 flex-col justify-center items-center  w-full">
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
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your details below create your account
          </CardDescription>
          <p className="text-red-500 text-center">{error}</p>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handelSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder=""
                required
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={setRole} defaultValue={role}
              required
              >
                <SelectTrigger>
                  <SelectValue>
                    {role ? role.label : "Select Role"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {countries.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs">
              Please choose your role as it cannot be changed later.              </p>
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
