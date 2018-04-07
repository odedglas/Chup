defmodule Chup.UserRoom do
  use Chup.Web, :model

  schema "user_rooms" do
    belongs_to :user, Chup.User, foreign_key: :user_id
    belongs_to :room, Chup.Room, foreign_key: :room_id

    timestamps()

  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:user_id, :room_id])
    |> validate_required([:user_id, :room_id])
    |> unique_constraint(:user_id_room_id)
  end
end
