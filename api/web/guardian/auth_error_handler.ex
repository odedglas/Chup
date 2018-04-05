defmodule Chup.Guardian.AuthErrorHandler do

  def auth_error(conn, {failure_type, reason}, opts) do
    IO.puts(failure_type)
  end
end