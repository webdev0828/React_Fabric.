import React from 'react'
import MatsToolSidebar from './Items/MatItem'
import LogoToolSidebar from './Items/LogoItem'
import TextToolSidebar from './Items/TextItem'

class SidebarItemsDesktop extends React.Component {
  render() {
    return (
      <>
        <MatsToolSidebar />
        <TextToolSidebar />
        <LogoToolSidebar />
      </>
    )
  }
}

export default SidebarItemsDesktop
