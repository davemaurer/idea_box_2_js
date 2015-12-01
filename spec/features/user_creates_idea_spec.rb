require 'rails_helper'

RSpec.describe "User creates idea", type: :feature, js: true do
  context "when form is filled out and submit is clicked on" do
    it "can create a new idea" do
      visit root_path

      fill_in "Idea Name", with: "uneeke werds"
      fill_in "Idea Description", with: "so mi tst fynds yt"
      click_on "Create Idea"

      expect(current_path).to eq(root_path) #stay on page
      expect(page).to have_content "uneeke werds"
      expect(page).to have_content "swill"
    end
  end
end
