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

    // Set to the app-wide default
    let showKids = props.childrenExpandDefault
    // Override if specified for specific item
    if (props.childrenExpand && props.childrenExpand != null)
      showKids = props.childrenExpand
    this.state = {showKids: showKids}
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
      <ItemGenericOutline {...data} key={data.id}/>
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
    <div className={this.getClasses()}> 
      <div className={outlineStyles.itemRow}>
      {this.props.children ? 
        <button className={`${outlineStyles.button} ${outlineStyles.but}`} onClick={this.onChildToggle}>{!this.state.showKids ? "\u25B7" : "\u25BD" }</button>
        : 
        <button className={`${outlineStyles.but} ${outlineStyles.noChildren}`}>-</button>
      } 
        <span className={outlineStyles.orderAndText}>
          <span className={outlineStyles.order}> 
            {this.renderOrder(this.props)}
          </span>
          <span><ReactMarkdown remarkPlugins={[gfm]} className={outlineStyles.mdParent} children={this.props.text} linkTarget="_blank" /></span>
        </span>
      </div>
      <div className={!this.state.showKids ? outlineStyles.childrenHide : outlineStyles.childrenShow}>
      {this.props.children ? this.props.children.map(this.renderItem) : ""}
      </div>
    </div>
    )
  }
  
}

export default React.forwardRef((props, ref) => <ItemGenericOutline {...props} innerRef={ref} />);