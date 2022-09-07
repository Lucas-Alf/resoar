import { Skeleton, Stack } from "@mui/material";
import React from "react";

export default function ResearchCardSkeleton() {
  return (
    <Stack gap={1}>
      <Skeleton variant="rounded" width={192} height={273} />
      <Skeleton variant="rounded" width={192} height={28} />
    </Stack>
  );
}