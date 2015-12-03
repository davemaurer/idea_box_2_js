class Idea < ActiveRecord::Base
  validates_presence_of :title

  enum quality: {swill: 0, plausible: 1, genius: 2}

  def upvote
    if self.quality == "swill"
      self.update_attributes(quality: 1)
    else
      self.update_attributes(quality: 2)
    end
  end

  def downvote
    if self.quality == "genius"
      self.update_attributes(quality: 1)
    else
      self.update_attributes(quality: 0)
    end
  end
end
