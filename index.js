require('dotenv').config()
const express = require('express')
const OktaJwtVerifier = require('@okta/jwt-verifier')
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.ISSUER,
})
const app = express()

// app.get('/', (req, res) => res.send('Hello World!'))

app.get('/', async (req, res) => {
    try {
      const { authorization } = req.headers
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