require 'rails_helper'

RSpec.describe "User creates idea", type: :feature, js: true do
  context "when form is filled out and submit is clicked on" do
    it "can create a new idea" do
      visit root_path

      within(".new-idea") do
        fill_in "idea-title", with:("uneeke werds")
        fill_in "idea-body", with:("so mi tst fynds yt")
      end

      # with capybara when you pass a string for a label, it doesn't know what field you want unless you tell it
      #explicitly

      click_on "Create Idea"

      expect(current_path).to eq(root_path) #stay on page
      expect(page).to have_content("uneeke werds")
      expect(page).to have_content("fynds")
      idea = Idea.find_by(title: "uneeke werds")
      expect(idea).not_to eq(nil)
    end
  end
end
