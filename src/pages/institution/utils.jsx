import React from "react";
import { Avatar, Box } from "@mui/material"

const renderOptionInstitution = (props, option) => (
  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
    <Avatar sx={{ height: 25, width: 25, marginRight: 1 }} alt={option.name} src={option.imagePath} />
    {option.name}
  </Box>
)

export {
  renderOptionInstitution
}