"use client"
import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export function SimpleLogInForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSignUp = async () => {
    const body = { name: name, email: email }
    const myRequest = new Request("/api", {
      method: "POST",
      body: JSON.stringify(body),
    });
    fetch(myRequest)
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "./"+email+"/dashboard";
          return response.json();
        } else {
          throw new Error("Something went wrong on the API server!");
        }
      })
      .then((response) => {
        console.debug(response);
        // ...
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const isButtonDisabled = name === "" || email === "";

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Log In
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to log in.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            crossOrigin=""
            size="lg"
            placeholder="name"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            crossOrigin=""
            size="lg"
            placeholder="email"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button className="mt-6" fullWidth onClick={handleSignUp} disabled={isButtonDisabled}>
          Log In
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account?{" "}
          <a href="/signUp" className="font-medium text-gray-900">
            Sign Up          </a>
        </Typography>
      </form>
    </Card>
  );
}
