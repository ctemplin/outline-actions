import React,{useState} from "react"

import tabStyles from '../styles/Tabs.module.css'
import Link from "next/link"


class MainTabs extends React.Component {
  constructor(props) {
    super(props)
    this.onTabClick = this.onTabClick.bind(this)
    this.state = {activeTabIndex: 0}
    this.props.contentHandler(this.state.activeTabIndex)
  }

  onTabClick(activeTabIndex, event) {
    this.state.activeTabIndex = activeTabIndex
    this.props.contentHandler(activeTabIndex)
  }

  render() {
    const ts = tabStyles;
    return(
      <div className={ts.container}>
        <span className={`${ts.tab} ${this.state.activeTabIndex == 0 ? ts.active : ts.inactive}`}><a onClick={(e) => this.onTabClick(0, e)}>Concept Outline</a></span>
        <span className={`${ts.tab} ${this.state.activeTabIndex == 1 ? ts.active : ts.inactive}`}><a onClick={(e) => this.onTabClick(1, e)}>Action Pyramid</a></span>
        <span className={`${ts.tab} ${this.state.activeTabIndex == 2 ? ts.active : ts.inactive}`}><a onClick={(e) => this.onTabClick(2, e)}>Learn More</a></span>
      </div>
    )
  }
}

export default MainTabs;
