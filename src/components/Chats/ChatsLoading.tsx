import React from "react";
import { Skeleton } from "@nextui-org/react";
const ChatsLoading = () => {
  const emptyArray = [1, 2, 3, 4, 5, 6];

  return (
    <React.Fragment>
      <div className="flex flex-col">
        {emptyArray &&
          emptyArray.map((items) =>
            items % 2 === 0 ? (
              <div
                key={items}
                className="max-w-[400px] p-5 bg-slate-100 rounded-lg w-full flex items-center gap-3 ms-auto"
              >
                <div>
                  <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-4/5 rounded-lg" />
                  <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
              </div>
            ) : (
              <div
                key={items}
                className="max-w-[400px] p-5 bg-slate-100 rounded-lg w-full flex items-center gap-3"
              >
                <div>
                  <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
              </div>
            )
          )}
      </div>
    </React.Fragment>
  );
};

export default ChatsLoading;
