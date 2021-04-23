import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ts from '../styles/Tabs.module.css'
import React,{useState} from "react"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import ItemGenericOutline from '../modules/outline'
import MainTabs from '../modules/tabs'

export async function getStaticProps(context) {
  const outlineData = await fetch(process.env.SITE_URL + "/data.json").then(res => res.json())

  let actions = {"root": []}
  function extractActions(item) {
    if (item.type == "action") {
      actions.root.push(item)
    } else if (item.children) {
        item.children.map(extractActions)
    }
    
  }

  outlineData.root.map(extractActions)

  return {
    props: {
      outlineData: outlineData,
      actions: actions
    }
  }

}

function renderItem(item) {
    return (
      <ItemGenericOutline {...item} />
    )
}

export default function Home({outlineData, actions}) {

  const [state, setState] = useState({activeContentIndex: 1})

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
        </h3>
        <div className={ts.tabsAndContent}>
          <MainTabs contentHandler={(activeTabIndex, e) => {setState({activeContentIndex: activeTabIndex})}} />
          <div style={{textAlign: 'left', width: 'inherit', maxWidth: 'inherit'}}>
            <div className={`${ts.tabContent} ${state.activeContentIndex == 0 ? ts.contentActive : ts.contentInactive}`}>
              <div>
                {
                // use data State Variable For Get Data Use JavaScript Map Mathod
                outlineData ? outlineData.root.map(renderItem):""
                }
              </div>
            </div>
            <div className={`${ts.tabContent} ${state.activeContentIndex == 1 ? ts.contentActive : ts.contentInactive}`}>
                {
                  actions ? actions.root.map(function(item){return(<div>{item.text}</div>)}) : " "
                }
            </div>
            <div className={`${ts.tabContent} ${state.activeContentIndex == 2 ? ts.contentActive : ts.contentInactive}`}>


            </div>
          </div>
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
