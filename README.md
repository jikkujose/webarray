# WebArray Client

Fast remote arrays. No sign-up, access-controlled, works everywhere.

## Quick Start

``` js
import { WebArray } from "https://cdn.toolbomber.com/js/WebArray.min.js"

const webArray = WebArray.create("REPLACE_WITH_YOUR_SEED")

await webArray.append("Hello WebArray")
console.log(await webArray.read())
```
