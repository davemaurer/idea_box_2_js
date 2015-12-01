require 'rails_helper'

RSpec.describe Idea, type: :model do
  context "idea attributes" do
    let(:idea1) { Idea.create!(title: "idea1", body: "this is idea1", quality: 2) }

    it "has a title" do
      expect(idea1.title).to eq "idea1"
    end

    it "has a body" do
      expect(idea1.body).to eq "this is idea1"
    end
  end
end
