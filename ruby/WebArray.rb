require "net/http"
require "json"
require "uri"

class WebArray
  API_URL = "https://webarray.toolbomber.com/api"
  SHORT_HASH_LENGTH = 6

  def initialize(keys)
    @keys = keys
  end

  def read
    if @keys["read"]
      response = WebArray.get("read", { key: @keys["read"] })

      raise "Unauthorized: Bad key" if response["error"]
      return response["payload"]
    else
      raise "Unauthorized: `read` key missing"
    end
  end

  def updated_at
    if @keys["read"]
      response = WebArray.get("read", { key: @keys["read"] })

      raise "Unauthorized: Bad key" if response["error"]
      return response.dig("meta", "updatedAt")
    else
      raise "Unauthorized: `read` key missing"
    end
  end

  def append(item)
    if @keys["append"]
      response = WebArray.post("append", {
        key: @keys["append"],
        data: item,
      })

      raise "Unauthorized: Bad key" if response["error"]
      return response["payload"]
    else
      raise "Unauthorized: `append` key missing"
    end
  end

  def replace(item = nil)
    if @keys["replace"]
      response = WebArray.post("replace", {
        key: @keys["replace"],
        data: item,
      })

      raise "Unauthorized: Bad key" if response["error"]
      return response["payload"]
    else
      raise "Unauthorized: `replace` key missing"
    end
  end

  def self.create(seed)
    keys = WebArray.post("create", { seed: seed })
    return WebArray.new(keys)
  end

  def self.generate_keys(seed)
    return WebArray.post("create", { seed: seed })
  end

  def self.post(route, parameters)
    url = "#{API_URL}/#{route}"
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    req = Net::HTTP::Post.new(uri.path, { "Content-Type" => "application/json" })
    req.body = parameters.to_json
    res = http.request(req)
    return JSON.parse(res.body)
  rescue => e
    puts "There was a problem with the post operation: #{e}"
  end

  def self.get(route, parameters)
    url = "#{API_URL}/#{route}?#{URI.encode_www_form(parameters)}"
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    res = http.get(uri.request_uri)
    return JSON.parse(res.body)
  rescue => e
    puts "There was a problem with the get operation: #{e}"
  end
end
