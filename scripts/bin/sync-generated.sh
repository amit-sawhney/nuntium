
# move the .env from the backend to the scripts
cp backend/.env scripts/.env

rm ../backend/src/api/generated-routes.ts

cd scripts && yarn gen:routes

# if the above command fails, end the script

if [ $? -ne 0 ]; then
  echo "Failed to generate routes"
  exit 1
fi

# Go to backend folder and format, this should work from wherever the script is called
cd ../backend && yarn format

cd ../frontend && yarn format