require('dotenv').config()
const express = require('express')
const tokenGenerator=require('./test');
const OktaJwtVerifier = require('@okta/jwt-verifier')
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.ISSUER,
})
const app = express()
const request = require('request-promise')
const btoa = require('btoa')
const { ISSUER, TEST_CLIENT_ID, TEST_CLIENT_SECRET, DEFAULT_SCOPE } = process.env
var bearerToken;
// app.get('/', (req, res) => res.send('Hello World!'))

//start
// const test = async () => {
//     const token = btoa(`${TEST_CLIENT_ID}:${TEST_CLIENT_SECRET}`)
//     try {
//       const { token_type, access_token } = await request({
//         uri: `${ISSUER}/v1/token`,
//         json: true,
//         method: 'POST',
//         headers: {
//           authorization: `Basic ${token}`,
//         },
//         form: {
//           grant_type: 'client_credentials',
//           scope: DEFAULT_SCOPE,
//         },
//       })
  
//       const response = await request({
//         uri: 'http://localhost:3000',
//         json: true,
//         headers: {
//           authorization: [token_type, access_token].join(' '),
//         },
//       })
//       bearerToken={
//         headers: {
//             authorization: [token_type, access_token].join(' '),
//           } 
//       }
//       console.log('final token',bearerToken.headers.authorization)
//       console.log(response)
//     } catch (error) {
//         console.log('error-----');
//       console.log(`Error: ${error.message}`)
//     }
//   }
  
//test();
//end



app.get('/', async (req, res) => {
    try {
       await tokenGenerator();
      const { authorization } = process.env['HEADER_TOKEN']
      if (!authorization) throw new Error('You must send an Authorization header')
  
      const [authType, token] = authorization.split(' ')
      if (authType !== 'Bearer') throw new Error('Expected a Bearer token')
  
      await oktaJwtVerifier.verifyAccessToken(token)
      res.json('Hello World!')
    } catch (error) {
      res.json({ error: error.message })
    }
  })

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))