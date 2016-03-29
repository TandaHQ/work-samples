BASE_URL = "http://localhost:3000" # change this based on where your server is running locally
require 'json'
require 'uri'
require 'net/http'
require 'date'

def run_tests!
  puts %Q(Hi! We'll be testing your server running at #{BASE_URL})

  puts %Q(\nAsking the server to clear all data...)
  fail!("Our post to /clear_data didn't return a 200 status code.") unless post_clear_data_request
  fail!("We asked the server to clear all data, but it seems like there is still some data present.") unless get_device_list.empty?

  puts %Q(\nSending some ping data to the server...)
  initial_post_data.each {|device_id, times| times.each {|time| post_request(device_id, time)}}

  puts %Q(\nChecking device list. Expecting #{initial_post_data.keys.count} devices...)
  devices = get_device_list
  fail!("Expected #{initial_post_data.keys.count} devices, got #{devices.count} devices.") unless devices.count == initial_post_data.keys.count

  puts %Q(\nGetting data for device #{initial_post_data.keys.first} on a specific date...)
  actions = get_on_date(initial_post_data.keys.first, Time.at(initial_post_data.values.first.first).to_date)
  fail!("Expected #{initial_post_data.values.first.count} pings, got #{actions.count} pings.") unless actions.count == initial_post_data.values.first.count

  puts %Q(\nGetting data for device #{initial_post_data.keys.last} on a range of dates...)
  actions = get_on_dates(initial_post_data.keys.last, Time.at(initial_post_data.values.last.first).to_date - 1, Time.at(initial_post_data.values.last.first).to_date + 1)
  fail!("Expected #{initial_post_data.values.last.count} pings, got #{actions.count} pings.") unless actions.count == initial_post_data.values.last.count

  puts %Q(\nGetting data for device #{initial_post_data.keys.last} on a range of timestamps (inclusive of last)...)
  actions = get_on_dates(initial_post_data.keys.last, initial_post_data.values.last.first, initial_post_data.values.last.last + 1)
  fail!("Expected #{initial_post_data.values.last.count} pings, got #{actions.count} pings.") unless actions.count == initial_post_data.values.last.count

  puts %Q(\nGetting data for device #{initial_post_data.keys.last} on a range of timestamps (exclusive of last)...)
  actions = get_on_dates(initial_post_data.keys.last, initial_post_data.values.last.first, initial_post_data.values.last.last)
  fail!("Expected #{initial_post_data.values.last.count - 1} pings, got #{actions.count} pings.") unless actions.count == initial_post_data.values.last.count - 1

  puts %Q(\nGetting data for all devices...)
  actions = get_on_dates("all", Date.new(2000, 1, 1), Date.new(2100, 1, 1))
  fail!("Expected #{initial_post_data.values.flatten.count} pings, got #{actions.values.flatten.count} pings.") unless actions.values.flatten.count == initial_post_data.values.flatten.count

  puts %Q(\nGetting data for an unrecognised device...)
  actions = get_on_dates("boo-urns", Date.new(2000, 1, 1), Date.new(2100, 1, 1))
  fail!("Expected 0 pings, got #{actions.count} pings.") unless actions.count == 0

  fail!("Our post to /clear_data didn't return a 200 status code.") unless post_clear_data_request
  puts %Q(\nGood work! All tests seem to be passing!)
end

def initial_post_data
  {
    "5581db36-57e7-4274-a36d-0c105c70fbfa" => [1459210148, 1459210448, 1459210748, 1459211048, 1459211348, 1459211648, 1459211948, 1459212248, 1459212548, 1459212848, 1459213148, 1459213448],
    "5225a416-3394-4e9f-9d97-e371d7615197" => [1459198796, 1459199096, 1459199396, 1459199696, 1459199996, 1459200296, 1459200596, 1459200896, 1459201196, 1459201496, 1459201796, 1459202096, 1459202396, 1459202696]
  }
end

# note: this extremely convoluted code is not how Ruby normally works, but Ruby's standard library's HTTP support
# is pretty horrible. most people use http://johnnunemaker.com/httparty/ but we wanted to minimise dependencies here.
def post_request(device_id, epoch_time)
  uri = URI.parse(BASE_URL)
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = false
  request = Net::HTTP::Post.new("/#{device_id}/#{epoch_time}")
  response = http.request(request)
  response.code == "200"
end

def post_clear_data_request
  uri = URI.parse(BASE_URL)
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = false
  request = Net::HTTP::Post.new("/clear_data")
  response = http.request(request)
  response.code == "200"
end

def get_on_date(device_id, date)
  uri = URI.parse("#{BASE_URL}/#{device_id}/#{date}")
  response = Net::HTTP.get_response(uri)
  JSON.parse(response.body)
end

def get_on_dates(device_id, from, to)
  uri = URI.parse("#{BASE_URL}/#{device_id}/#{from}/#{to}")
  response = Net::HTTP.get_response(uri)
  JSON.parse(response.body)
end

def get_device_list
  uri = URI.parse("#{BASE_URL}/devices")
  response = Net::HTTP.get_response(uri)
  JSON.parse(response.body)
end

def fail!(message)
  puts "\nError: #{message}"
  puts
  puts "Please fix these errors and try again."
  exit(1)
end

run_tests!
exit(0)
