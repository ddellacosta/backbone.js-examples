require './store.rb'  # <-- your sinatra app
require 'rspec'
require 'rack/test'

set :environment, :test

describe 'The Store App' do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  before(:each) do
    @urls = [ {:url => 'http://google.com', :desc => 'Google.com' },
              {:url => 'http://microsoft.com', :desc => 'Microsoft.com'},
              {:url => 'http://yahoo.com', :desc => 'Yahoo.com'} ]

    @url = { :url => 'http://sinatrarb.com', :desc => 'Sinatra.com' }

    File.open('/tmp/urls.txt', 'w') {|f| f.puts ''}
  end

  describe "The Data Store" do
    it "saves a hash to a file" do
      store = Store.new @urls
      store.save
      File.read('/tmp/urls.txt').chomp.should == @urls.to_json
    end

    it "deletes items from the store" do
      store = Store.new @urls
      store.save
      ms_id = store.urls.find {|u| u[:desc] == 'Microsoft.com'}[:id]
      store.delete(ms_id)
      store.read_as_array.detect {|u| u[:id] == ms_id}.should be_nil
    end

    it "does not reset url ids" do
      store = Store.new @urls
      store.save
      store.delete(1)
      store.read_as_array.detect {|u| u[:id] == 1}.should be_nil
    end

    it "doesn't delete more than one at a time" do
      store = Store.new @urls
      store.save
      store.delete(1)
      store.urls.length.should > 0
    end

    # THIS IS NOT RIGHT BECAUSE I'M GETTING THE SAME ERROR
    it "does not create duplicate url IDs" do
      store = Store.new @urls
      store.save
      # this was set to one and the test was passing, as all ids were set to 1!
      store.delete(2)
      store.add @url

      # A bit complex. Collects urls together by id, 
      # then tests to see if there are more than one of any.
      enum = store.urls.chunk {|u| u[:id]}.any? {|i| i[1].length > 1}.should be_false
    end

    it "reads the saved file data" do
      store = Store.new @urls
      store.save
      JSON.parse(store.read, :symbolize_names => true).should == @urls
    end

    it "reads the saved file data as a hash" do
      store = Store.new @urls
      store.save
      store.read_as_array.should == @urls
    end

    it "fails gracefully if the file is empty" do
      store = Store.new
      store.read_as_array.should be_nil
    end

    it "loads saved data if it exists" do
      store = Store.new @urls
      store.save

      store2 = Store.new
      store2.read_as_array.should == store.urls
    end

    it "adds urls to the saved data" do
      store = Store.new @urls
      store.add @url
      store.read_as_array.should == @urls
    end

    it "gracefully handles the case where no file exists" do
      store = Store.new
      File.delete('/tmp/urls.txt')
      expect { store.read }.not_to raise_error
    end
  end

  describe "the web app" do
    it "saves to a JSON array" do
      url = { :url => 'http://google.com', :desc => 'Google.com', :id => 1}
      post '/links', url.to_json, "CONTENT_TYPE" => "application/json"

      store = Store.new
      store.read_as_array.should == [ url ]
    end

    it "responds with a JSON array of items" do
      store = Store.new(@urls)
      store.save

      get '/links'
      last_response.body.should == store.read
    end

    it "deletes an item from the data store" do
      store = Store.new(@urls)
      store.save
      url_id = store.urls[0][:id]

      delete '/links/:id', :id => url_id
      store.read_as_array.should == @urls.delete_if {|u| u[:id] == url_id}
    end

  end

end
