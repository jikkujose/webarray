var _a;
export class WebArray {
    constructor(keys) {
        this.read = async () => {
            let response = {};
            if (this.keys.read) {
                response = await WebArray.get("read", { key: this.keys.read });
                if (response.error) {
                    throw new Error("Unauthorized: Bad key");
                }
                else {
                    return response.payload;
                }
            }
            else {
                throw new Error("Unauthorized: `read` key missing");
            }
        };
        this.updatedAt = async () => {
            let response = {};
            if (this.keys.read) {
                response = await WebArray.get("read", { key: this.keys.read });
                if (response.error) {
                    throw new Error("Unauthorized: Bad key");
                }
                else {
                    return response.meta?.updatedAt;
                }
            }
            else {
                throw new Error("Unauthorized: `read` key missing");
            }
        };
        this.append = async (item) => {
            let response = {};
            if (this.keys.append) {
                response = await WebArray.post("append", {
                    key: this.keys.append,
                    data: item,
                });
                if (response.error) {
                    throw new Error("Unauthorized: Bad key");
                }
                else {
                    return response.payload;
                }
            }
            else {
                throw new Error("Unauthorized: `append` key missing");
            }
        };
        this.replace = async (item = null) => {
            let response = {};
            if (this.keys.replace) {
                response = await WebArray.post("replace", {
                    key: this.keys.replace,
                    data: item,
                });
                if (response.error) {
                    throw new Error("Unauthorized: Bad key");
                }
                else {
                    return response.payload;
                }
            }
            else {
                throw new Error("Unauthorized: `replace` key missing");
            }
        };
        this.keys = keys;
    }
}
_a = WebArray;
WebArray.API_URL = "https://webarray.toolbomber.com/api";
WebArray.SHORT_HASH_LENGTH = 6;
WebArray.create = async (seed) => {
    const keys = await WebArray.post("create", { seed });
    return new WebArray(keys);
};
WebArray.generateKeys = async (seed) => await WebArray.post("create", { seed });
WebArray.post = async (route, parameters) => {
    const url = `${WebArray.API_URL}/${route}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parameters),
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};
WebArray.get = async (route, parameters) => {
    const query = new URLSearchParams(parameters).toString();
    const url = `${WebArray.API_URL}/${route}?${query}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};
