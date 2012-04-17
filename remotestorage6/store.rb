require 'sinatra'
require 'json'

set :dump_errors, true

get '/' do
  File.read('index.html')
end

get '/links' do
  Store.new.read
end

post '/links' do
  Store.new.add(JSON.parse request.body.read)
end

delete '/links/:id' do
  Store.new.delete params['id']
end

# Considering how I'm using this, after I wrote it I realized 
# that it would probably make more sense as a singleton.
# But, it's only meant as a simple example so, later...

class Store
  attr_accessor :urls

  def initialize urls=[]
    @urls = read_as_array || urls
  end

  def add url
    @urls << url
    save
  end

  def delete url_id
    @urls.delete_if {|u| u[:id].to_i == url_id.to_i}
    save
  end

  def save
    # Don't like this.
    new_id = @urls.inject(0) do |m, u|
      t = 0
      t = u[:id] if u.has_key?(:id)
      t = u['id'] if u.has_key?('id')
      m < t.to_i ? m = t.to_i : m
    end

    File.open('/tmp/urls.txt', 'w') do |f|
      f.puts @urls.each_index {|i|
        @urls[i][:id] = (new_id += 1) unless ( @urls[i].has_key?(:id) || @urls[i].has_key?('id') )
      }.to_json
    end
  end

  def read
    File.exists?('/tmp/urls.txt') ? File.read('/tmp/urls.txt') : ''
  end

  def read_as_array
    # yes, being kinda lazy here
    begin
      JSON.parse read, :symbolize_names => true
    rescue
      nil
    end
  end
end
