import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { account } from "../../config/appwriteConfig";
import { AppwriteException } from "appwrite";
import toast from "react-hot-toast";
import { userStore } from "../../state/userStore";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const userState = userStore();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginForm) => {
    console.log("formData", data);
    return account
      .createEmailSession(data.email, data.password)
      .then((res) => {
        console.log("Reponse of Signup", res);
        userState.updateUserSession(res);
        toast.success("Login Successfully");
        navigate("/");
      })
      .catch((error: AppwriteException) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  return (
    <React.Fragment>
      <div className="h-screen flex justify-center items-center flex-col">
        <div className="container mx-auto">
          <Card className="mx-auto w-[600px]">
            <CardHeader className="flex justify-center">
              <h2 className="font-semibold">Welcome Back</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="flex flex-col">
                  <div className="mb-5">
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: true,
                        pattern: {
                          value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                          message: "Email address must be a valid address",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="email"
                          variant={"flat"}
                          label="Email"
                          className="relative"
                          isInvalid={errors["email"] ? true : false}
                          errorMessage={errors["email"]?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="mb-5">
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="password"
                          variant={"flat"}
                          label="Password"
                          className="relative"
                          isInvalid={errors["password"] ? true : false}
                          errorMessage={errors["password"]?.message}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="w-full"
                      color="danger"
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </form>
            </CardBody>
            <Divider />
            <CardFooter className="justify-center">
              <p>Don't have an account ? </p>
              <NavLink to={"/signup"}>Signup</NavLink>
            </CardFooter>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
