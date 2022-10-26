import React from "react";
import { Avatar, Box, Chip } from "@mui/material"

const renderOptionUser = (props, option) => (
  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
    <Avatar sx={{ height: 25, width: 25, marginRight: 1 }} alt={option.name} src={option.imagePath} />
    {option.name}
  </Box>
)

const renderTagsUser = (tagValue, getTagProps) =>
  tagValue.map((option, index) => (
    <Chip
      key={option.id}
      label={option.name}
      avatar={<Avatar alt={option.name} src={option.imagePath} />}
      {...getTagProps({ index })}
    />
  ))

export {
  renderOptionUser,
  renderTagsUser
}