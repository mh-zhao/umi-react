import React from 'react'

const ListLayout = (props:any) => {
  return (
    <> {props.children} </>
  )
}

ListLayout.title = '列表';

export default ListLayout;