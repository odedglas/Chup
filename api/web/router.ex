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

    #No Authentication required paths
    post "/login", AuthenticationController, :create
    delete "/logout", AuthenticationController, :delete
    post "/refresh-token", AuthenticationController, :refresh
    resources "/signup", RegisterationController, only: [:create]

    #Authorized api paths
    scope "/"  do
      pipe_through :ensure_auth

      get "/users/:id/rooms", UserController, :rooms
      resources "/rooms", RoomController, only: [:index, :create] do
        resources "/messages", MessageController, only: [:index]
      end
      post "/rooms/:id/join", RoomController, :join
    end

  end
end
