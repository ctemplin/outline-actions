import Head from 'next/head'
import styles from '../styles/Home.module.css'
import outlineStyles from '../styles/Outline.module.css'
import React,{useState} from "react"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"

export async function getStaticProps() {
  return {
    props: {
    }
  }
}

class ItemGeneric extends React.Component {
  constructor(props) {
    super(props)
  }
}

class ItemGenericOutline extends ItemGeneric {

  constructor(props) {
    super(props) 
    this.render = this.render.bind(this)
    this.getClasses = this.getClasses.bind(this)
    this.onChildToggle = this.onChildToggle.bind(this)
    this.state = {showKids: false}
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

  render() {
    return(
    <div className={this.getClasses()} key={this.props.id}> 
      <div>
        {this.props.children ? <button className={outlineStyles.but} onClick={this.onChildToggle}>{!this.state.showKids ? "+" : "-" }</button> : ""} 
        <span style={{textAlign: 'right', paddingRight: '1ex'}}>
          {this.props.order}.
        </span>
        <span><ReactMarkdown remarkPlugin={{gfm}} className={outlineStyles.mdParent} children={this.props.text} /></span>
      </div>
      <div className={!this.state.showKids ? outlineStyles.childrenHide : outlineStyles.childrenShow}>
        {this.props.children ? this.props.children.map(renderItem) : ""}
      </div>
    </div>
    )
  }
}

function renderItem(data) {
    return (
      <ItemGenericOutline {...data} />
    )
}

export default function Home() {

  // react Hook For State Handler
  const [data , setData]=useState(null)

  // Fetch Function   
  fetch("./data.json").then(
    function(res){
    return res.json()
  }).then(function(data){
  // store Data in State Data Variable
    setData(data)
  }).catch(
    function(err){
      console.log(err)
    }
  )



  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>
          Transitioning from a<br/>
          Western Lifestyle of Disease to<br/>
          Ancestral Health
        </h2>
        <h3 className={styles.description}>
          An opionated guide to priorities, concepts and strategies.
          <span className={styles.more}>(Learn more)</span>
        </h3>
        

        <div style={{textAlign: 'left', paddingLeft: '8rem', marginRight: '8rem'}}>
        {
        // use data State Variable For Get Data Use JavaScript Map Mathod
        data? data.map(renderItem):""
        }
       </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          Placeholder
        </a>
      </footer>
    </div>
  )
}
