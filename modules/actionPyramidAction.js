import React from "react"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import cookieCutter from "cookie-cutter"

import pyramid from '../styles/ActionPyramid.module.css'
import outlineStyles from '../styles/Outline.module.css'



class ActionPyramidAction extends React.Component {
  constructor(props) {
    super(props)
    this.render = this.render.bind(this)
    this.onSliderInput = this.onSliderInput.bind(this)
    this.state = { complete: false, completePct: 0 }
  }

  componentDidMount() {
    var val = cookieCutter.get(this.props.id.toString())
    this.setState((state) => {
      return { ...state, completePct: val }
    })
  }


  onSliderInput(event) {
    this.setState((state) => {
      cookieCutter.set(this.props.id, event.target.value)
      return { ...state, completePct: event.target.value }
    })
  }

  render() {
    return (
      <div key={this.props.id} className={pyramid.action}>
        <ReactMarkdown remarkPlugin={{ gfm }} children={this.props.text} />
        {/* <span>{this.props.parentConceptOrder} * {this.props.order} = {this.props.level}</span> */}
          {this.props.useSliders ?
            <div>
            <input type="range" min="0" max="100" step="5" value={this.state.completePct} className={pyramid.slider}
            onInput={this.onSliderInput}></input>
{/*             <div class={'${range-slider'} style={{ "--min": 0, "--max": 100, "--value": this.state.completePct, "--text-value": this.state.completePct, "--suffix": "%" }}>
              <input type="range" min="0" max="100" value={this.state.completePct}
                onInput={this.props.onSliderInput}>
              </input>
              <output></output>
              <div className={'${range-slider__progress}'}></div>
            </div> */}
        </div>
            :
            <span />
          }
      </div>
    )
  }

}

export default React.forwardRef((props, ref) => <ActionPyramidAction {...props} innerRef={ref} />);