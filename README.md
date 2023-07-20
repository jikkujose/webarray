# WebArray Client

Fast remote arrays. No sign-up, access-controlled, works everywhere.

## Quick Start

``` js
import { WebArray } from "https://cdn.toolbomber.com/js/WebArray.min.js"

const webArray = WebArray.create("REPLACE_WITH_YOUR_SEED")

await webArray.append("Hello WebArray")

console.log(await webArray.read())

await webArray.replace("Bye Bye!")
```

### Features

- It can do `read()`, `append(item)` & `replace(item)`
- Access can be restrcted by removing the specific keys in `webArray.keys`

### Use cases

- Forms
- Email Collectors
- Chat Systems
- Polls
- Surveys

### Minimal Feedback Example

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css"
    />
    <script type="module">
      import { WebArray } from "https://cdn.toolbomber.com/js/WebArray.min.js"
      window.webArray = await WebArray.create("YOUR_UNIQUE_KEY")

      window.update = async () => {
        const history = (await webArray.read()).join("\n")
        document.querySelector("#fbs").innerHTML = history
      }

      window.handleSubmit = async () => {
        const input = document.querySelector("#fbi")
        await webArray.append(input.value)
        input.value = ""
        await update()
      }

      update()
    </script>
  </head>
  <body>
    <main class="container">
      <div>
        <pre id="fbs"></pre>
      </div>
      <form onsubmit="event.preventDefault(); return false;">
        <textarea id="fbi" placeholder="Your feedback" rows="2"></textarea>
        <button type="button" onclick="handleSubmit()">Send</button>
      </form>
    </main>
  </body>
</html>
```
