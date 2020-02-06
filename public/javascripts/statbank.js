import { fetchJsonFromUrl } from './utils/bcd-async.mjs'
import { getTableMetadata } from './utils/bcd-statbank.mjs'
import { populateDropdownFromArray } from './utils/bcd-ui.mjs'
import JSONstat from 'https://unpkg.com/jsonstat-toolkit@1.0.8/import.mjs'
(async () => {
  console.log('Statbank Tool')
  const STATBANK_BASE_URL =
          'https://statbank.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/'

  const tableMetadata = '../data/statbank_table_metadata.json'
  // fetch metadata for Statbank tables
  let metadata = await fetchJsonFromUrl(tableMetadata)
  const tableCodes = metadata.map((d) => {
    return d.tablecode
  })
  let dropdown = document.getElementById('table-code-dropdown')

  populateDropdownFromArray(dropdown, tableCodes)

  dropdown.addEventListener('change', async (e) => {
    const tableCode = e.target.value
    console.log(`Loading ${tableCode}... \n`)
          // let el = document.getElementById('statbank-loading')
          // el.textContent = 'Fetching data from statbank.cso.ie'
          // let elProgress = document.createElement('progress')
          // elProgress.setAttribute('max', '100')
          // elProgress.setAttribute('value', '50')
          // el.appendChild(elProgress)
    let tableJson = await fetchJsonFromUrl(STATBANK_BASE_URL + tableCode)
    console.log(getTableMetadata(tableJson))
  })

  // console.log('Got table')
  // console.log(table)

  // let fetchAsync = async () => {
  //   let tableO = await dropdown.addEventListener('change', async (e) => {
  //     console.log('select \n')
  //     const tableCode = e.target.value
  // //       //   // let el = document.getElementById('statbank-loading')
  //       //   // el.textContent = 'Fetching data from statbank.cso.ie'
  //       //   // let elProgress = document.createElement('progress')
  //       //   // elProgress.setAttribute('max', '100')
  //       //   // elProgress.setAttribute('value', '50')
  //       //   // el.appendChild(elProgress)
  //     let table1 = await fetchStatbankTableFromUrl(STATBANK_BASE_URL + tableCode)
  //     console.log('Got table')
  //     console.log(table1)
  //     return table1
  //   })
  //   return tableO
  // }

  // const waitTable = await fetchAsync()
  // console.log('waitTable')
  // console.log(waitTable)
})()

// let resource = fetchResource(tableMetadata)
// console.log(resource.length)

// import JSONstat from 'https://unpkg.com/jsonstat-toolkit@1.0.8/import.mjs'
// import { datalist } from 'https://unpkg.com/jsonstat-utils@2.5.5/export.mjs'
//
// import { populateDropdownFromArray } from './utils/bcd-ui.mjs'
// // import { fetchStatbankTableFromUrl } from './utils/bcd-statbank.mjs'
//
// const STATBANK_BASE_URL =
//         'https://statbank.cso.ie/StatbankServices/StatbankServices.svc/jsonservice/responseinstance/'
// // need to start with an array of objects with table codes
// // as Statbank doesn't have a discoverable list
// fetch('../data/statbank_table_metadata.json')
//     .then(response => response.json())
//     .then(metadata => {
//       console.log('No of tables:\n')
//       console.log(metadata.length)
//       let tableCodes = metadata.map((d) => {
//         return d.tablecode
//       })
//
//       let dropdown = document.getElementById('table-code-dropdown')
//       populateDropdownFromArray(dropdown, tableCodes)
//
//       // dropdown.addEventListener('change', (e) => {
//       // // console.log('select \n')
//       //   const tableCode = e.target.value
//       //   // let el = document.getElementById('statbank-loading')
//       //   // el.textContent = 'Fetching data from statbank.cso.ie'
//       //   // let elProgress = document.createElement('progress')
//       //   // elProgress.setAttribute('max', '100')
//       //   // elProgress.setAttribute('value', '50')
//       //   // el.appendChild(elProgress)
//       //   tableJson = fetchStatbankTableFromUrl(STATBANK_BASE_URL + tableCode)
//       // })
//     })
//
// const readKey = () => new Promise(resolve => window.addEventListener('keypress', resolve, { once: true }))
//
// let fetchStatbankTableFromUrl = async (url) => {
//   const res = await fetch(url)
//   const json = await res.json()
//   return json
// }
