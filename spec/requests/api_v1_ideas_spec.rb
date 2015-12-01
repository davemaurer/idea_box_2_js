require 'rails_helper'

RSpec.describe "The Ideas Controller", type: :request do
  context "API endpoint actions" do
    let!(:idea1) { Idea.create!(title: "testidea1", body: "this is the first test idea") }
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

      post '/api/v1/ideas.json', { idea: {title: "testidea4", body: "this is the fourth idea"} }

      expect(response.status).to eq 201 #created
      expect(api_response.count).to eq(6)
      expect(Idea.last.body).to eq("this is the fourth idea")
    end
  end
end
