require 'rails_helper'

RSpec.describe "The Ideas Controller", type: :request do
  context "API endpoints" do
    let!(:idea1) { Idea.create!(title: "testidea1", body: "this is the first test idea", quality: 0) }
    let!(:idea2) { Idea.create!(title: "testidea2", body: "this is the second test idea", quality: 1) }
    let!(:idea3) { Idea.create!(title: "testidea3", body: "this is the third test idea", quality: 2) }

    let(:api_response) { JSON.parse(response.body) }

    it "displays all ideas" do

      get "/api/v1/ideas.json"

      expect(response.status).to eq(200)
      expect(api_response.count).to eq(3)
      expect(api_response.first["body"]).to eq("this is the first test idea")
      expect(api_response.last["body"]).to eq("this is the third test idea")
    end

    it "creates a new idea" do

      post "/api/v1/ideas.json", { idea: {title: "testidea4", body: "this is the fourth idea"} }

      expect(response.status).to eq(201) #created
      expect(api_response.count).to eq(6)
      expect(Idea.last.body).to eq("this is the fourth idea")
    end

    it "deletes an idea" do

      delete "/api/v1/ideas/#{idea1.id}.json"

      expect(response.status).to eq(204) #no content
      expect(Idea.all.count).to eq(2)
    end

    it "upvotes an idea" do

      expect(Idea.first.quality).to eq("swill")

      patch "/api/v1/ideas/#{idea1.id}/upvote.json", { idea1: {quality: "plausible"} }

      expect(response.status).to eq(200)
      expect(Idea.first.quality).to eq("plausible")
    end

    it "downvotes an idea" do

      expect(Idea.last.quality).to eq("genius")

      patch "/api/v1/ideas/#{idea3.id}/downvote.json", {idea3: {quality: "plausible"}}

      expect(response.status).to eq(200)
      expect(Idea.last.quality).to eq("plausible")
    end
  end
end
