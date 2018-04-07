defmodule Chup.SessionController do
  use Chup.Web, :controller

  def create(conn, params) do

    case authenticate(params) do
      {:ok, user} ->

        new_conn = Chup.Guardian.Plug.sign_in(conn, user)
        jwt = Chup.Guardian.Plug.current_token(new_conn)
        IO.puts("User - #{user.email} granted with #{jwt}")
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

    case Chup.Guardian.refresh(jwt, ttl: {20, :minutes}) do
      {:ok, _old_claims, {new_jwt, new_claims}} ->
        conn
        |> put_status(:ok)
        |> render("show.json", user: user, jwt: new_jwt)
      {:error, _reason} ->
        conn
        |> unauthenticated(_params)
    end
  end

  def unauthenticated(conn, _params) do
    IO.puts("Un authenticated")
    conn
    |> put_status(:forbidden)
    |> render(Chup.SessionView, "forbidden.json", error: "Not Authenticated")
  end

  defp authenticate(%{"email" => email, "password" => password}) do

    IO.puts("Authenticating - #{email}")
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
