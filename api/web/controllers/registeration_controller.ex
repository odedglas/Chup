defmodule Chup.RegisterationController do
  use Chup.Web, :controller

  alias Chup.User

  def create(conn, params) do

    changeset = User.registration_changeset(%User{}, params)

    case Repo.insert(changeset) do
      {:ok, user} ->

        new_conn = Chup.Guardian.Plug.sign_in(conn, user)
        jwt = Chup.Guardian.Plug.current_token(new_conn)

        new_conn
        |> put_status(:created)
        |> render(Chup.AuthenticationView, "show.json", user: user, jwt: jwt)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Chup.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
