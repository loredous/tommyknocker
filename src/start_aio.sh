cd python
pipenv run uvicorn controller.controller:api --host 0.0.0.0 &
sleep 2
pipenv run python knocker/main.py -c localhost -p 8000 -I 00000000-0000-0000-0000-000000000001 &
sleep 2
cd ../ui
ng serve --host 0.0.0.0
