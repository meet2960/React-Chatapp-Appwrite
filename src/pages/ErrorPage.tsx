import React from "react";

const ErrorPage = () => {
  return (
    <React.Fragment>
      <div className="h-screen w-screen flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold">Opps 404!</h1>
        <p className="">Page not Found. Please check your route</p>
      </div>
    </React.Fragment>
  );
};

export default ErrorPage;
