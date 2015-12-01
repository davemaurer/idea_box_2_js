require 'faker'

10.times do
  Idea.create(title: Faker::Hacker.verb, body: Faker::Lorem.sentence(120), quality: rand(3))
end
