interface Keys {
  [key: string]: string
}

interface ResponseType {
  error?: string
  payload?: any
  meta?: {
    updatedAt?: number
  }
}

export class WebArray {
  static API_URL = "https://webarray.toolbomber.com/api"
  static SHORT_HASH_LENGTH = 6

  keys: Keys

  constructor(keys: Keys) {
    this.keys = keys
  }

  read = async () => {
    let response: ResponseType = {}

    if (this.keys.read) {
      response = await WebArray.get("read", { key: this.keys.read })

      if (response.error) {
        throw new Error("Unauthorized: Bad key")
      } else {
        return response.payload
      }
    } else {
      throw new Error("Unauthorized: `read` key missing")
    }
  }

  updatedAt = async () => {
    let response: ResponseType = {}

    if (this.keys.read) {
      response = await WebArray.get("read", { key: this.keys.read })

      if (response.error) {
        throw new Error("Unauthorized: Bad key")
      } else {
        return response.meta?.updatedAt
      }
    } else {
      throw new Error("Unauthorized: `read` key missing")
    }
  }

  append = async (item: any) => {
    let response: ResponseType = {}

    if (this.keys.append) {
      response = await WebArray.post("append", {
        key: this.keys.append,
        data: item,
      })

      if (response.error) {
        throw new Error("Unauthorized: Bad key")
      } else {
        return response.payload
      }
    } else {
      throw new Error("Unauthorized: `append` key missing")
    }
  }

  replace = async (item: any = null) => {
    let response: ResponseType = {}

    if (this.keys.replace) {
      response = await WebArray.post("replace", {
        key: this.keys.replace,
        data: item,
      })

      if (response.error) {
        throw new Error("Unauthorized: Bad key")
      } else {
        return response.payload
      }
    } else {
      throw new Error("Unauthorized: `replace` key missing")
    }
  }

  static create = async (seed: string) => {
    const keys = await WebArray.post("create", { seed })
    return new WebArray(keys)
  }

  static generateKeys = async (seed: string) =>
    await WebArray.post("create", { seed })

  static post = async (route: string, parameters: object) => {
    const url = `${WebArray.API_URL}/${route}`

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parameters),
      })

      const data = await response.json()

      return data
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error)
    }
  }

  static get = async (route: string, parameters: object) => {
    const query = new URLSearchParams(
      parameters as Record<string, string>
    ).toString()

    const url = `${WebArray.API_URL}/${route}?${query}`

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      return data
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error)
    }
  }
}
