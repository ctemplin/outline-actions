import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ts from '../styles/Tabs.module.css'
import outlineStyles from '../styles/Outline.module.css'
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
      item.parentConceptOrder = [...parentConceptOrder]
      // Honor the level as forced/specified in the data.
      // Otherwise, calculate it.
      if (!item.level || item.level == null) {
        item.level = item.parentConceptOrder.reduce((a, b) => a * b, 1) * item.order
      }
      actions.root.push(item)
    } else if (item.children) {
      parentConceptOrder = [...parentConceptOrder]
      parentConceptOrder.push(item.order)
      item.children.map(extractActions.bind(null, parentConceptOrder))
    }
  }
  outlineData.root.map(extractActions.bind(null, []))

  return {
    props: {
      outlineData: outlineData,
      actions: actions,
      useSliders: process.env.USE_SLIDERS === 'true' ? true : false
    }
  }

}

function renderItem(childrenExpandDefault, item) {
    return (
      <ItemGenericOutline {...item} key={item.id} childrenExpandDefault={childrenExpandDefault} />
    )
}

export default function Home({outlineData, actions, useSliders}) {

  const [state, setState] = useState({activeContentIndex: 1})

  return (
    <div className={`${styles.container}`}>
      <Head>
        <title>{outlineData.headerText}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main}`}>
        <h2 className={styles.title}>
          {outlineData.headerText}
        </h2>
        <h3 className={styles.description}>
          {outlineData.subheaderText}
        </h3>
        <div className={ts.tabsAndContent}>
          <MainTabs extraTabs={outlineData.extraTabs} contentHandler={(activeTabIndex, e) => {setState({activeContentIndex: activeTabIndex})}} />
          <div style={{textAlign: 'left', width: 'inherit', maxWidth: 'inherit'}}>
            <div className={`${ts.outlineContent} ${outlineStyles.outlineContent} ${state.activeContentIndex == 0 ? ts.contentActive : ts.contentInactive}`}>
              <div>
                {
                // use data State Variable For Get Data Use JavaScript Map Mathod
                outlineData ? outlineData.root.map(renderItem.bind(null, outlineData.childrenExpandDefault)):""
                }
              </div>
            </div>
            <div className={`${ts.pyramidContent} ${state.activeContentIndex == 1 ? ts.contentActive : ts.contentInactive}`}>
              <ActionPyramid {...actions} useSliders={useSliders} />
            </div>
            {
              outlineData.extraTabs ?
                outlineData.extraTabs.map((tabData, index) => 
                <div className={`${ts.extraTabContent} ${state.activeContentIndex == (2 + index) ? ts.contentActive : ts.contentInactive}`}>
                  <ReactMarkdown remarkPlugins={[gfm]} children={tabData.content} linkTarget="_blank" />
                </div>)
              :
              ""
            }
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/ctemplin/outline-actions"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          ActionOutline
        </a>
      </footer>
    </div>
  )
}
