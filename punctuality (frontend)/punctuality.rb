# To run this server, you'll need to install Sinatra - a Ruby gem (library) for webservers. http://www.sinatrarb.com/
#
# Once you've installed Ruby, you can install Sinatra by running `gem install sinatra`.
#
# The `require` lines below tell Ruby what other libraries are required by this program. All other libraries listed
# here are part of Ruby's standard library and shouldn't require additional installation.
#
# Once you have installed your dependencies, you can run the server by running `ruby punctuality.rb` from the directory
# this file lives in. You should see output that looks like this:
#
# YourComputerName:punctuality yourname$ ruby punctuality.rb
# Puma 2.14.0 starting...
# * Min threads: 0, max threads: 16
# * Environment: development
# * Listening on tcp://localhost:4567
# == Sinatra (v1.4.7) has taken the stage on 4567 for development
#
# Test that it's working by going to http://localhost:4567/ (the port number is from the Sinatra output just above)
# Read the code to see other URLs you can access. Look at the data files for valid data ranges.
#
# If you come across issues getting this code to run, please document the issues and how you fixed them - we'd love
# to see your thought process (and also fix it for others in future!)

begin
  require 'sinatra'
rescue LoadError => e
  puts "You need to install the `sinatra` gem before you can run this server. There's instructions inside the server file - please take a look."
  exit(1)
end

require 'date'
require 'csv'
require 'json'

before do 
  headers['Access-Control-Allow-Origin'] = "*"
end

get '/' do
  erb :index
end

get '/roster/:date' do |date|
  content_type :json
  roster_data_for_dates(date, date)
end

get '/rosters/:from/:to' do |from, to|
  content_type :json
  roster_data_for_dates(from, to)
end

get '/shift/:date' do |date|
  content_type :json
  clockin_data_for_dates(date, date)
end

get '/shifts/:from/:to' do |from, to|
  content_type :json
  clockin_data_for_dates(from, to)
end

not_found do
  erb :not_found
end

def clockin_data_for_dates(from, to)
  api_data_from_file("shifts", from, to)
end

def roster_data_for_dates(from, to)
  api_data_from_file("roster", from, to)
end

def api_data_from_file(filename, from, to)
  from = Date.parse(from) unless from.is_a?(Date)
  to = Date.parse(to) unless to.is_a?(Date)

  data = CSV.parse(File.read("#{filename}.csv"), headers: true)
  range = from..to

  data.find_all {|row|
    date = Date.strptime(row['date'], "%d/%m/%y") rescue Date.parse(row['date'])
    date && range.cover?(date)}
      .compact
      .sort_by {|row| row['date']}
      .map {|row| {date: row['date'], start: row['start'], finish: row['finish']}}
      .to_json
end
