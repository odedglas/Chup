defmodule Chup.Guardian do
  @moduledoc false

  use Guardian, otp_app: :chup

  alias Chup.Repo
  alias Chup.User

  def subject_for_token(user = %User{}, _claims) do
    IO.puts("In 'subject_for_token' -> User: #{user.id}")
    {:ok, "User: #{user.id}"}
  end

  def subject_for_token(_, _) do
    {:error, :reason_for_error}
  end

  def resource_from_claims("User:" <> id) do

    IO.puts("In 'resource_from_claims' -> User: #{id}")
    {:ok, Repo.get(User, String.to_integer(id))}
  end
  def resource_from_claims(_claims) do
    IO.puts("In resource_from_claims - OTHER! -> #{_claims["sub"]}")
    {:error, :reason_for_error}
  end

end
