defmodule Chup.Router do
  use Chup.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :auth do
    plug Chup.Guardian.AuthPipeline
  end

  pipeline :ensure_auth do
    plug Guardian.Plug.EnsureAuthenticated
  end

  scope "/", Chup do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api", Chup do
    pipe_through [:api, :auth]

    #The Login/Logout
    post "/sessions", SessionController, :create
    delete "/sessions", SessionController, :delete

    #Authorized api paths
    scope "/"  do
      pipe_through :ensure_auth

      post "/sessions/refresh", SessionController, :refresh
      resources "/users", UserController, only: [:create]
    end

  end
end
