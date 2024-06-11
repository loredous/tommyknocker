from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    debug: bool = False
    seed_for_testing: bool = False
    state_type: str = "memory"
    state_file: str = "state.pkl"
    statemachines_file: str = "statemachines.pkl"
    file_state_path: str = "."

app_settings = Settings()