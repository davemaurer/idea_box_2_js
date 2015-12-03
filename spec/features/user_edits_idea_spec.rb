require 'rails_helper'

RSpec.feature "User edits idea", js: true do
  scenario "successfully" do
    Idea.create(title: "original idea", body: "this is original", quality: 2)

    visit root_path

    click_on("Edit")

    fill_in "edit-title", with: ("editorialized idea")
    fill_in "edit-body", with: ("this is completely different")

    click_on("Edit Idea")

    expect(current_path).to eq(root_path)
    expect(page).to have_content("editorialized")
    expect(page).to have_content("completely different")
    idea = Idea.find_by(title: "editorialized idea")
    expect(idea).not_to eq(nil)
  end
end
