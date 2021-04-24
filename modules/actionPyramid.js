import React,{useState} from "react"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"

import pyramid from '../styles/ActionPyramid.module.css'

class ActionPyramid extends React.Component
{
  constructor(props) {
    super(props) 
    this.render = this.render.bind(this)
    this.getClasses = this.getClasses.bind(this)
    this.render = this.render.bind(this)
  }

  getClasses() {
    var classNames = [pyramid.actionPyramid]
    return classNames.join(' ')
  }

  render() {
    return(
    <div className={this.getClasses()}>
      {
       this.props.root ? this.props.root.map(function(item){return(<div>{item.level}={item.parentConceptOrder}*{item.order}-{item.text}</div>)}) : "no actions" 
      }
    </div>
    )
  }
  
}

export default React.forwardRef((props, ref) => <ActionPyramid {...props} innerRef={ref} />);