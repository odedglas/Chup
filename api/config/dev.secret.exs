
use Mix.Config

config :chup, Chup.Guardian,
       secret_key: "LG17BzmhBeq81Yyyn6vH7GVdrCkQpLktol2vdXlBzkRRHpYsZwluKMG9r6fnu90m"

config :chup, Chup.Repo,
       adapter: Ecto.Adapters.Postgres,
       username: "chup",
       password: "chup",
       database: "chup_dev",
       hostname: "localhost",
       pool_size: 10
