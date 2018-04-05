defmodule Chup.SessionController do
  use Chup.Web, :controller

  def create(conn, params) do

    case authenticate(params) do
      {:ok, user} ->
        new_conn = Chup.Guardian.Plug.sign_in(conn, user)
        jwt = Chup.Guardian.Plug.current_token(new_conn)

        new_conn
        |> put_status(:created)
        |> render("show.json", user: user, jwt: jwt)
      :error ->
        conn
        |> put_status(:unauthorized)
        |> render("error.json")
    end
  end

  def delete(conn, _) do
    jwt = Chup.Guardian.Plug.current_token(conn)
    case Chup.Guardian.revoke(jwt) do
      {:ok, old_claims} ->
        conn
        |> put_status(:ok)
        |> render("delete.json")
      :error ->
        IO.puts("Error occured deleting ")
    end


  end

  def refresh(conn, _params) do
    user = Chup.Guardian.Plug.current_resource(conn)
    jwt = Chup.Guardian.Plug.current_token(conn)

    case Chup.Guardian.refresh(jwt, %{ttl: {30, :days}}) do
      {:ok, {old_jwt, old_claims}, {new_jwt, new_claims}} ->
        conn
        |> put_status(:ok)
        |> render("show.json", user: user, jwt: new_jwt)
      {:error, _reason} ->
        conn
        |> put_status(:unauthorized)
        |> render("forbidden.json", error: "Not authenticated")
    end
  end

  def unauthenticated(conn, _params) do
    conn
    |> put_status(:forbidden)
    |> render(Sling.SessionView, "forbidden.json", error: "Not Authenticated")
  end

  defp authenticate(%{"email" => email, "password" => password}) do
    user = Repo.get_by(Chup.User, email: String.downcase(email))

    case check_password(user, password) do
      true -> {:ok, user}
      _ -> :error
    end
  end

  defp check_password(user, password) do
    case user do
      nil -> Comeonin.Bcrypt.dummy_checkpw()
      _ -> Comeonin.Bcrypt.checkpw(password, user.password_hash)
    end
  end
end
