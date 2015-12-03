require 'rails_helper'

RSpec.feature "User deletes an idea", js: true do
  context "when clicking delete" do
    let!(:idea1) { Idea.create!(title: "uneeker tipe ideeah", body: "thees ish kewll") }

    it "can delete an idea" do
      visit root_path

      expect(page).to have_content("uneeker tipe ideeah")

      click_on("Delete")

      expect(page).not_to have_content("uneeker tipe ideeah")
    end
  end
end

