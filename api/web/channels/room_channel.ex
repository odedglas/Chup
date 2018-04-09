defmodule Chup.RoomChannel do
  use Chup.Web, :channel

  def join("rooms:" <> room_id, _params, socket) do
    room = Repo.get!(Chup.Room, room_id)

    page =
      Chup.Message
      |> where([m], m.room_id == ^room.id)
      |> order_by([desc: :inserted_at, desc: :id])
      |> preload(:user)
      |> Chup.Repo.paginate()

    IO.puts("User: #{socket.assigns.current_user.email} has Joined room: #{room_id}")
    IO.puts("Pagination - Serving Page: #{page.page_number} / Out of #{page.total_pages}")

    response = %{
      room: Phoenix.View.render_one(room, Chup.RoomView, "room.json"),
      messages: Phoenix.View.render_many(page.entries, Chup.MessageView, "message.json"),
      pagination: Chup.PaginationHelpers.pagination(page)
    }

    send self(), :after_join
    {:ok, response, assign(socket, :room, room)}
  end

  def handle_info(:after_join, socket) do
    Chup.Presence.track(socket, socket.assigns.current_user.id, %{
      user: Phoenix.View.render_one(socket.assigns.current_user, Chup.UserView, "user.json")
    })
    push(socket, "presence_state", Chup.Presence.list(socket))
    {:noreply, socket}
  end

  def handle_in("new_message", params, socket) do
    changeset =
      socket.assigns.room
      |> build_assoc(:messages, user_id: socket.assigns.current_user.id)
      |> Chup.Message.changeset(params)

    case Repo.insert(changeset) do
      {:ok, message} ->
        broadcast_message(socket, message)
        {:reply, :ok, socket}
      {:error, changeset} ->
        {:reply, {:error, Phoenix.View.render(Chup.ChangesetView, "error.json", changeset: changeset)}, socket}
    end
  end

  def terminate(_reason, socket) do
    {:ok, socket}
  end

  defp broadcast_message(socket, message) do
    message = Chup.Repo.preload(message, :user)
    rendered_message = Phoenix.View.render_one(message, Chup.MessageView, "message.json")
    broadcast!(socket, "message_created", rendered_message)
  end

end