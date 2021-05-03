import React,{useState} from "react"
import ActionPyramidAction from "../modules/actionPyramidAction"

import pyramid from '../styles/ActionPyramid.module.css'
import outlineStyles from '../styles/Outline.module.css'

class ActionPyramidLevel extends React.Component
{
  constructor(props) {
    super(props) 
    this.render = this.render.bind(this)
    this.getClasses = this.getClasses.bind(this)
    this.render = this.render.bind(this)
    this.renderAction = this.renderAction.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
  }

  getClasses() {
    var classNames = [pyramid.actionPyramid]
    return classNames.join(' ')
  }

  renderAction(action) {
    return (
      <ActionPyramidAction {...action} useSliders={this.props.useSliders}/>
    )
  }

  clickHandler(event) {
    
  }

  render() {
    return(
    <div className={this.getClasses()}>
      <div className={pyramid.levelLabel}>Level {this.props.level}:</div>
      <div className={pyramid.division}>
        <div className={pyramid.levelActions}>
          {this.props.actions.map(this.renderAction)}
        </div>
      </div>
    </div>
    )
  }
  
}

export default React.forwardRef((props, ref) => <ActionPyramidLevel {...props} innerRef={ref} />);