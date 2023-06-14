import { Box, Skeleton, Stack } from "@mui/material";

function CardSkeleton() {
  //   return <Skeleton sx={{ height: 370, width: 345 }} animation="wave" variant="rectangular" />;
  return (
    <>
      <Stack spacing={1}>
        <Skeleton animation="wave" height={10} sx={{ display: "inline" }} width={300} />
        <Skeleton variant="circular" width={50} height={50} sx={{ display: "inline" }} />
        <Skeleton variant="rectangular" width={300} height={200} />
        <Skeleton variant="rounded" width={300} height={70} />
      </Stack>
    </>
  );
}

export default CardSkeleton;
