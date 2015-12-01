class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def create
    respond_with :api, :v1, Idea.create(idea_params)
  end

private
  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end
end
