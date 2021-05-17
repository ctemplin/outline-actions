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
        <span className={`${ts.tab} ${this.state.activeTabIndex == 0 ? ts.active : ts.inactive}`} onClick={(e) => this.onTabClick(0, e)}><span className={ts.icon}>{'\u25A4'}</span><span>Concept Outline</span></span>
        <span className={`${ts.tab} ${this.state.activeTabIndex == 1 ? ts.active : ts.inactive}`} onClick={(e) => this.onTabClick(1, e)}><span className={ts.icon}>{'\u25EC'}</span><span>{'Action Pyramid'}</span></span>
        
        {
          this.props.extraTabs ? 
          this.props.extraTabs.map((extraTab, index) => 
            <span className={`${ts.tab} ${this.state.activeTabIndex == (2 + index) ? ts.active : ts.inactive}`} onClick={(e) => this.onTabClick(2 + index, e)}><span className={ts.icon}>{extraTab.icon}</span><span>{extraTab.name}</span></span>
          )
          :""
        }
        
      </div>
    )
  }
}

export default MainTabs;
