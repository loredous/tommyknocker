from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    debug: bool = False
    seed_for_testing: bool = False

app_settings = Settings()