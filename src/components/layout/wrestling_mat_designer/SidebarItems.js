import React from 'react'
import {
  MatsToolSidebar,
  ColorToolSidebar,
  CircleToolSidebar,
  ArtworkToolSidebar,
  TextToolSidebar,
} from './Items'

class SidebarItemsDesktop extends React.Component {
  render() {
    return (
      <>
        <MatsToolSidebar />
        <ColorToolSidebar />
        <CircleToolSidebar />
        <TextToolSidebar />
        <ArtworkToolSidebar />
      </>
    )
  }
}

export default SidebarItemsDesktop
