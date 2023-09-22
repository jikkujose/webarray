# WebArray

Fast remote arrays. Works everywhere, fine grained access conrols & no sign-ups.

## Available Platforms

- Ruby `gem install webarray`
- Web `https://cdn.toolbomber.com/js/WebArray.min.js`
- Others coming soon

## Ruby Demo

![Ruby Demo](./ruby-demo.svg)

## Quick Start

Open a broswer console & follow along:

#### Import library

``` js
import("https://cdn.toolbomber.com/js/WebArray.min.js")
```

#### Generate keys

``` js
const keys = await WebArray.generateKeys("USE_YOUR_SEED")
```

#### Create instance by passing keys

``` js
const wa = new WebArray(keys)
```

Note: You can skip any of the `read`, `append` or `replace` keys to restrict
the instance from doing the corresponding action.

#### Append

``` js
await wa.append("Mango")
```

#### Read

``` js
console.log(await wa.read())
```

#### Replace

``` js
await wa.replace('Bye!')
```

## Features

- It can do `read()`, `append(item)` & `replace(item)`
- Access can be restricted by removing the specific keys in `webArray.keys`

## Use cases

- Forms
- Email Collectors
- Chat Systems
- Polls
- Surveys
- Feedback Collectors
- Leaderboards
- Status pages

## Apps

- [Parayu](https://parayu.toolbomber.com)

## Examples

### Shortest Backendless Code

Full frontend and backend app in 29 lines of readable code!

Edit it live in [CodePen](https://codepen.io/jikkuatwork/pen/GRwBzBY?editors=1000)

``` html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@picocss/pico@1.5.10/css/pico.min.css"
/>
<script src="https://cdn.toolbomber.com/js/WebArray.min.js"></script>

<script type="module">
  const fruits = await (await WebArray.create("fruits")).read()

  fruits.forEach(fruit =>
    document.querySelector("tbody").insertAdjacentHTML(
      "beforeend",
      `
      <tr>
        <td>${fruit.name}</td>
        <td>${fruit.updatedAt}</td>
      </tr>
    `
    )
  )
</script>

<table role="grid">
  <tr>
    <th>Fruit</th>
    <th>Unix Time</th>
    <tbody></tbody>
  </tr>
</table>
```

## Access Control

WebArray instances requires the `read`, `append` or `replace` keys to do the
specific actions. Initialising WebArray a keys object without any one of the
access keys prevents it from doing it.

Try creating the keys locally, save the seed and use the specific keys required
in the page.

### WebArray.generateKeys(seed)

For instance `keys` can be independently created and used to initialise the client for
fine grained access control.

``` js
const keys = await WebArray.generateKeys("YOUR_UNIQUE_KEY")

delete keys.append
delete keys.replace

const readOnlyClient = new WebArray(keys)
```

## Note

- All remote access functions are `async`, do remember to use `await`
- A seed can hold only ~800KB of data
- Anyone with the seed can read/modify the data
- Not intended to be used for anything critical or even in production
- Planning to open source the code in future
- WebArray will always return an array, no matter what is used to replace it
  will all be put into an array
