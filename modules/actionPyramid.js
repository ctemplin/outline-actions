import React,{useState} from "react"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import ActionPyramidLevel from '../modules/actionPyramidLevel'
import pyramid from '../styles/ActionPyramid.module.css'

class ActionPyramid extends React.Component
{
  constructor(props) {
    super(props) 
    this.render = this.render.bind(this)
    this.getClasses = this.getClasses.bind(this)
    this.extractLevels = this.extractLevels.bind(this)
    this.renderLevels = this.renderLevels.bind(this)
  }

  extractLevels() {
    let levels = new Set()
    this.props.root.map(item => levels.add(item.level))
    return levels
  }

  getClasses() {
    var classNames = [pyramid.actionPyramid]
    return classNames.join(' ')
  }

  extractActionsAtLevel(level){
    let actions = []
    this.props.root.map(action => action.level == level ? actions.push(action) : '')
    return actions
  }

  renderLevels() {
    const maxLevel = this.props.root.reduce((a, b) => Math.max(a,b.level), 1)
    let content = []
    for(let i=1; i<=maxLevel; i++){
      let p = {"level": i, "actions": this.extractActionsAtLevel(i)}
      content.push(<ActionPyramidLevel {...p} useSliders={this.props.useSliders} key={"apl" + i} />)
    }
    return content
  }


  render() {
    const levels = this.extractLevels()
    return(
    <div className={this.getClasses()}>
      {this.renderLevels()}
    </div>
    )
  }
  
}

export default React.forwardRef((props, ref) => <ActionPyramid {...props} innerRef={ref} />);