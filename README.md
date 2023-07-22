# WebArray

Fast remote arrays. Works everywhere, fine grained access conrols & no sign-ups.

## Available Platforms

- Ruby `gem install webarray`
- Node `npm install webarray`
- Python `pip3 install webarray`
- Web `https://cdn.toolbomber.com/js/WebArray.min.js`
- Others coming soon

## Ruby Web Demo

![Ruby Demo](./ruby-demo.svg)

## JS Console Example

Open a new tab and copy each of the following lines:

#### Import library

`import("https://cdn.toolbomber.com/js/WebArray.min.js")`

#### Generate keys

`const keys = await WebArray.generateKeys("USE_YOUR_SEED")`

#### Create instance by passing keys

`const wa = new WebArray(keys)`

Note: You can skip any of the `read`, `append` or `replace` keys to restrict
the instance from doing the corresponding action.

#### Append

`await wa.append("Mango")`

#### Read

`console.log(await wa.read())`

### Replace

`await wa.replace('Bye!')`

### Features

- It can do `read()`, `append(item)` & `replace(item)`
- Access can be restricted by removing the specific keys in `webArray.keys`

### Use cases

- Forms
- Email Collectors
- Chat Systems
- Polls
- Surveys
- Feedback Collectors
- Leaderboards
- Status pages

### Feedback Example

Just copy/paste this code to a file & open in browser to see it live! Or edit it
in live in [CodePen](https://codepen.io/jikkuatwork/pen/KKreaMv?editors=1000).

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

### Access Control

WebArray instance requires the `read`, `append` or `replace` keys to do the
specific actions. Initialising WebArray a keys object without any one of the
access keys prevents it from doing it.

Try creating the keys locally, save the seed and use the specific keys required
in the page.

#### WebArray.generateKeys(seed)

For instance `keys` can be independently created and used to initialise the client for
fine grained access control.

``` js
const keys = await WebArray.generateKeys("YOUR_UNIQUE_KEY")

delete keys.append
delete keys.replace

const readOnlyClient = new WebArray(keys)
```

### Note

- All remote access functions are `async`, do remember to use `await`
