defmodule Chup.Repo do
  use Ecto.Repo, otp_app: :chup
  use Scrivener, page_size: 25
end
