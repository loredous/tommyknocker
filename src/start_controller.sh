cd python
pipenv run uvicorn controller.controller:api --host 0.0.0.0 &
sleep 2
cd ../ui
ng serve --host 0.0.0.0
