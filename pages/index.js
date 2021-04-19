import Head from 'next/head'
import styles from '../styles/Home.module.css'

import React,{useState} from "react"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import ItemGenericOutline from '../modules/outline'
import MainTabs from '../modules/tabs'

export async function getStaticProps() {
  return {
    props: {
    }
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
        </h3>

        <MainTabs />
        

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
