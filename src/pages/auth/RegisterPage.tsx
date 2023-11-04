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
import { ID, AppwriteException } from "appwrite";
import toast from "react-hot-toast";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}
const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "meet@gmail.com",
      password: "meet@",
    },
  });

  const handleRegisterUser = async (data: RegisterForm) => {
    return account
      .create(ID.unique(), data.email, data.password, data.name)
      .then((res) => {
        console.log("Reponse of Signup", res);
        toast.success("Successfully Registered");
        navigate("/login");
      })
      .catch((error: AppwriteException) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  return (
    <React.Fragment>
      <div className="h-screen flex justify-center items-center flex-col">
        <div className="container">
          <Card className="w-[600px] mx-auto">
            <CardHeader className="flex justify-center">
              <h2 className="font-semibold">Register Here</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <form onSubmit={handleSubmit(handleRegisterUser)}>
                <div className="flex flex-col">
                  <div className="mb-5">
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          variant={"flat"}
                          label="Full Name"
                        />
                      )}
                    />
                  </div>
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
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="w-full"
                      color="danger"
                      isLoading={isSubmitting}
                      isDisabled={isSubmitting}
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </form>
            </CardBody>
            <Divider />
            <CardFooter className="justify-center">
              <p className="me-2">Already have an account ? </p>
              <NavLink to={"/login"}>Login</NavLink>
            </CardFooter>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RegisterPage;
