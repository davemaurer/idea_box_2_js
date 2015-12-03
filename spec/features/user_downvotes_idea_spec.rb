require 'rails_helper'

RSpec.feature "User downvotes idea", js: true do
  scenario "successful downvote" do
    Idea.create(title: "bad idea", body: "this is not great", quality: 2)

    visit root_path

    expect(page).to have_content('genius')

    click_on('Downvote')

    expect(page).not_to have_content('genius')
    expect(page).to have_content('plausible')
  end

  scenario "successful downvote from genius to swill" do
    Idea.create(title: "bad idea", body: "this is not great", quality: 2)

    visit root_path

    expect(page).to have_content('genius')

    click_on('Downvote')

    expect(page).not_to have_content('genius')
    expect(page).to have_content('plausible')

    click_on('Downvote')

    expect(page).not_to have_content('plausible')
    expect(page).to have_content('swill')
  end

  scenario "unsuccessful downvote" do
    Idea.create(title: "bad idea", body: "this is not great", quality: 1)

    visit root_path

    expect(page).to have_content('plausible')

    click_on('Downvote')

    expect(page).not_to have_content('plausible')
    expect(page).to have_content('swill')

    click_on('Downvote')

    expect(page).to have_content('swill')
  end
end
