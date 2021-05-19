import React from 'react'
import { WallPadToolSidebar, TextToolSidebar, LogoToolSidebar } from './Items'

class SidebarItemsDesktop extends React.Component {
  render() {
    return (
      <>
        <WallPadToolSidebar />
        <TextToolSidebar />
        <LogoToolSidebar />
      </>
    )
  }
}

export default SidebarItemsDesktop
