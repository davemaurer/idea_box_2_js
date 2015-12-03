require 'rails_helper'

RSpec.feature "User creates idea", js: true do
  scenario "successfully" do
    visit root_path

    within(".new-idea") do
      fill_in "idea-title", with:("uneeke werds")
      fill_in "idea-body", with:("so mi tst fynds yt")
    end

    click_on "Create Idea"

    expect(current_path).to eq(root_path)
    expect(page).to have_content("uneeke werds")
    expect(page).to have_content("fynds")
    idea = Idea.find_by(title: "uneeke werds")
    expect(idea).not_to eq(nil)
  end

  scenario "unsuccessfully" do
    visit root_path

    within(".new-idea") do
      fill_in "idea-title", with:("")
      fill_in "idea-body", with:("so mi tst fynds yt")
    end

    click_on "Create Idea"

    expect(current_path).to eq(root_path)
    expect(page).not_to have_content("uneeke werds")
    expect(page).not_to have_content("fynds")
  end
end
