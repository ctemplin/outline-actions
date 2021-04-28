import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ts from '../styles/Tabs.module.css'
import React,{useState} from "react"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import ItemGenericOutline from '../modules/outline'
import ActionPyramid from '../modules/actionPyramid'
import MainTabs from '../modules/tabs'

export async function getStaticProps(context) {
  const outlineData = await fetch(`${process.env.DATA_URL}`).then(res => res.json())

  // extract the outline items of type: action
  let actions = {"root": []}
  function extractActions(parentConceptOrder, item) {
    if (item.type == "action") {
      item.parentConceptOrder = parentConceptOrder
      item.level = parentConceptOrder.reduce((a, b) => a * b, 1) * item.order
      actions.root.push(item)
    } else if (item.children) {
      parentConceptOrder.push(item.order)
      item.children.map(extractActions.bind(null, [...parentConceptOrder]))
    }
  }
  outlineData.root.map(extractActions.bind(null, [1,]))

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
    <div className={`${styles.container}`}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main}`}>
        <h2 className={styles.title}>
          From Modern Disease to Ancestral Health
        </h2>
        <h3 className={styles.description}>
          An opionated guide to priorities, concepts and strategies.
        </h3>
        <div className={ts.tabsAndContent}>
          <MainTabs contentHandler={(activeTabIndex, e) => {setState({activeContentIndex: activeTabIndex})}} />
          <div style={{textAlign: 'left', width: 'inherit', maxWidth: 'inherit'}}>
            <div className={`${ts.outlineContent} ${state.activeContentIndex == 0 ? ts.contentActive : ts.contentInactive}`}>
              <div>
                {
                // use data State Variable For Get Data Use JavaScript Map Mathod
                outlineData ? outlineData.root.map(renderItem):""
                }
              </div>
            </div>
            <div className={`${ts.pyramidContent} ${state.activeContentIndex == 1 ? ts.contentActive : ts.contentInactive}`}>
              <ActionPyramid {...actions} />
            </div>
            <div className={`${ts.learnContent} ${state.activeContentIndex == 2 ? ts.contentActive : ts.contentInactive}`}>


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
