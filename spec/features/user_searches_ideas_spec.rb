require 'rails_helper'

RSpec.feature "User searches ideas", js: true do
  scenario "successful upvote" do
    Idea.create(title: "zebra", body: "stipes", quality: 0)
    Idea.create(title: "anteater", body: "ants", quality: 0)

    visit root_path

    expect(page).to have_content('zebra')
    expect(page).to have_content('anteater')

    within('#search') do
    fill_in 'idea-search', with:('z')
    end

    expect(page).not_to have_content('anteater')
    expect(page).to have_content('zebra')
  end
end
