import Logo from "../../assets/marvel_logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Import des components Shadcn

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// import des icons Lucid
import { Heart } from "lucide-react";
import { LogOut } from "lucide-react";

function Header({ token, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <header className="flex flex-col justify-center pb-10 gap-16">
      <div className="w-full flex justify-between p-2 gap-3 items-center border-b border-gray-100">
        {token ? (
          <>
            <div className="m-1 flex gap-2">
              {" "}
              <span className="text-sm text-gray-400">Connected as</span>
              <span className="text-sm">{Cookies.get("marvel-email")}</span>
            </div>
          </>
        ) : (
          <>
            <p></p>
          </>
        )}
        {token ? (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              setToken(null);
              Cookies.remove("marvel-token");
              Cookies.remove("marvel-email");
              Cookies.remove("marvel-signupEmail");
            }}
          >
            <LogOut /> Logout
          </Button>
        ) : (
          <>
            <div className="flex justify-end gap-2">
              {" "}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Log in
                  </Button>
                </DialogTrigger>
                <DialogContent className="">
                  <form
                    onSubmit={async (event) => {
                      event.preventDefault();
                      setErrorMessage("");
                      try {
                        const response = await axios.post(
                          "https://site--marvel-backend--n8fnmcvdjwtl.code.run/user/login",
                          { email, password },
                        );
                        setToken(response.data.token);
                        Cookies.set("marvel-token", response.data.token);
                        Cookies.set("marvel-email", email);
                        setOpen(false);
                        setEmail("");
                        setPassword("");
                      } catch (error) {
                        setErrorMessage(
                          error.response?.data?.message ||
                            "Une erreur est survenue",
                        );
                      }
                    }}
                  >
                    <DialogHeader className="mb-8">
                      <DialogTitle>Login</DialogTitle>
                    </DialogHeader>

                    <FieldSet className="w-full mb-8 ">
                      <FieldGroup className="">
                        <Field>
                          <FieldLabel htmlFor="email">Email</FieldLabel>
                          <Input
                            id="email"
                            type="text"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="password">Password</FieldLabel>

                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                          />
                        </Field>
                      </FieldGroup>
                    </FieldSet>

                    <Button size="lg" className="w-full">
                      Login
                    </Button>
                    {errorMessage && (
                      <p className="text-red-500 text-sm mt-2">
                        {errorMessage}
                      </p>
                    )}
                  </form>
                </DialogContent>
              </Dialog>
              <Dialog open={openSignup} onOpenChange={setOpenSignup}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Sign up
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form
                    onSubmit={async (event) => {
                      event.preventDefault();
                      setErrorMessage("");
                      try {
                        const response = await axios.post(
                          "https://site--marvel-backend--n8fnmcvdjwtl.code.run/user/signup",
                          {
                            email: signupEmail,
                            password: signupPassword,
                            newsletter,
                          },
                        );
                        setToken(response.data.token);
                        Cookies.set("marvel-token", response.data.token);
                        Cookies.set("marvel-email", signupEmail);
                        setOpenSignup(false);
                      } catch (error) {
                        setErrorMessage(
                          error.response?.data?.message ||
                            "Une erreur est survenue",
                        );
                      }
                    }}
                  >
                    <DialogHeader className="mb-6">
                      <DialogTitle>Create an account</DialogTitle>
                    </DialogHeader>
                    <FieldSet className="w-full mb-6 ">
                      <FieldGroup className="">
                        <Field>
                          <FieldLabel htmlFor="email">Email</FieldLabel>
                          <Input
                            id="email"
                            type="text"
                            placeholder="Enter your email"
                            value={signupEmail}
                            onChange={(event) =>
                              setSignupEmail(event.target.value)
                            }
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="password">Password</FieldLabel>

                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={signupPassword}
                            onChange={(event) =>
                              setSignupPassword(event.target.value)
                            }
                          />
                        </Field>
                        <Field orientation="horizontal">
                          <Checkbox
                            id="newsletter-checkbox"
                            checked={newsletter}
                            onCheckedChange={setNewsletter}
                          />
                          <FieldLabel
                            htmlFor="newsletter"
                            className="font-normal"
                          >
                            Subscribe to newsletter
                          </FieldLabel>
                        </Field>
                      </FieldGroup>
                    </FieldSet>
                    <Button size="lg" className="w-full">
                      Create an account
                    </Button>
                    {errorMessage && (
                      <p className="text-red-500 text-sm mt-2">
                        {errorMessage}
                      </p>
                    )}
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </>
        )}
      </div>{" "}
      <div className="flex justify-center flex-col items-center gap-4">
        <Link to="/">
          <img src={Logo} alt="Logo Marvel" className="w-28" />
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/characters">
            <Button variant="ghost">Characters</Button>
          </Link>
          <Link to="/comics">
            {" "}
            <Button variant="ghost">Comics</Button>
          </Link>
          {token && (
            <Link to="/favorites">
              <Button variant="ghost">
                <Heart />
                Favorites
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
