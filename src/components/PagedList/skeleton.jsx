import { Skeleton, Stack } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types';
import { map } from "lodash";

function ListSkeleton({ rows }) {
  return (
    <Stack gap={1}>
      {map([...Array(rows)], (x, index) => {
        return (
          <div key={index} style={{ display: 'flex' }}>
            <Skeleton variant="rounded" width={141} height={200} />
            <Skeleton variant="rounded" width={"100%"} height={200} style={{ marginLeft: 10 }} />
          </div>
        )
      })}
    </Stack>
  );
}

ListSkeleton.propTypes = {
  rows: PropTypes.number
}

ListSkeleton.defaultProps = {
  rows: 5
}

export default ListSkeleton