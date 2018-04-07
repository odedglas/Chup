defmodule Chup.Guardian do
  @moduledoc false

  use Guardian, otp_app: :chup

  alias Chup.Repo
  alias Chup.User

  @resource_prefix "User: "

  def subject_for_token(user = %User{}, _claims) do
    IO.puts("In 'subject_for_token' -> User: #{user.id}")
    {:ok, "#{@resource_prefix}#{user.id}"}
  end

  def subject_for_token(_, _) do
    {:error, :reason_for_error}
  end

  def resource_from_claims(claims) do
    resource_claims = claims["sub"]
    @resource_prefix <> id = resource_claims
    IO.puts("In 'resource_from_claims' -> User: #{id}")
    {:ok, Repo.get!(User, String.to_integer(id))}
  end
  def resource_from_claims(_claims) do
    {:error, :reason_for_error}
  end

end
