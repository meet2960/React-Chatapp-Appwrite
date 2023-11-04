import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function CommunitySkeleton() {
  const emptyArray = [...Array(8)];
  return (
    <div className="skeletons grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {emptyArray.map((items, index) => (
        <Card key={index} className="w-[350px] space-y-5 p-4" radius="lg">
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      ))}
    </div>
  );
}
