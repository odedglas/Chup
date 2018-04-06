defmodule Chup.Guardian.AuthErrorHandler do
  import Plug.Conn

  def auth_error(conn, {type, _reason}, _opts) do
    body = to_string(type)
    IO.puts("Auth error Handler ->  #{body}")
    conn
    |> put_resp_content_type("text/plain")
    |> send_resp(401, body)
  end
end