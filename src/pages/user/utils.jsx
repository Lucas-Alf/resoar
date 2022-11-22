import React, { Fragment } from "react";
import { Avatar, Box, Chip } from "@mui/material"
import { get, map, size } from "lodash";
import { Link } from "react-router-dom";

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

const renderUserList = (list, theme) => {
  const totalSize = size(list) - 1
  return map(list, (item, index) => {
    return (
      <Fragment key={index}>
        <Link style={{ color: theme.palette.text.secondary }} to={`/user/${get(item, 'id')}`}>{get(item, 'name')}</Link>
        {index != totalSize && ", "}
      </Fragment>
    )
  })
}

export {
  renderOptionUser,
  renderTagsUser,
  renderUserList
}