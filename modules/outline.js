import React,{useState} from "react"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"

import outlineStyles from '../styles/Outline.module.css'

class ItemGeneric extends React.Component {
  constructor(props) {
    super(props)
  }
}

class ItemGenericOutline extends ItemGeneric
{
  constructor(props) {
    super(props) 
    this.render = this.render.bind(this)
    this.getClasses = this.getClasses.bind(this)
    this.onChildToggle = this.onChildToggle.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.renderOrder = this.renderOrder.bind(this)
    this.state = {showKids: true}
  }

  getClasses() {
    var classNames = [outlineStyles.item]
    switch (this.props.type) {
      case "concept":
      classNames.push(outlineStyles.concept)
      break;
      case "action":
      classNames.push(outlineStyles.action);
      break;
      case "clarification":
      classNames.push(outlineStyles.clarification);
      break;

      default:
      break;
    }
    return classNames.join(' ')
  }

  onChildToggle(event) {
    this.setState((state) => {
      return {...state, showKids: !this.state.showKids}
    })
  }

  renderItem(data) {
    return (
      <ItemGenericOutline {...data} />
    )
  }

  renderOrder(item) {
    let m = []
    switch (item.type) {
      case undefined:
      case null:
        m.push(' ')
        break;
      case 'clarification':
        m.push('\u2E19')
        break;
      case 'reference':
        m.push('\u2E20')
        break;
      default:
        m.push(this.props.order + '.')
        break;
    }
    return (m)
  }

  render() {
    return(
    <div className={this.getClasses()} key={this.props.id}> 
      <div className={outlineStyles.itemRow}>
      {this.props.children ? 
        <button className={`${outlineStyles.button} ${outlineStyles.but}`} onClick={this.onChildToggle}>{!this.state.showKids ? "+" : "-" }</button>
        : 
        <button className={`${outlineStyles.but} ${outlineStyles.noChildren}`}>-</button>
      } 
      <span className={outlineStyles.order}>
        {this.renderOrder(this.props)}
      </span>
      <span><ReactMarkdown remarkPlugin={{gfm}} className={outlineStyles.mdParent} children={this.props.text} /></span>
      </div>
      <div className={!this.state.showKids ? outlineStyles.childrenHide : outlineStyles.childrenShow}>
      {this.props.children ? this.props.children.map(this.renderItem) : ""}
      </div>
    </div>
    )
  }
  
}

export default React.forwardRef((props, ref) => <ItemGenericOutline {...props} innerRef={ref} />);