defmodule Chup.Message do
  use Chup.Web, :model

  schema "messages" do
    field :text, :string
    belongs_to :room, Chup.Room, foreign_key: :room_id
    belongs_to :user, Chup.User, foreign_key: :user_id

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:text, :user_id, :room_id])
    |> validate_required([:text, :user_id, :room_id])
  end
end
