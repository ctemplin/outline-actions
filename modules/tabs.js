import React,{useState} from "react"

import tabStyles from '../styles/Tabs.module.css'

class MainTabs extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className={tabStyles.container}>
        <span className={`${tabStyles.tab} ${tabStyles.active}`}>Concept Outline</span>
        <span className={`${tabStyles.tab} ${tabStyles.inactive}`}>Action Pyramid</span>
        <span className={`${tabStyles.tab} ${tabStyles.inactive}`}>Learn More</span>
      </div>
    )
  }
}

export default MainTabs;
