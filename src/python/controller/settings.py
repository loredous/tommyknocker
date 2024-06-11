from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    debug: bool = False
    seed_for_testing: bool = False
    state_type: str = "memory"
    state_file: str = "state.pkl"

app_settings = Settings()