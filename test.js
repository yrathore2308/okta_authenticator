require('dotenv').config()
const request = require('request-promise')
const btoa = require('btoa')
const { ISSUER, TEST_CLIENT_ID, TEST_CLIENT_SECRET, DEFAULT_SCOPE } = process.env

const test = async () => {
  const token = btoa(`${TEST_CLIENT_ID}:${TEST_CLIENT_SECRET}`)
  try {
    const { token_type, access_token } = await request({
      uri: `${ISSUER}/v1/token`,
      json: true,
      method: 'POST',
      headers: {
        authorization: `Basic ${token}`,
      },
      form: {
        grant_type: 'client_credentials',
        scope: DEFAULT_SCOPE,
      },
    })

    // const response = await request({
    //   uri: 'http://localhost:3000',
    //   json: true,
    //   headers: {
    //     authorization: [token_type, access_token].join(' '),
    //   },
    // })
    bearerToken={
      headers: {
          authorization: [token_type, access_token].join(' '),
        } 
    }
    process.env['HEADER_TOKEN'] = bearerToken.headers.authorization;
    console.log('set env var val',process.env['HEADER_TOKEN']);

    // console.log(response)
  } catch (error) {
      console.log('error-----');
    console.log(`Error: ${error.message}`)
  }
}

module.exports=test;