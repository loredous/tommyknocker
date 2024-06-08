FROM nikolaik/python-nodejs:python3.11-nodejs22-slim as controller

ENV PYTHONPATH=/app/python
RUN pip install pipenv
COPY src/ /app
COPY Pipfile* /app/
WORKDIR /app/python
RUN pipenv install --deploy
WORKDIR /app/ui
RUN npm install -g @angular/cli
WORKDIR /app
CMD ["/usr/bin/bash", "/app/start_controller.sh"]

FROM controller as all-in-one
ENV SEED_FOR_TESTING=1
CMD ["/usr/bin/bash", "/app/start_aio.sh"]


FROM python:3.11-slim as knocker

ENV PYTHONPATH=/app/python
RUN pip install pipenv
COPY src/python /app
COPY Pipfile* /app/
WORKDIR /app
RUN pipenv install --deploy
ENTRYPOINT ["pipenv", "run", "python", "knocker/main.py"]
