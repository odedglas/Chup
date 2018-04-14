defmodule Chup.MessageController do
  use Chup.Web, :controller

  alias Chup.Message

  def index(conn, params) do
    last_seen_id = params["last_seen_id"] || 0
    room = Repo.get!(Chup.Room, params["room_id"])

    page =
      Message
      |> where([m], m.room_id == ^room.id)
      |> where([m], m.id < ^last_seen_id)
      |> order_by([desc: :inserted_at, desc: :id])
      |> preload(:user)
      |> Chup.Repo.paginate()

    render(conn, "index.json", %{messages: page.entries, pagination: Chup.PaginationHelpers.pagination(page)})
  end

end
