defmodule Chup.UserController do
  use Chup.Web, :controller

  alias Chup.User


  def rooms(conn, _params) do
    current_user = Chup.Guardian.Plug.current_resource(conn)
    rooms = Repo.all(assoc(current_user, :rooms))
    render(conn, Chup.RoomView, "index.json", %{rooms: rooms})
  end

end
