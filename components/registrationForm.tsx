"use client"
import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export function SimpleRegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSignUp = async () => {
    const body = { name: name, email: email }
    const myRequest = new Request("/signUp/api", {
      method: "POST",
      body: JSON.stringify(body),
    });
    window.location.href = "./"+email+"/dashboard"; // Replace with your actual homepage URL
    fetch(myRequest)
      .then((response) => {
        if (response.status === 200) {
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
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Inicio de Sesión
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Al llenar el formulario guardaremos tus datos solo para evitar <br />
              el uso abusivo del sistema.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Tu nombre de usuario
                </Typography>
                <Input
                  crossOrigin=""
                  size="lg"
                  placeholder="nombre de usuario"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Tu correo electrónico
                </Typography>
                <Input
                  crossOrigin=""
                  size="lg"
                  placeholder="correo electrónico"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button className="mt-6" fullWidth onClick={handleSignUp} disabled={isButtonDisabled}>
                Ingresar
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
