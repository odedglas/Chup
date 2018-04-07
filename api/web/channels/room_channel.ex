defmodule Chup.RoomChannel do
  use Chup.Web, :channel

  def join("rooms:" <> room_id, _params, socket) do
    room = Repo.get!(Chup.Room, room_id)

    IO.puts("User: #{socket.assigns.current_user.email} has Joined room: #{room_id}")
    response = %{
      room: Phoenix.View.render_one(room, Chup.RoomView, "room.json"),
    }

    {:ok, response, assign(socket, :room, room)}
  end

  def terminate(_reason, socket) do
    {:ok, socket}
  end

end