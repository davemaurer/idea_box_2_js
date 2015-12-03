require 'rails_helper'

RSpec.feature "User upvotes idea", js: true do
  scenario "successful upvote" do
    Idea.create(title: "good idea", body: "this is great", quality: 0)

    visit root_path

    expect(page).to have_content('swill')

    click_on('Upvote')

    expect(page).not_to have_content('swill')
    expect(page).to have_content('plausible')
  end

  scenario "successful upvote from swill to genius" do
    Idea.create(title: "good idea", body: "this is great", quality: 0)

    visit root_path

    expect(page).to have_content('swill')

    click_on('Upvote')

    expect(page).not_to have_content('swill')
    expect(page).to have_content('plausible')

    click_on('Upvote')

    expect(page).not_to have_content('plausible')
    expect(page).to have_content('genius')
  end

  scenario "unsuccessful upvote" do
    Idea.create(title: "good idea", body: "this is great", quality: 1)

    visit root_path

    expect(page).to have_content('plausible')

    click_on('Upvote')

    expect(page).not_to have_content('plausible')
    expect(page).to have_content('genius')

    click_on('Upvote')

    expect(page).to have_content('genius')
  end
end
