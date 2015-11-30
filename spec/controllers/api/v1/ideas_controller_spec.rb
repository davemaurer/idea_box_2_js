require 'rails_helper'

RSpec.describe Api::V1::IdeasController, type: :controller do
  context "idea actions" do
    it "index displays all ideas" do
      Idea.create!(title: "testidea1", body: "this is the first test idea")
      Idea.create!(title: "testidea2", body: "this is a the second idea")

      get :index, format: :json

      index_response = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(index_response.first.body).to eq("this is the first test idea")
    end
  end
end
