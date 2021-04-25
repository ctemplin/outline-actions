import React,{useState} from "react"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"

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
  }

  getClasses() {
    var classNames = [pyramid.actionPyramid]
    return classNames.join(' ')
  }

  renderAction(action) {
    return (
      <ReactMarkdown remarkPlugin={{gfm}} className={pyramid.action} children={action.text} />
    )
  }

  render() {
    return(
    <div className={this.getClasses()}>
      <div className={pyramid.division}>
        <span className={pyramid.levelLabel}>Level {this.props.level}:</span>
        <div className={pyramid.levelActions}>
          {this.props.actions.map(this.renderAction)}
        </div>
      </div>
    </div>
    )
  }
  
}

export default React.forwardRef((props, ref) => <ActionPyramidLevel {...props} innerRef={ref} />);