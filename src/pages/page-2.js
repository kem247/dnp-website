import React from "react"
import { Link } from "gatsby"
import { Button } from "react-bootstrap"
import LabelWrapper from "../components/LabelWrapper/index.js"
import Layout from "../components/layout"
import SEO from "../components/seo"
var StatsD = require("node-dogstatsd").StatsD
var dogstatsd = new StatsD()
dogstatsd.increment("page.views")
const SecondPage = () => (
  <Layout>
    <LabelWrapper />
  </Layout>
)

export default SecondPage
