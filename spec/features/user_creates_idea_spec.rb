require 'rails_helper'

RSpec.describe "User creates idea", type: :feature, js: true do
  context "when form is filled out and submit is clicked on" do
    it "can create a new idea" do
      visit root_path

      fill_in "idea-title", with: "uneeke werds"
      fill_in "idea-body", with: "so mi tst fynds yt"
      click_on "Create Idea"

      idea = Idea.find_by(title: "uneeke werds")
      expect(idea).not_to eq(nil)

      expect(current_path).to eq(root_path) #stay on page
      expect(page).to have_content "uneeke werds"
      expect(page).to have_content "fynds"
    end
  end
end
