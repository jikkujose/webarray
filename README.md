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

## Examples

### Shortest Backendless Code

Data lister in 17 lines of code!

Edit it live in [CodePen](https://codepen.io/jikkuatwork/pen/dyQjNGw?editors=1000)

``` html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.classless.min.css">
<script src="https://unpkg.com/alpinejs" defer></script>

<script src="https://cdn.toolbomber.com/js/WebArray.min.js"></script>

<div
  x-data="{ items: []}"
  x-init="items = await (await WebArray.create('planets')).read()"
>
  <table role="grid">
    <template x-for="item in items" :key="item.updatedAt">
      <tr>
        <th x-text="item.item"></th>
        <th x-text="new Date(item.updatedAt * 1000).toLocaleString()"></th></tr
    ></template>
  </table>
</div>
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
