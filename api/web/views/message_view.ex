defmodule Chup.MessageView do
  use Chup.Web, :view

  def render("index.json", %{messages: messages, pagination: pagination}) do
    %{
      data: render_many(messages, Chup.MessageView, "message.json"),
      pagination: pagination
    }
  end

  def render("message.json", %{message: message}) do
    %{
      id: message.id,
      inserted_at: message.inserted_at,
      text: message.text,
      user: %{
        email: message.user.email,
        username: message.user.username
      }
    }
  end
end
