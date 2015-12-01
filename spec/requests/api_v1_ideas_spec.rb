require 'rails_helper'

RSpec.describe "The Ideas Controller", type: :request do
  context "API endpoint actions" do
    let!(:idea1) { Idea.create(title: "testidea1", body: "this is the first test idea") }
    let!(:idea2) { Idea.create(title: "testidea2", body: "this is the second test idea", quality: 1) }
    let!(:idea3) { Idea.create(title: "testidea3", body: "this is the third test idea", quality: 2) }

    let(:api_response) { JSON.parse(response.body) }
    
    it "displays all ideas" do

      get "/api/v1/ideas.json"

      expect(response.status).to eq(200)
      expect(api_response.count).to eq(3)
      expect(api_response.first["body"]).to eq("this is the first test idea")
      expect(api_response.last["body"]).to eq("this is the third test idea")
    end
  end
end
