class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all.sort_by(&:created_at)
  end

  def create
    respond_with :api, :v1, Idea.create(idea_params)
  end

  def edit
  end

  def update
    respond_with Idea.update(params[:id], idea_params)
  end

  def destroy
    respond_with Idea.destroy(params[:id])
  end

  def upvote
    idea = Idea.find(params[:id])
    idea.upvote
    render json: idea
  end

  def downvote
    idea = Idea.find(params[:id])
    idea.downvote
    render json: idea
  end

private

  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end
end
